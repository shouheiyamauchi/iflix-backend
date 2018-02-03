const Content = require(__modelsDir + '/Content');
const { convertMongoErrors, notFoundError } = require(__helpersDir + '/mongoDb');

const getAllContent = async () => {
  let searchResult;
  let errors;

  await Content.find({})
    .then(contents => {
      searchResult = contents;
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

const findContent = async id => {
  let searchResult;
  let errors;

  await Content.findById(id)
    .then(content => {
      if (!content) errors = notFoundError('Content', id);
      searchResult = content;
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

const setContentValues = (queryParams, content) => {
  const { title, genre, releaseDate, thumbnail } = queryParams;

  content.title = title;
  content.genre = genre;
  content.releaseDate = releaseDate ? Date.parse(releaseDate) : null;
  content.thumbnail = thumbnail;
  content.updated = Date.now();
};

const saveContent = async content => {
  let result;
  let errors;

  await content.save()
    .then(content => {
      result = content;
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

const findAndDestroyContent = async id => {
  let result;
  let errors;

  await Content.findByIdAndRemove(id)
    .then(content => {
      if (!content) {
        errors = notFoundError('Content', id);
      } else {
        result = {'message': content.title + ' was deleted.'};
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

module.exports = { getAllContent, findContent, setContentValues, saveContent, findAndDestroyContent };
