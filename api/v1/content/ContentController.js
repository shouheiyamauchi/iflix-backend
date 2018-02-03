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
  .then(content => {
    const statusCode = 200;
    apiService.sendResponse(res, statusCode, content, errors);
  }).catch(errorStatusCode => {
    apiService.sendResponse(res, errorStatusCode, {}, errors);
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
  let errorStatusCode = null;
  let content = {};

  try {
    content = await Content.findById(id);

    if (!content) {
      errorStatusCode = 404;
      errors.notFound = { 'message': 'Move with that ID not found.'};
    };
  } catch(mongoErrors) {
    mongoDbService.convertMongoErrors(mongoErrors, errors);
    errorStatusCode = 500;
  };

  return new Promise((resolve, reject) => {
    if (!errorStatusCode) {
      resolve(content);
    } else {
      reject(errorStatusCode);
    }

  });
};

module.exports = { list, show, create };
