const Content = require(__modelsDir + '/Content');
const mongoDbService = require(__helpersDir + '/mongoDb');

const setContentValues = (queryParams, content) => {
  const { title, genre, releaseDate, thumbnail } = queryParams;

  content.title = title;
  content.genre = genre;
  content.releaseDate = releaseDate ? Date.parse(releaseDate) : null;
  content.thumbnail = thumbnail;
  content.updated = Date.now();
};

const getAllContent = async () => {
  let searchResult;
  let errors;

  await Content.find({})
    .then(contents => {
      searchResult = contents;
    })
    .catch(mongoErrors => {
      errors = mongoDbService.convertMongoErrors(mongoErrors);
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
      if (!content) errors = {'notFound': { 'message': 'Content with ID ' + id + ' not found.'}};
      searchResult = content;
    })
    .catch(mongoErrors => {
      errors = mongoDbService.convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(searchResult);
    } else {
      reject(errors);
    };
  });
};

const saveContent = async content => {
  let result;
  let errors;

  await content.save()
    .then(content => {
      result = content;
    })
    .catch(mongoErrors => {
      errors = mongoDbService.convertMongoErrors(mongoErrors);
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
        errors = {'notFound': { 'message': 'Content with ID ' + id + ' not found.'}};
      } else {
        result = {'message': content.title + ' was deleted.'};
      };
    })
    .catch(mongoErrors => {
      errors = mongoDbService.convertMongoErrors(mongoErrors);
    });

  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(result);
    } else {
      reject(errors);
    };
  });
};

module.exports = { setContentValues, getAllContent, findContent, saveContent, findAndDestroyContent };
