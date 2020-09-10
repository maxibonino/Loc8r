var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/Loc8r';

// reads env variables
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ', dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// nodemon restart
process.once('SIGUSR2', function (){
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./locations');