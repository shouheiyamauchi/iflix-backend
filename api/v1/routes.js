const express = require('express');
const contentRoutes = require('./content/routes');

const app = express();

app.use('/contents', contentRoutes);

module.exports = app;
