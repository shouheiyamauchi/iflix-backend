const express = require('express');
const contentRoutes = require('./content/contentRoutes');

const app = express();

app.use('/contents', contentRoutes);

module.exports = app;
