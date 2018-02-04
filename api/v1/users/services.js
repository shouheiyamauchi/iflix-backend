const User = require(__modelsDir + '/User');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const setUserValues = (queryParams, user) => {
  const { username, password } = queryParams;

  user.username = username;
  user.password = password;
  user.updated = Date.now();
};

const saveUser = async user => {
  let result;
  let errors;

  await user.save()
    .then(user => {
      result = user;
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

findUserByUsernamePassword = async queryParams => {
  let searchResult;
  let errors;

  if (!queryParams.username || !queryParams.password) {
    errors = {};

    if (!queryParams.username) errors.usernameMissing = { 'message': 'Username is missing from request.'};
    if (!queryParams.password) errors.passwordMissing = { 'message': 'Password is missing from request.'};
  } else {
    await User.findOne({ username: queryParams.username, password: queryParams.password }).exec()
      .then(user => {
        if (!user) errors = {'notFound': { 'message': 'Username and the password entered did not match any records.'}};
        searchResult = user;
      })
      .catch(mongoErrors => {
        errors = convertMongoErrors(mongoErrors);
      });
  };

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(searchResult);
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

module.exports = { setUserValues, saveUser, findUserByUsernamePassword, findUserById, findAndDestroyUser };
