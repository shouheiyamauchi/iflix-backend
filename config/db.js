const mongoose = require('mongoose');

const dbUrl = {
  localDev: process.env.LOCAL_DB_URL,
  localTest: process.env.LOCAL_TEST_DB_URL,
  dev: process.env.DB_URL,
  test: process.env.TEST_DB_URL
}[process.env.ENVIRONMENT];

mongoose.connect(dbUrl);
