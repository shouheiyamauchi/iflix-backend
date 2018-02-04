const express = require('express');
const contentRoutes = require('./contents/routes');
const ratingRoutes = require('./ratings/routes');
const userRoutes = require('./users/routes');

const app = express();

app.use('/contents', contentRoutes);
app.use('/ratings', ratingRoutes);
app.use('/users', userRoutes);

module.exports = app;
