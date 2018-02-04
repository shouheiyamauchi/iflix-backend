const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const starsCountSchemaAttributes = {
  type: Number,
  default: 0,
  required: true,
  validate : {
    validator : Number.isInteger,
    message   : '{VALUE} must be an integer'
  }
};

const AllRatingSchema = new Schema({
  contentId: { type: Schema.Types.ObjectId, ref: 'Content', required: true, index: true },
  oneStarCount: starsCountSchemaAttributes,
  twoStarsCount: starsCountSchemaAttributes,
  threeStarsCount: starsCountSchemaAttributes,
  fourStarsCount: starsCountSchemaAttributes,
  fiveStarsCount: starsCountSchemaAttributes,
  totalStarsCount: starsCountSchemaAttributes,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true }
});

mongoose.model('AllRating', AllRatingSchema);

module.exports = mongoose.model('AllRating');
