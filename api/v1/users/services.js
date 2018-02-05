const jwt = require('jsonwebtoken');
const User = require(__modelsDir + '/User');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

checkDuplicatUsername = async username => {
  let errors;

  await User.findOne({ username }).exec()
    .then(user => {
      if (user) errors = {'duplicateUsername': { 'message': 'That username is already taken.' }};
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(null);
    } else {
      reject(errors);
    };
  });
};

const setNewUserValues = (queryParams, user) => {
  const { username, password } = queryParams;

  user.username = username;
  user.password = password;
  user.updated = Date.now();
};

const changeUserPassword = (user, password) => {
  user.password = password;
  user.updated = Date.now();
};

const changeUserRole = (user, role) => {
  user.role = role;
  user.updated = Date.now();
};

const saveUser = async user => {
  let result;
  let errors;

  await user.save()
    .then(user => {
      result = user.toObject();
      // don't display password on API endpoint
      delete result.password;
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

matchUsernamePassword = async queryParams => {
  let result;
  let errors;

  if (!queryParams.username || !queryParams.password) {
    errors = {};

    if (!queryParams.username) errors.usernameMissing = { 'message': 'Username is missing from request.'};
    if (!queryParams.password) errors.passwordMissing = { 'message': 'Password is missing from request.'};
  } else {
    await User.findOne({ username: queryParams.username, password: queryParams.password }).exec()
      .then(user => {
        if (!user) {
          errors = {'notFound': { 'message': 'Username and the password entered did not match any records.'}};
        } else {
          const payload = {id: user._id};
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          result = { userId: user._id, userRole: user.role, token };
        };
      })
      .catch(mongoErrors => {
        errors = convertMongoErrors(mongoErrors);
      });
  };

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const findUserById = async id => {
  let searchResult;
  let errors;

  await User.findById(id)
    .then(user => {
      if (!user) errors = notFoundError('User', id);
      searchResult = user;
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(searchResult);
    } else {
      reject(errors);
    };
  });
};

const findAndDestroyUser = async id => {
  let result;
  let errors;

  await User.findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        errors = notFoundError('User', id);
      } else {
        result = deleteResult(user.username);
      };
    })
    .catch(mongoErrors => {
      errors = convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

module.exports = { checkDuplicatUsername, setNewUserValues, changeUserPassword, changeUserRole, saveUser, matchUsernamePassword, findUserById, findAndDestroyUser };
