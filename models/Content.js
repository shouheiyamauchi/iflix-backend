const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  genre: { type: String, required: true, index: true },
  releaseDate: { type: Date, required: true },
  thumbnail: { type: String },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

ContentSchema.plugin(mongoosePaginate);

mongoose.model('Content', ContentSchema);

module.exports = mongoose.model('Content');
