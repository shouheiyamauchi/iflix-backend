const IndividualRating = require(__modelsDir + '/IndividualRating');
const { sendResponse } = require(__helpersDir + '/api');
const { findAllRating, setIndividualRatingValues, saveNewRatingUpdateAllRating } = require('./services');

const show = (req, res) => {
  findAllRating(req.params.id)
    .then(allRating => {
      const statusCode = 200;
      sendResponse(res, statusCode, allRating);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const create = (req, res) => {
  const individualRating = new IndividualRating();

  const setIndividualRatingValuesPromise = setIndividualRatingValues(req.query, individualRating);
  const saveNewRatingUpdateAllRatingPromise = setIndividualRatingValuesPromise.then(updatedIndividualRating => {
    return saveNewRatingUpdateAllRating(updatedIndividualRating);
  });

  Promise.all([setIndividualRatingValuesPromise, saveNewRatingUpdateAllRatingPromise])
    .then(([updatedIndividualRating, allRating]) => {
      const statusCode = 200;
      sendResponse(res, statusCode, allRating);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { show, create };
