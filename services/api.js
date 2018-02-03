const sendResponse = (res, statusCode, data, errors) => {
  res.status(statusCode).send({
    data: data || {},
    errors: errors || []
  });
};

module.exports = { sendResponse };
