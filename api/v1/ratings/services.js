const IndividualRating = require(__modelsDir + '/IndividualRating');
const AllRating = require(__modelsDir + '/AllRating');
const { findContent } = require('../contents/services');
const { MINIMUM_RATING_QUANTITY, NOT_ENOUGH_RATINGS_MESSAGE } = require(__rootDir + '/config/constants');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const findAllRating = async paramsObject => {
  let result, errors;
  const { id } = paramsObject;

  await AllRating.findOne({ contentId: id }).exec()
    .then(allRating => {
      if (!allRating) {
        errors = { notFound: { message: 'Ratings for content with ID ' + id + ' not found.' } };
      } else {
        result = allRating.totalStarsCount < MINIMUM_RATING_QUANTITY ? NOT_ENOUGH_RATINGS_MESSAGE : allRating;
      };
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

const createRatingAndUpdateAllRating = async queryObject => {
  let result, errors;

  const individualRating = new IndividualRating();

  const setIndividualRatingValuesPromise = setIndividualRatingValues(queryObject, individualRating);
  const saveNewRatingUpdateAllRatingPromise = setIndividualRatingValuesPromise.then(updatedIndividualRating => {
    return saveNewRatingUpdateAllRating(updatedIndividualRating);
  });

  await Promise.all([setIndividualRatingValuesPromise, saveNewRatingUpdateAllRatingPromise])
    .then(([updatedIndividualRating, allRating]) => {
      result = allRating.totalStarsCount < MINIMUM_RATING_QUANTITY ? NOT_ENOUGH_RATINGS_MESSAGE : allRating;
    })
    .catch(saveErrors => {
      errors = saveErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const setIndividualRatingValues = async (queryObject, individualRating) => {
  let result, errors;
  const { contentId, userId, stars } = queryObject;

  await IndividualRating.findOne({ contentId: contentId, userId: userId }).exec()
    .then(content => {
      if (content) errors = { alreadyRated: { message: 'User with ID ' + userId + ' has already rated content with ID ' + contentId + '.' } };
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  if (!errors) {
    await findContent({ id: contentId })
      .then(content => {
        individualRating.contentId = contentId;
        individualRating.userId = userId;
        individualRating.stars = stars;
        individualRating.updated = Date.now();

        result = individualRating;
      })
      .catch(contentErrors => {
        errors = contentErrors;
      });
  };

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const saveNewRatingUpdateAllRating = async individualRating => {
  let result, errors;

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
  let result, errors;

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
  let result, errors;

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
  allRating.average = calculateAverageRating(allRating);

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

const calculateAverageRating = allRating => {
  const totalRating = (
    1 * allRating.oneStarCount +
    2 * allRating.twoStarsCount +
    3 * allRating.threeStarsCount +
    4 * allRating.fourStarsCount +
    5 * allRating.fiveStarsCount
  );

  // round to 1 decimal place
  return Math.round(totalRating / allRating.totalStarsCount * 10) / 10;
};

module.exports = { findAllRating, createRatingAndUpdateAllRating };
