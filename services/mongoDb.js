// rearrange mongoDB error object for cleaner API
const convertMongoErrors = (mongoErrorObject, resErrorObject) => {
  if (mongoErrorObject.errors) resErrorObject.validationErrors = mongoErrorObject.errors;
  if (mongoErrorObject.kind === 'ObjectId') resErrorObject.objectId = mongoErrorObject;

  return resErrorObject;
};

module.exports = { convertMongoErrors };
