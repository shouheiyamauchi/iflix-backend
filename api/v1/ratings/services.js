const IndividualRating = require(__modelsDir + '/IndividualRating');
const AllRating = require(__modelsDir + '/AllRating');
const { findContent } = require('../contents/services')
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const findAllRating = async contentId => {
  let result;
  let errors;

  await AllRating.findOne({ contentId: contentId }).exec()
    .then(allRating => {
      if (!allRating) {
        errors = {notFound: {message: 'Ratings for content with ID ' + contentId + ' not found.'}};
      } else {
        result = allRating;
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

const setIndividualRatingValues = async (queryParams, individualRating) => {
  const { contentId, userId, stars } = queryParams;

  let result;
  let errors;

  await IndividualRating.findOne({ contentId: contentId, userId: userId }).exec()
    .then(content => {
      if (content) errors = {alreadyRated: {message: 'User with ID ' + userId + ' has already rated content with ID ' + contentId + '.'}};
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  if (!errors) {
    await findContent(contentId)
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

module.exports = { findAllRating, setIndividualRatingValues, saveNewRatingUpdateAllRating };
