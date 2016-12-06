"use strict";

const jwt = require('jsonwebtoken'),
      User = require('../models/user');

try{
    var config = process.env;
}
catch(e){
    // config = process.env;
    console.log(e);
}

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return 'JWT ' + jwt.sign(user, config.SECRET, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(request) {
  let getUserInfo = {
    _id: request._id,
    email: request.email,
    fullname: request.fullname
  };

  return getUserInfo;
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: generateToken(userInfo),
    user: userInfo
  });
};

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email     = req.body.email;
  const fullname  = req.body.fullname;
  const password  = req.body.password;
  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        fullname: fullname,
        password: password
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: generateToken(userInfo),
          user: userInfo
        });
      });
  });
};
