// rearrange mongoDB error object for cleaner API
const convertMongoErrors = (mongoErrorObject) => {
  errors = {};

  if (mongoErrorObject.errors) errors.validationErrors = mongoErrorObject.errors;
  if (mongoErrorObject.kind === 'ObjectId') errors.objectId = mongoErrorObject;

  return errors;
};

module.exports = { convertMongoErrors };
