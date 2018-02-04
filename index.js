require('dotenv').config(); // read env variables from .env file

// store directory names for cleaner requires
global.__rootDir = __dirname;
global.__helpersDir = __dirname + '/helpers';
global.__middlewareDir = __dirname + '/middleware';
global.__modelsDir = __dirname + '/models';

const server = require('./config/server');
const db = require('./config/db'); // connect to database

const port = process.env.ENVIRONMENT === 'test' ? process.env.TEST_PORT : process.env.PORT

server.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = server;
