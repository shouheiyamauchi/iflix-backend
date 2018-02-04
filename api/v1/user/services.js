const User = require(__modelsDir + '/User');
const { convertMongoErrors, notFoundError } = require(__helpersDir + '/mongoDb');

const findUser = async id => {
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

const findAndDestroyUser = async id => {
  let result;
  let errors;

  await User.findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        errors = notFoundError('User', id);
      } else {
        result = {'message': user.username + ' was deleted.'};
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

module.exports = { findUser, setUserValues, saveUser, findAndDestroyUser };
