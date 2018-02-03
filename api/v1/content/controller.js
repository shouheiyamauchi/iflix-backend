const Content = require(__modelsDir + '/Content');
const apiService = require(__helpersDir + '/api');
const mongoDbService = require(__helpersDir + '/mongoDb');
const contentServices = require('./services');

const list = (req, res) => {
  Content.find({}, (mongoErrors, contents) => {
    const statusCode = mongoErrors ? 500 : 200;
    const result = mongoErrors ? mongoDbService.convertMongoErrors(mongoErrors) : contents;

    apiService.sendResponse(res, statusCode, result);
  });
};

const show = (req, res) => {
  contentServices.findContent(req.params.id)
    .then(content => {
      const statusCode = content ? 200 : 404;
      const result = content || {'notFound': { 'message': 'Content with ID ' + req.params.id + ' not found.'}};

      apiService.sendResponse(res, statusCode, result);
    }).catch(errors => {
      const statusCode = 500;
      apiService.sendResponse(res, statusCode, errors);
    });
};

const create = (req, res) => {
  const content = new Content();
  contentServices.setContentValues(req.query, content);
  saveContentSendRes(res, content);
};

const update = (req, res) => {
  contentServices.findContent(req.params.id)
    .then(content => {
      if (!content) {
        const statusCode = 404;
        const result = {'notFound': { 'message': 'Content with ID ' + req.params.id + ' not found.'}};

        apiService.sendResponse(res, statusCode, result);
      } else {
        contentServices.setContentValues(req.query, content);
        saveContentSendRes(res, content);
      };
    }).catch(errors => {
      const statusCode = 500;
      apiService.sendResponse(res, statusCode, errors);
    });
};

const destroy = (req, res) => {
  contentServices.findAndDestroyContent(req.params.id)
    .then(content => {
      const statusCode = content ? 200 : 404;
      const result = {};

      if (statusCode === 200) result.message = content.title + ' was deleted.';
      if (statusCode === 404) result.notFound = { 'message': 'Content with ID ' + req.params.id + ' not found.'};

      apiService.sendResponse(res, statusCode, result);
    }).catch(errors => {
      const statusCode = 500;
      apiService.sendResponse(res, statusCode, errors);
    });
};

const saveContentSendRes = (res, content) => {
  content.save((mongoErrors, content) => {
    const statusCode = mongoErrors ? 500 : 200;
    const result = mongoErrors ? mongoDbService.convertMongoErrors(mongoErrors) : content;

    apiService.sendResponse(res, statusCode, result);
  });
};

module.exports = { list, show, create, update, destroy };
