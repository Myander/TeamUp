const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Team = require('../models/Team');
const User = require('../models/User');
const TeamConversation = require('../models/TeamConversation');
const io = require('../socket');

const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId],
  });
};

exports.createConversation = createConversation;
