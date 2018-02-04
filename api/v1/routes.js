const express = require('express');
const contentRoutes = require('./content/routes');
const ratingRoutes = require('./rating/routes');
const userRoutes = require('./user/routes');

const app = express();

app.use('/contents', contentRoutes);
app.use('/ratings', ratingRoutes);
app.use('/users', userRoutes);

module.exports = app;
