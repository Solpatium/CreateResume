const mongoose = require('mongoose');

const options = process.env.MONGO_USER ?
  {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD
  } :
  {}

mongoose.connect(process.env.MONGO_URL, options)

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection opened');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


const User = mongoose.model('User', {
  provider: String,
  id: String,
  name: String,
  surname: String,
  email: String,
  picture: String,
  profileUrl: String,
  positions: [{
    company: String,
    isCurrent: Boolean,
    startDateMonth: Number,
    startDateYear: Number,
    endDateMonth: Number,
    endDateYear: Number
  }]
});

module.exports = {
  User: User
};