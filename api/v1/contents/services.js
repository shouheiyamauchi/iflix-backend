const _ = require('lodash');
const Content = require(__modelsDir + '/Content');
const AllRating = require(__modelsDir + '/AllRating');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const getAllContents = async (paginationOptions, includeRating) => {
  const { pageNo, resultsPerPage } = paginationOptions;

  let searchResult;
  let errors;

  if (!pageNo || !resultsPerPage) {
    errors = {};

    if (!pageNo) errors.pageNoMissing = { 'message': 'Page number is missing from request.'};
    if (!resultsPerPage) errors.resultsPerPageMissing = { 'message': 'Results per page is missing from request.'};
  } else {
    const getContentListPromise = Content.paginate({}, { page: pageNo, limit: resultsPerPage });
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

const addRatingToContentList = async contentList => {
  let contentListWithRatings;
  let errors;

  const amendedContentList = _.cloneDeep(contentList);
  const contentsWithoutPaginationData = amendedContentList.docs

  const contentIds = contentsWithoutPaginationData.map(content => content._id);

  await AllRating.where('contentId').in(contentIds).exec()
    .then(allRatings => {
      // store in an object all average ratings with contentId as the key
      const ratingsObject = {};

      allRatings.forEach(allRating => {
        ratingsObject[allRating.contentId] = allRating.average;
      });

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

const findContent = async id => {
  let searchResult;
  let errors;

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

const setContentValues = (queryParams, content) => {
  const { title, genre, releaseDate, thumbnail } = queryParams;

  content.title = title;
  content.genre = genre;
  content.releaseDate = releaseDate ? Date.parse(releaseDate) : null;
  content.thumbnail = thumbnail;
  content.updated = Date.now();
};

const saveContent = async content => {
  let result;
  let errors;

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

const findAndDestroyContent = async id => {
  let result;
  let errors;

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

module.exports = { getAllContents, findContent, setContentValues, saveContent, findAndDestroyContent };
