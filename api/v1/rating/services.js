const Rating = require(__modelsDir + '/Rating');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const setRatingValues = (queryParams, rating) => {
  const { contentId, userId, stars } = queryParams;

  rating.contentId = contentId;
  rating.userId = userId;
  rating.rating = stars;
  rating.updated = Date.now();
};

const saveRating = async rating => {
  let result;
  let errors;

  await rating.save()
    .then(rating => {
      result = rating;
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

module.exports = { setRatingValues, saveRating };
