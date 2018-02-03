const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
