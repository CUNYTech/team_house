// Importing Node modules and initializing Express
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      router = require('./router'),
      passport = require('passport');

// Database Setup

try{
    var config = process.env || require('./config/main');
    // mongoose.connect('mongodb://localhost:27017/house2');
}
catch(e){
    config = process.env;
    console.log(e);
}

//mongoose.connect(config.DATABASE);

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Start the server
app.listen(config.PORT, function () {
  console.log('Your server is running on port ' + config.PORT + '.');
});

app.use(passport.initialize());

app.use('/', router);
