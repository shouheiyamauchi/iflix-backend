const sendResponse = (res, statusCode, data, errors) => {
  res.status(statusCode).send({
    data,
    errors
  });
};

module.exports = { sendResponse };
