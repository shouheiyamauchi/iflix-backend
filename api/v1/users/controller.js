const User = require(__modelsDir + '/User');
const { sendResponse } = require(__helpersDir + '/api');
const { setUserValues, saveUser, findUserByUsernamePassword, findUserById, findAndDestroyUser } = require('./services');

const signup = (req, res) => {
  const user = new User();
  setUserValues(req.query, user);

  saveUser(user)
    .then(user => {
      const statusCode = 200;
      sendResponse(res, statusCode, user);
    })
    .catch(errors => {
      const statusCode = 500;
      sendResponse(res, statusCode, errors);
    });
};

const login = (req, res) => {
  findUserByUsernamePassword(req.query)
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
  let findUserByIdPromise = findUserById(req.params.id);
  let updateUserPromise = findUserByIdPromise.then(user => {
    setUserValues(req.query, user);
    return saveUser(user);
  });

  Promise.all([findUserByIdPromise, updateUserPromise])
    .then(([foundUser, updatedUser]) => {
      const statusCode = 200;
      sendResponse(res, statusCode, updatedUser);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

const destroy = (req, res) => {
  findAndDestroyUser(req.params.id)
    .then(result => {
      const statusCode = 200;
      sendResponse(res, statusCode, result);
    })
    .catch(errors => {
      const statusCode = ('notFound' in errors) ? 404 : 500;
      sendResponse(res, statusCode, errors);
    });
};

module.exports = { signup, login, update, destroy };
