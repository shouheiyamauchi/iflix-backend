const IndividualRating = require(__modelsDir + '/IndividualRating');
const AllRating = require(__modelsDir + '/AllRating');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const setIndividualRatingValues = (queryParams, individualRating) => {
  const { contentId, userId, stars } = queryParams;

  individualRating.contentId = contentId;
  individualRating.userId = userId;
  individualRating.stars = stars;
  individualRating.updated = Date.now();
};

const saveNewRating = async individualRating => {
  let result;
  let errors;

  const individualRatingSavePromise = individualRating.save();

  const findAndUpdateAllRatingPromise = individualRatingSavePromise.then(individualRating => {
    return findAndUpdateAllRating(individualRating);
  });

  await Promise.all([individualRatingSavePromise, findAndUpdateAllRatingPromise])
    .then(([individualRating, updatedAllRating]) => {
      result = updatedAllRating;
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

const findAndUpdateAllRating = async individualRating => {
  let result;
  let errors;

  const findAllRatingPromise = AllRating.findOne({ contentId: individualRating.contentId }).exec();

  const saveAllRatingPromise = findAllRatingPromise.then(allRating => {
    const allRatingObject = allRating || new AllRating();
    return saveAllRating(allRatingObject, individualRating);
  });

  await Promise.all([findAllRatingPromise, saveAllRatingPromise])
    .then(([foundAllRating, savedAllRating]) => {
      result = savedAllRating;
    })
    .catch(mongoErrors => {
      errors = mongoErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const saveAllRating = async (allRating, individualRating) => {
  let result;
  let errors;

  const starsCountToIncrease = {
    1: 'oneStarCount',
    2: 'twoStarsCount',
    3: 'threeStarsCount',
    4: 'fourStarsCount',
    5: 'fiveStarsCount'
  }[individualRating.stars];

  allRating.contentId = individualRating.contentId;
  allRating[starsCountToIncrease]++;
  allRating.totalStarsCount++;

  await allRating.save()
    .then(allRating => {
      result = allRating;
    })
    .catch(mongoErrors => {
      errors = mongoErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

module.exports = { setIndividualRatingValues, saveNewRating };
