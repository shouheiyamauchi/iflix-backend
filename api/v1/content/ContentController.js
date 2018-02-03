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
  const errors = {};
  findContent(req.params.id, res, errors)
  .then(statusCodeAndContent => {
    const statusCode = statusCodeAndContent.statusCode;
    const content = statusCodeAndContent.content;

    apiService.sendResponse(res, statusCode, content, errors);
  });
};

const create = (req, res) => {
  const content = new Content();
  setContentValues(req, content);
  saveContentSendRes(res, content);
};

const update = (req, res) => {

}

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

const findContent = async (id, res, errors) => {
  let statusCode = null;
  let content = {};

  try {
    content = await Content.findById(id);

    if (!content) {
      statusCode = 404;
      errors.notFound = { 'message': 'Move with that ID not found.'};
    };

    statusCode = 200;
  } catch(mongoErrors) {
    mongoDbService.convertMongoErrors(mongoErrors, errors);
    statusCode = 500;
  };

  return new Promise(resolve => {
    const statusCodeAndContent = {};
    statusCodeAndContent.statusCode = statusCode;
    statusCodeAndContent.content = content;

    resolve(statusCodeAndContent);
  });
};

module.exports = { list, show, create };
