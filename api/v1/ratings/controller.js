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
  // check that logged in user and params user id matches
  if (req.user._id != req.query.userId) {
    const statusCode = 401;
    const errorMessage = {unauthorized: {message: 'The logged in user and userId for this rating does not match.'}};
    sendResponse(res, statusCode, errorMessage);
  } else {
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
};

module.exports = { show, create };
