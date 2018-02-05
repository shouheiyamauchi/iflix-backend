const mongoose = require('mongoose');

const dbName = {
  dev: process.env.DB_NAME,
  test: process.env.TEST_DB_NAME
}[process.env.ENVIRONMENT];

mongoose.connect(process.env.DB_URL + dbName);
