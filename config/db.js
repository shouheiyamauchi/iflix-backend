const mongoose = require('mongoose');

const dbUrl = process.env.ENVIRONMENT === 'test' ? process.env.TEST_DB_URL : process.env.DB_URL

mongoose.connect(dbUrl);
