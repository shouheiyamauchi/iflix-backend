const Content = require('./contentModel');
const apiService = require(__servicesDir + 'api');
const mongoDbService = require(__servicesDir + 'mongoDb');

const list = (req, res) => {
  Content.find({}, (mongoErrors, contents) => {
    const statusCode = mongoErrors ? 500 : 200;
    const errors = {};

    if (mongoErrors) mongoDbService.convertMongoErrors(mongoErrors, errors);

    apiService.sendResponse(res, statusCode, contents, errors);
  });
};

const show = (req, res) => {
  Content.findById(req.params.id, (mongoErrors, content) => {
    let statusCode = null;
    const errors = {};

    if (mongoErrors) mongoDbService.convertMongoErrors(mongoErrors, errors);

    if (mongoErrors) {
      statusCode = 500;
    } else if (!content) {
      statusCode = 404;
      errors.notFound = { 'message': 'Move with that ID not found.'};
    } else {
      statusCode = 200;
    };

    apiService.sendResponse(res, statusCode, content, errors);
  });
};

const create = (req, res) => {
  const content = new Content();
  setContentValues(req, content);
  saveContentSendRes(res, content);
};

const setContentValues = (req, content) => {
  const { title, genre, releaseDate, thumbnail } = req.query;

  content.title = title;
  content.genre = genre;
  if (releaseDate) content.releaseDate = Date.parse(releaseDate);
  content.thumbnail = thumbnail;
  content.updated = Date.now();
};

const saveContentSendRes = (res, content) => {
  content.save((mongoErrors, content) => {
    const statusCode = mongoErrors ? 500 : 200;
    const errors = {};

    if (mongoErrors) mongoDbService.convertMongoErrors(mongoErrors, errors);

    apiService.sendResponse(res, statusCode, content, errors);
  });
};

module.exports = { list, show, create };
