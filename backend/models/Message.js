const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    teamId: { type: mongoose.Types.ObjectId, required: true, ref: 'Team' },
    senderId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    senderUsername: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
