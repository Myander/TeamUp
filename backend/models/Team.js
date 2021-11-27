const mongoose = require('mongoose');
const applicationSchema = require('../models/Application');
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    game: { type: String, required: true },
    scheduled: { type: Date, required: false },
    private: { type: Boolean, required: true },
    applications: [applicationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
