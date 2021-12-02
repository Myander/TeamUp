const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Message = require('../models/Message');
const Team = require('../models/Team');
const User = require('../models/User');
const io = require('../socket');

/* ----------------------------- CREATE TEAM --------------------------- */
const createMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const newMessage = new Message(req.body);
  // emit to
  io.getIO().to(req.body.teamId).emit('newMessage', {
    _id: newMessage._id,
    senderId: newMessage.senderId,
    senderUsername: newMessage.senderUsername,
    teamId: newMessage.teamId,
    text: newMessage.text,
  });
  let savedMessage;
  try {
    savedMessage = await newMessage.save();
  } catch (err) {
    return next(new HttpError('Creating Message failed.', 500));
  }
  res.status(200).json({ message: savedMessage });
};

/* ------------------------- GET MESSAGES BY TEAM ID ---------------------- */
const getMessagesByTeamId = async (req, res, next) => {
  const teamId = req.params.tid;
  let messages;
  try {
    messages = await Message.find({
      teamId: teamId,
    }).populate('sender');
    io.getIO().emit('message', { action: 'get', message: 'Welcome to chat!' });
  } catch (error) {
    return next(new HttpError('Could not find messages for given team.', 500));
  }
  res.status(200).json({ messages });
};

exports.createMessage = createMessage;
exports.getMessagesByTeamId = getMessagesByTeamId;
