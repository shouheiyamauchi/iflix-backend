const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SingleRatingSchema = new Schema({
  contentId: { type: Schema.Types.ObjectId, ref: 'Content', required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} must be an integer'
    },
    required: true
  },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

mongoose.model('SingleRating', SingleRatingSchema);

module.exports = mongoose.model('SingleRating');
