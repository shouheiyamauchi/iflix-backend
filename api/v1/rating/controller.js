const Rating = require(__modelsDir + '/Rating');
const { sendResponse } = require(__helpersDir + '/api');
const { setRatingValues, saveRating } = require('./services');

const create = (req, res) => {
  const content = new Rating();
  setRatingValues(req.query, content);

  saveRating(content)
    .then(content => {
      const statusCode = 200;
      sendResponse(res, statusCode, content);
    })
    .catch(errors => {
      const statusCode = 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { create };
