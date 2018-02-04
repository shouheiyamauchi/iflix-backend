const Content = require(__modelsDir + '/Content');
const { sendResponse } = require(__helpersDir + '/api');
const { getAllContents, findContent, setContentValues, saveContent, findAndDestroyContent } = require('./services');

const list = (req, res) => {
  getAllContents()
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
  findContent(req.params.id)
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
  const content = new Content();
  setContentValues(req.query, content);

  saveContent(content)
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
  const findContentPromise = findContent(req.params.id);

  const updateContentPromise = findContentPromise.then(content => {
    setContentValues(req.query, content);
    return saveContent(content);
  });

  Promise.all([findContentPromise, updateContentPromise])
    .then(([foundContent, updatedContent]) => {
      const statusCode = 200;
      sendResponse(res, statusCode, updatedContent);
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
