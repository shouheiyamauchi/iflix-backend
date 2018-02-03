const Content = require('./contentModel');
const apiService = require(__services + 'api');

const create = (req, res) => {
  const content = new Content();
  setContentValues(req, content);
  saveContentSendRes(res, content);
};

const setContentValues = (req, content) => {
  const {
    title,
    genre,
    releaseDate,
    thumbnail
  } = req.query;

  content.title = title;
  content.genre = genre;
  content.releaseDate = Date.parse(releaseDate);
  content.thumbnail = thumbnail;
  content.updated = Date.now();
};

const saveContentSendRes = (res, content) => {
  content.save((mongoErrors, content) => {
    const statusCode = mongoErrors ? 500 : 200;

    const err = mongoErrors

    apiService.sendResponse(res, statusCode, content, err);
  });
};

module.exports = { create };
