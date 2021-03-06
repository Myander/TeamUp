const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/User');

/* ------------------------------- SIGNUP ------------------------------- */
const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { email, password, username } = req.body;

  // Check if user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return next(new HttpError('signup failed, please try again later.', 500));
  }

  if (existingUser) {
    return next(
      new HttpError('User already exists, please login instead', 422)
    );
  }

  // encrypt password and create new user
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    const error = new Error('Could not create user please try again!', 500);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    friends: [],
    teams: [],
    applications: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('user created failed, please try again later.', 500)
    );
  }

  // Create token to send back to client.
  let token;
  console.log(createdUser);
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('user created failed, please try again later.', 500)
    );
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    username: createdUser.userName,
    token,
  });
};

/* ------------------------------- LOGIN ------------------------------- */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  // attempt to find user in database
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return next(new HttpError('login failed, please try again later.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, please try again', 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, please try again', 403));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('logging in failed, please try again later.', 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    token,
  });
};

/* ------------------------------- UPDATE ------------------------------- */
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const uid = req.params.uid;

  const { username, email, avatar, friends, teams, applications } = req.body;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    console.log(err);
    return next(new HttpError('Error finding user', 500));
  }

  if (!user) {
    return next(new HttpError('Could not find user for the provided id.', 404));
  }

  user.username = username;
  user.email = email;
  user.friends = friends;
  user.teams = teams;
  user.applications = applications;

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('Something went wrong, could not update user.', 500)
    );
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
