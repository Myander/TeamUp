const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamConversationSchema = new Schema(
  {
    members: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamConversation', teamConversationSchema);
