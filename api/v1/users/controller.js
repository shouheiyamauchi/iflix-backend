const User = require(__modelsDir + '/User');
const { sendResponse } = require(__helpersDir + '/api');
const { checkDuplicatUsername, setNewUserValues, changeUserRole, changeUserPassword, saveUser, matchUsernamePassword, findUserById, findAndDestroyUser } = require('./services');

const signup = (req, res) => {
  const checkDuplicatUsernamePromise = checkDuplicatUsername(req.query.username);
  const saveUserPromise = checkDuplicatUsernamePromise.then(() => {
    const user = new User();
    setNewUserValues(req.query, user);

    return saveUser(user);
  });

  Promise.all([checkDuplicatUsernamePromise, saveUserPromise])
    .then(([duplicateUsernameCheck, savedUser]) => {
      const statusCode = 200;
      sendResponse(res, statusCode, savedUser);
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
  const findUserByIdPromise = findUserById(req.params.id);
  const updateUserPromise = findUserByIdPromise.then(user => {
    changeUserPassword(user, req.query.password);
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

const changeRole = (req, res) => {
  const findUserByIdPromise = findUserById(req.query.userId);
  const updateUserRolePromise = findUserByIdPromise.then(user => {
    changeUserRole(user, req.query.role);
    return saveUser(user);
  });

  Promise.all([findUserByIdPromise, updateUserRolePromise])
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

module.exports = { signup, login, update, changeRole, destroy };
