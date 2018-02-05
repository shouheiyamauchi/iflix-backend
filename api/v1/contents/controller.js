const { sendResponse } = require(__helpersDir + '/api');
const { getAllContents, findContent, createAndSaveContent, findAndUpdateContent, findAndDestroyContent } = require('./services');

const list = (req, res) => {
  getAllContents(req.query)
    .then(contents => {
      const statusCode = 200;
      sendResponse(res, statusCode, contents);
    })
    .catch(errors => {
      const statusCode = 500;
      sendResponse(res, statusCode, errors);
    });
};

const show = (req, res) => {
  findContent(req.params)
    .then(content => {
      const statusCode = 200;
      sendResponse(res, statusCode, content);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const create = (req, res) => {
  createAndSaveContent(req.query)
    .then(content => {
      const statusCode = 200;
      sendResponse(res, statusCode, content);
    })
    .catch(errors => {
      const statusCode = 500;
      sendResponse(res, statusCode, errors);
    });
};

const update = (req, res) => {
  findAndUpdateContent(req.params, req.query)
    .then(content => {
      const statusCode = 200;
      sendResponse(res, statusCode, content);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const destroy = (req, res) => {
  findAndDestroyContent(req.params.id)
    .then(result => {
      const statusCode = 200;
      sendResponse(res, statusCode, result);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { list, show, create, update, destroy };
