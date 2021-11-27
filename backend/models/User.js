const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const applicationSchema = require('../models/Application');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, required: false },
    friends: [{ type: mongoose.Types.ObjectId, required: false, ref: 'User' }],
    teams: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Team' }],
    applications: [applicationSchema],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
