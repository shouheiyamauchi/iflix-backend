const passport = require("passport");
const passportJwt = require("passport-jwt");
const jwt = require('jsonwebtoken');
const User = require(__modelsDir + '/User');
const { sendResponse } = require(__helpersDir + '/api');

// set up passport
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, done) {
  User.findById(jwtPayload.id)
    .then(user => {
      done(null, user);
    })
    .catch(errors => {
      done(null, false);
    });
});

passport.use(strategy);

const checkAuthHeaderIdMatch = (req, res, next) => {
  const loggedInUser = req.user
  const requestUserId = req.query.userId || req.params.id // for user routes id will be in params

  if (loggedInUser._id != requestUserId) {
    const statusCode = 401;
    const errorMessage = {unauthorized: {message: 'The logged in user and userId parameter for this request does not match.'}};
    sendResponse(res, statusCode, errorMessage);
  } else {
    next();
  };
};

module.exports = { passport, checkAuthHeaderIdMatch };