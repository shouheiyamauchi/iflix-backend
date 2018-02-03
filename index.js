require('dotenv').config(); // read env variables from .env file
global.__rootDir = __dirname + '/'; // store root dir name for cleaner requires
global.__servicesDir = __dirname + '/services/'; // store services dir name for cleaner requires

const server = require('./config/server');
const db = require('./config/db'); // connect to database

const port = process.env.ENVIRONMENT === 'test' ? process.env.TEST_PORT : process.env.PORT

server.listen(port, () => {
  console.log('Server listening on port ' + port);
});

module.exports = server;
