var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/database';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ',+ dbURI);
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

//Nodemon restart
process.once('SUGUSR2', function(){
  gracefulShutdown('mondemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});
//App termination
process.on('SIGINT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});
//Heroku app termination
process.on('SIGTERM', function(){
  gracefulShutdown('Heroku app shutdown', function(){
    process.exit(0);
  });
});

var Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID;

var houseSchema = new Schema({
  owner     : {type : String, match : /[a-z]/, index: true},
  address   : {type : String, index : true},
  zip       : {type : Number, min : 10000, max : 99999,index : true},
  hood      : {type : String},
  email     : {type : String, index : true},
  phone     : {type : String, index : true},
  features  : {type : [String]},
  listDate  : {type : Date , index: true},
  sellPrice : {type : Number, min: 0, "default" : 0, index: true},
  rentPrice : {type : Number, min: 0, "default" : 0, index: true},
  img       : {type : [Buffer], contentType: String},
  coords    : {type : [Number], index: '2dsphere}
});

var userSchema = new Schema({
  userName      : {type : String, index: true},
  password      : {type : String, index: true},
  houseSelling  : [houseSchema],
  houseBought   : [houseSchema],
  houseSold     : [houseSchema]
});
