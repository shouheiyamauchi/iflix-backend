require('dotenv').config(); // read env variables from .env file

const express = require('express');
const db = require('./db'); // connect to database
const apiV1 = require('./api/v1');

const app = express();
app.use('/api/v1', apiV1);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
