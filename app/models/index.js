const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var mongoURL = null;

const db = {};
console.log('mongoURL: ' + mongoURL);
if (mongoURL == null) {
    console.log('finding out mongoURL');
    var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
    // If using plane old env vars via service discovery
    if (process.env.DATABASE_SERVICE_NAME) {
      console.log('DATABASE_SERVICE_NAME: ' + process.env.DATABASE_SERVICE_NAME.toUpperCase());
      var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase().replace(/-/g, '_');
      console.log('mongoServiceName: ' + mongoServiceName);
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];

      mongoDatabase = process.env['MONGODB_DATABASE'];
      mongoPassword = process.env['MONGODB_PASSWORD'];
      mongoUser = process.env['MONGODB_USER'];
  
      console.log('mongoHost: ' + mongoHost);
      console.log('mongoPort: ' + mongoPort);
      console.log('mongoDatabase: ' + mongoDatabase);
      console.log('mongoPassword: ' + mongoPassword);
      console.log('mongoUser: ' + mongoUser);

    // If using env vars from secret from service binding  
    } else if (process.env.database_name) {
      mongoDatabase = process.env.database_name;
      mongoPassword = process.env.password;
      mongoUser = process.env.username;
      var mongoUriParts = process.env.uri && process.env.uri.split("//");
      if (mongoUriParts.length == 2) {
        mongoUriParts = mongoUriParts[1].split(":");
        if (mongoUriParts && mongoUriParts.length == 2) {
          mongoHost = mongoUriParts[0];
          mongoPort = mongoUriParts[1];
        }
      }
    }
  
    if (mongoHost && mongoPort && mongoDatabase) {
        
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
        mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
        console.log('mongoURL: ' + mongoURL);
    }else{
      console.log('OH NO');
    }
}

db.mongoose = mongoose;
db.url = mongoURL;
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;
