require('dotenv').config();
var mongoose = require('mongoose');

var isConnectedBefore = false;
var mongoURL = process.env.MONGO_DB_URL;
console.log(mongoURL);
var connect = async function() {
    try {
        mongoose.connect(
            process.env.MONGO_DB_URL, { 
            user: process.env.MONGO_DB_USERNAME,
            pass: process.env.MONGO_DB_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
    } catch (err) {
        console.log(err);
    }
};

mongoose.connection.on('error', function() {
    console.log('Could not connect to MongoDB');
});

mongoose.connection.on('disconnected', function(){
    console.log('Lost MongoDB connection...');
    if (!isConnectedBefore) {
        console.log('Reconnecting');
        //connect();
        isConnectedBefore = false;
    }
});
mongoose.connection.on('connected', function() {
    isConnectedBefore = true;
    console.log('Connection established to MongoDB');
});

mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Force to close the MongoDB conection');
        process.exit(0);
    });
});

module.exports.connect = connect;