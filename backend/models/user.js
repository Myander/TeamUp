const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, required: false },
  friends: [{ type: mongoose.Types.ObjectId, required: false, ref: 'User' }],
  teams: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Team' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
