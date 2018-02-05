const _ = require('lodash');
const Content = require(__modelsDir + '/Content');
const AllRating = require(__modelsDir + '/AllRating');
const { MINIMUM_RATING_QUANTITY } = require(__rootDir + '/config/constants');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const getAllContents = async queryObject => {
  let searchResult, errors;
  const { pageNo, resultsPerPage, includeRating } = queryObject;

  if (!pageNo || !resultsPerPage) {
    errors = {};

    if (!pageNo) errors.pageNoMissing = { 'message': 'Page number is missing from request.' };
    if (!resultsPerPage) errors.resultsPerPageMissing = { 'message': 'Results per page is missing from request.' };
  } else {
    const getContentListPromise = Content.paginate({}, { page: parseInt(pageNo), limit: parseInt(resultsPerPage) });
    const addRatingToContentListPromise = getContentListPromise.then(contentList => {
      // option to query for and add average ratings
      return includeRating === 'true' ? addRatingToContentList(contentList) : contentList;
    });

    await Promise.all([getContentListPromise, addRatingToContentListPromise])
      .then(([originalContentResults, updatedContentResults]) => {
        searchResult = updatedContentResults;
      })
      .catch(resultErrors => {
        errors = resultErrors;
      });
  };

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(searchResult);
    } else {
      reject(errors);
    };
  });
};

const findContent = async paramsObject => {
  let searchResult, errors;
  const { id } = paramsObject

  await Content.findById(id)
    .then(content => {
      if (!content) errors = notFoundError('Content', id);
      searchResult = content;
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(searchResult);
    } else {
      reject(errors);
    };
  });
};

const createAndSaveContent = async queryObject => {
  let result, errors;

  const content = new Content();
  setContentValues(queryObject, content);

  await saveContent(content)
    .then(content => {
      result = content;
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

const findAndUpdateContent = async (paramsObject, queryObject) => {
  let result, errors;

  const findContentPromise = findContent(paramsObject);
  const updateContentPromise = findContentPromise.then(content => {
    setContentValues(queryObject, content);
    return saveContent(content);
  });

  await Promise.all([findContentPromise, updateContentPromise])
    .then(([foundContent, updatedContent]) => {
      result = updatedContent;
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

const findAndDestroyContent = async id => {
  let result, errors;

  await Content.findByIdAndRemove(id)
    .then(content => {
      if (!content) {
        errors = notFoundError('Content', id);
      } else {
        result = deleteResult(content.title);
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

const addRatingToContentList = async contentList => {
  let contentListWithRatings, errors;

  const amendedContentList = _.cloneDeep(contentList);
  const contentsWithoutPaginationData = amendedContentList.docs

  const contentIds = contentsWithoutPaginationData.map(content => content._id);

  await AllRating.where('contentId').in(contentIds).exec()
    .then(allRatings => {
      // store in an object all average ratings with contentId as the key
      const ratingsObject = {};

      allRatings.forEach(allRating => {
        if (allRating.totalStarsCount >= MINIMUM_RATING_QUANTITY) {
          ratingsObject[allRating.contentId] = allRating.average
        }
      });

      // add average rating key and value to each content object
      contentListWithRatings = contentsWithoutPaginationData.map(content => {
        return _.merge(content.toObject(), { averageRating: ratingsObject[content._id] || null });
      });

      amendedContentList.docs = contentListWithRatings;
    })
    .catch(mongoErrors => {
      errors = mongoErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(amendedContentList);
    } else {
      reject(errors);
    };
  });
};

const setContentValues = (queryObject, content) => {
  const { title, genre, releaseDate, thumbnail } = queryObject;

  content.title = title;
  content.genre = genre;
  content.releaseDate = releaseDate ? Date.parse(releaseDate) : null;
  content.thumbnail = thumbnail;
  content.updated = Date.now();
};

const saveContent = async content => {
  let result, errors;

  await content.save()
    .then(content => {
      result = content;
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

module.exports = { getAllContents, findContent, createAndSaveContent, findAndUpdateContent, findAndDestroyContent };
