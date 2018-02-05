const jwt = require('jsonwebtoken');
const User = require(__modelsDir + '/User');
const { convertMongoErrors, notFoundError, deleteResult } = require(__helpersDir + '/mongoDb');

const createAndSaveNewUser = async queryObject => {
  let result, errors;
  const { username, password } = queryObject;

  const checkDuplicatUsernamePromise = checkDuplicatUsername(username);
  const saveUserPromise = checkDuplicatUsernamePromise.then(() => {
    const user = new User();
    setNewUserValues(user, queryObject);
    return saveUser(user);
  });

  await Promise.all([checkDuplicatUsernamePromise, saveUserPromise])
    .then(([duplicateUsernameCheck, savedUser]) => {
      result = savedUser;
    })
    .catch(saveErrors => {
      errors = saveErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const matchUsernamePassword = async queryObject => {
  let result, errors;
  const { username, password } = queryObject;

  if (!username || !password) {
    errors = {};

    if (!username) errors.usernameMissing = {'message': 'Username is missing from request.'};
    if (!password) errors.passwordMissing = {'message': 'Password is missing from request.'};
  } else {
    await User.findOne({ username: username, password: password }).exec()
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

const findAndUpdateUserPassword = async (paramsObject, queryObject) => {
  let result, errors;
  const { id } = paramsObject;
  const { password } = queryObject;

  const findUserByIdPromise = findUserById(id);
  const updateUserPromise = findUserByIdPromise.then(user => {
    changeUserPassword(user, password);
    return saveUser(user);
  });

  await Promise.all([findUserByIdPromise, updateUserPromise])
    .then(([foundUser, updatedUser]) => {
      result = updatedUser;
    })
    .catch(saveErrors => {
      errors = saveErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const findAndChangeUserRole = async (queryObject) => {
  let result, errors;
  const { userId, role } = queryObject;

  const findUserByIdPromise = findUserById(userId);
  const updateUserRolePromise = findUserByIdPromise.then(user => {
    changeUserRole(user, role);
    return saveUser(user);
  });

  await Promise.all([findUserByIdPromise, updateUserRolePromise])
    .then(([foundUser, updatedUser]) => {
      result = updatedUser;
    })
    .catch(saveErrors => {
      errors = saveErrors;
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

const findAndDestroyUser = async paramsObject => {
  let result, errors;
  const { id } = paramsObject;

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

const findUserById = async id => {
  let searchResult, errors;

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

const checkDuplicatUsername = async username => {
  let errors;

  await User.findOne({ username }).exec()
    .then(user => {
      if (user) errors = { 'duplicateUsername': { 'message': 'That username is already taken.' } };
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(null);
    } else {
      reject(errors);
    };
  });
};

const setNewUserValues = (user, queryObject) => {
  const { username, password } = queryObject;

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
  let result, errors;

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


module.exports = { createAndSaveNewUser, matchUsernamePassword, findAndUpdateUserPassword, findAndChangeUserRole, findAndDestroyUser };
