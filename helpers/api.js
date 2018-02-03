const sendResponse = (res, statusCode, payloadData) => {
  const responseJson = {
    data: {},
    errors: {}
  }

  if (statusCode === 200) {
    responseJson.data = payloadData;
  } else {
    responseJson.errors = payloadData;
  }

  res.status(statusCode).send(responseJson);
};

module.exports = { sendResponse };
