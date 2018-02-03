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

const findContent = async (id) => {
  let searchResult;
  let errors;

  await Content.findById(id)
    .then(content => {
      searchResult = content;
    }).catch(mongoErrors => {
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

const findAndDestroyContent = async (id) => {
  let searchResult;
  let errors;

  await Content.findByIdAndRemove(id)
    .then(content => {
      searchResult = content;
    }).catch(mongoErrors => {
      errors = mongoDbService.convertMongoErrors(mongoErrors);
    });


  return new Promise((resolve, reject) => {
    if (!errors) {
      resolve(searchResult);
    } else {
      reject(errors);
    };
  });
}

module.exports = { setContentValues, findContent, findAndDestroyContent };
