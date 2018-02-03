const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: { type: String, required: true, index: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  thumbnail: { type: String },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

mongoose.model('Content', ContentSchema);

module.exports = mongoose.model('Content');
