const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
