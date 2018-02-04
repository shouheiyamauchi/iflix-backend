const IndividualRating = require(__modelsDir + '/IndividualRating');
const { sendResponse } = require(__helpersDir + '/api');
const { setIndividualRatingValues, saveNewRating } = require('./services');

const show = (req, res) => {

};

const create = (req, res) => {
  const individualRating = new IndividualRating();
  setIndividualRatingValues(req.query, individualRating);

  saveNewRating(individualRating)
    .then(individualRating => {
      const statusCode = 200;
      sendResponse(res, statusCode, individualRating);
    })
    .catch(errors => {
      const statusCode = 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { show, create };
