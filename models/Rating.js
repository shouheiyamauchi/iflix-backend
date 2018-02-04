const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  contentId: { type: Schema.Types.ObjectId, ref: 'Content', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

mongoose.model('Rating', RatingSchema);

module.exports = mongoose.model('Rating');
