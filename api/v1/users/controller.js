const { sendResponse } = require(__helpersDir + '/api');
const { getAllUsers, createAndSaveNewUser, matchUsernamePassword, findAndUpdateUserPassword, findAndChangeUserRole, findAndDestroyUser } = require('./services');

const list = (req, res) => {
  getAllUsers(req.query)
    .then(contents => {
      const statusCode = 200;
      sendResponse(res, statusCode, contents);
    })
    .catch(errors => {
      const statusCode = 500;
      sendResponse(res, statusCode, errors);
    });
};

const signup = (req, res) => {
  createAndSaveNewUser(req.query)
    .then(user => {
      const statusCode = 200;
      sendResponse(res, statusCode, user);
    })
    .catch(errors => {
      const statusCode = ('duplicateUsername' in errors) ? 409 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const login = (req, res) => {
  matchUsernamePassword(req.query)
    .then(userIdAndToken => {
      const statusCode = 200;
      sendResponse(res, statusCode, userIdAndToken);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const update = (req, res) => {
  findAndUpdateUserPassword(req.params, req.query)
    .then(user => {
      const statusCode = 200;
      sendResponse(res, statusCode, user);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const changeRole = (req, res) => {
  findAndChangeUserRole(req.query)
    .then(user => {
      const statusCode = 200;
      sendResponse(res, statusCode, user);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const destroy = (req, res) => {
  findAndDestroyUser(req.params)
    .then(result => {
      const statusCode = 200;
      sendResponse(res, statusCode, result);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { list, signup, login, update, changeRole, destroy };
