const Content = require('./contentModel');
const apiService = require(__servicesDir + 'api');
const mongoDbService = require(__servicesDir + 'mongoDb');

// router functions

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

  findContent(req.params.id, errors)
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
  const errors = {};
  findContent(req.params.id, errors)
    .then(content => {
      setContentValues(req, content);
      saveContentSendRes(res, content);
    }).catch(errorStatusCode => {
      apiService.sendResponse(res, errorStatusCode, {}, errors);
    });
};

const destroy = (req, res) => {
  const errors = {};
  const result = {};

  findAndDestroyContent(req.params.id, errors)
    .then(content => {
      const statusCode = 200;
      result.message = content.title + ' was deleted.';
      apiService.sendResponse(res, statusCode, result, errors);
    }).catch(errorStatusCode => {
      apiService.sendResponse(res, errorStatusCode, result, errors);
    });
};

// helper functions

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

const findContent = async (id, errors) => {
  let errorStatusCode = null;
  let searchResult = {};

  await Content.findById(id)
    .then(content => {
      searchResult = content;

      if (!searchResult) {
        errorStatusCode = 404;
        errors.notFound = { 'message': 'Content with ID ' + id + ' not found.'};
      };
    }).catch(mongoErrors => {
      errorStatusCode = 500;
      mongoDbService.convertMongoErrors(mongoErrors, errors);
    });


  return new Promise((resolve, reject) => {
    if (!errorStatusCode) {
      resolve(searchResult);
    } else {
      reject(errorStatusCode);
    };
  });
};

const findAndDestroyContent = async (id, errors) => {
  let errorStatusCode = null;
  let searchResult = {};

  await Content.findByIdAndRemove(id)
    .then(content => {
      searchResult = content;

      if (!searchResult) {
        errorStatusCode = 404;
        errors.notFound = { 'message': 'Content with ID ' + id + ' not found.'};
      };
    }).catch(mongoErrors => {
      errorStatusCode = 500;
      mongoDbService.convertMongoErrors(mongoErrors, errors);
    });


  return new Promise((resolve, reject) => {
    if (!errorStatusCode) {
      resolve(searchResult);
    } else {
      reject(errorStatusCode);
    };
  });
}

module.exports = { list, show, create, update, destroy };
