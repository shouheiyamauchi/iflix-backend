const { sendResponse } = require(__helpersDir + '/api');
const { findAllRating, createRatingAndUpdateAllRating } = require('./services');

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
  createRatingAndUpdateAllRating(req.query)
    .then(allRating => {
      const statusCode = 200;
      sendResponse(res, statusCode, allRating);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { show, create };
