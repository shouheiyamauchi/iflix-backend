const errorsToArray = mongoErrorHash => {
  const errorsArray = Object.keys(mongoErrorHash.errors).map(field => {
    return {
      field,
      message: mongoErrorHash.errors[field].message
    };
  });

  return errorsArray;
}

module.exports = { errorsToArray };
