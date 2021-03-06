const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Team = require('../models/Team');
const User = require('../models/User');

/* ------------------------------- GET TEAM BY ID ------------------------------- */
const getTeamById = async (req, res, next) => {
  const teamId = req.params.tid;
  let team;
  try {
    team = await Team.findById(teamId).populate('members');
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not find team.', 500)
    );
  }

  if (!team) {
    return next(
      new HttpError(' Could not find a team for the provided id.', 404)
    );
  }

  res.json({ team: team.toObject({ getters: true }) });
};

/* ------------------------------- GET TEAMS BY USER ID -------------------------- */
const getTeamsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithTeams;

  try {
    userWithTeams = await User.findById(userId).populate('teams');
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong retrieving userWithTeams.', 500)
    );
  }

  if (!userWithTeams || userWithTeams.teams.length === 0) {
    return next(
      new HttpError(' Could not find any teams for the provided user id.', 404)
    );
  }

  res.json({ user: userWithTeams.toObject({ getters: true }) });
};

/* ------------------------------- GET TEAMS BY GAME ----------------------------- */
const getTeamsByGameName = async (req, res, next) => {
  let gameName = req.params.game;
  let limit = 20;
  let page = req.query.page ? +req.query.page : 1;
  let count, teams;
  gameName = gameName.split('-').join(' ');

  try {
    // possibly make this into separate request to reduce api calls.
    count = await Team.countDocuments({ game: gameName });
  } catch (err) {
    console.log(err);
  }

  try {
    teams = await Team.find({ game: gameName })
      .sort({ title: 'asc' }) // sort by date ?, maybe give option for user
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong retrieving teams by game name.', 500)
    );
  }

  if (!teams) {
    return next(
      new HttpError(
        ' Could not find any teams for the provided game name.',
        404
      )
    );
  }
  // console.log(teams);
  res.json({
    teams: teams.map(team => team.toObject({ getters: true })),
    count,
  });
};

/* ------------------------------- CREATE TEAM ------------------------------- */
const createTeam = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, game, private } = req.body;

  const createdTeam = new Team({
    title,
    description,
    game,
    private,
    members: [req.userData.userId],
    owner: req.userData.userId,
    applications: [],
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    console.log(err);
    return next(new HttpError('Creating place failed, please try again.', 500));
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id.', 404));
  }

  // create new team and update user with new team.
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTeam.save({ session: sess });
    user.teams.push(createdTeam);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Creating Team failed, please try again.', 500));
  }
  res.status(200).json({ team: createdTeam });
};

/* ------------------------------- DELETE TEAM ------------------------------- */
const deleteTeam = async (req, res, next) => {
  const tid = req.params.tid;
  let team;
  try {
    team = await Team.findById(tid).populate('owner');
  } catch (err) {
    console.log(err);
    return next(new HttpError('Error finding team.', 500));
  }

  if (!team) {
    return next(
      new HttpError('Could not find a team for the provided id.', 404)
    );
  }

  if (team.owner.id !== req.userData.userId) {
    return next(new HttpError('Not authorized to delete this team.', 401));
  }

  // make sure to delete the team from all users that are in the team.
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    team.owner.teams.pull(team);
    await team.owner.save({ session: sess });
    await team.deleteOne({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Error deleting team.', 500));
  }

  res.status(200).json({ message: 'team deleted' });
};

/* ------------------------------- UPDATE TEAM ------------------------------- */
const updateTeam = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const tid = req.params.tid;

  const {
    title,
    description,
    owner,
    game,
    scheduled,
    private,
    members,
    removedUserId,
    applications,
    removeApplicationId,
  } = req.body;

  let team;
  try {
    team = await Team.findById(tid);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not find team.', 500)
    );
  }

  let prevMembers = team.members;

  team.title = title;
  team.description = description;
  team.owner = owner;
  team.game = game;
  team.scheduled = scheduled ? scheduled : null;
  team.private = private;
  team.members = members;

  // if new member added or removed, must update the user as well.
  if (prevMembers.length !== members.length) {
    let addMember = prevMembers.length < members.length ? true : false;
    let user;

    // prevent duplicate members
    if (addMember) {
      for (let i = 0; i < prevMembers.length; i++) {
        if (prevMembers[i].toString() === members[members.length - 1]) {
          return next(
            new HttpError(
              'Cannot add the same team member more than once.',
              500
            )
          );
        }
      }
    }

    const userId = addMember ? members[members.length - 1] : removedUserId;

    //console.log('userId', userId);

    try {
      user = await User.findById(userId);
    } catch (err) {
      console.log(err);
      return next(new HttpError('Error finding user', 500));
    }

    if (!user) {
      return next(
        new HttpError('Could not find user for the provided id.', 404)
      );
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await team.save({ session: sess });
      if (addMember) {
        user.teams.push(team);
      } else {
        user.teams.pull(team._id); // possibly incorrect and could remove the wrong team
      }
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      console.log(err);
      return next(new HttpError('Update Team failed, please try again.', 500));
    }

    // check if need to add or remove an application
  } else if (team.applications.length !== applications.length) {
    if (team.applications.length < applications.length) {
      const application = applications[applications.length - 1];
      team.applications.push(application);
      // also add application to the user.
      let user;
      try {
        user = await User.findById(application.userId);
      } catch (err) {
        console.log(err);
        return next(new HttpError('Error finding user', 500));
      }

      if (!user) {
        return next(
          new HttpError('Could not find user for the provided id.', 404)
        );
      }
      user.applications.push(application);

      // send a notification to the team owner.

      // save team and user updates to database
      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await team.save({ session: sess });
        await user.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        console.log(err);
        return next(
          new HttpError('Update Team failed, please try again.', 500)
        );
      }
    } else {
      // find and remove application.
      team.applications.id(removeApplicationId).remove();
      try {
        await team.save();
      } catch (err) {
        console.log(err);
        return next(
          new HttpError('Something went wrong, could not update team.', 500)
        );
      }
    }
  } else {
    // new member or application not added or removed.

    // check if any applications have status changed (update users accordingly)
    let app;

    applications.forEach(application => {
      if (application.status !== 'pending') app = application;
    });
    let user;

    if (app) {
      try {
        user = await User.findById(app.userId);
      } catch (err) {
        console.log(err);
        return next(new HttpError('Error finding user', 500));
      }

      if (!user) {
        return next(
          new HttpError('Could not find user for the provided id.', 404)
        );
      }

      // update users copy of the application and add to team if approved.
      user.applications.forEach(ap => {
        if (ap.teamId.toString() === app.teamId.toString()) {
          ap.status = app.status;
          if (app.status === 'approved') {
            team.members.push(user._id);
            user.teams.push(team._id);
          }
        }
      });
      const id = mongoose.Types.ObjectId(app.id);
      team.applications.id(id).remove();

      try {
        await user.save();
      } catch (err) {
        console.log(err);
        return next(
          new HttpError('Something went wrong, could not update user.', 500)
        );
      }
    }

    try {
      await team.save();
    } catch (err) {
      console.log(err);
      return next(
        new HttpError('Something went wrong, could not update team.', 500)
      );
    }
  }

  res.status(200).json({ team: team.toObject({ getters: true }) });
};

exports.createTeam = createTeam;
exports.getTeamById = getTeamById;
exports.getTeamsByUserId = getTeamsByUserId;
exports.getTeamsByGameName = getTeamsByGameName;
exports.deleteTeam = deleteTeam;
exports.updateTeam = updateTeam;
