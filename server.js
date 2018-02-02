const express = require('express');
const apiV1 = require('./api/v1');

const app = express();
app.use('/api/v1', apiV1);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
