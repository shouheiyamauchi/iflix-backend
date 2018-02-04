// rearrange mongoDB error object for cleaner API
const convertMongoErrors = (mongoErrorObject) => {
  errors = {};

  if (mongoErrorObject.errors) errors.validationErrors = mongoErrorObject.errors;
  if (mongoErrorObject.kind === 'ObjectId') errors.objectId = mongoErrorObject;

  return errors;
};

const notFoundError = (modelName, id) => {
  return {'notFound': { 'message': modelName + ' with ID ' + id + ' not found.'}};
};

const deleteResult = value => {
  return {'message': value + ' was deleted.'};
};

module.exports = { convertMongoErrors, notFoundError, deleteResult };
