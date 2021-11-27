const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    teamId: { type: mongoose.Types.ObjectId, required: true, ref: 'Team' },
    text: { type: String, required: true },
    status: { type: String, required: true }, //pending, approved, denied
  },
  { timestamps: true }
);

module.exports = applicationSchema;
