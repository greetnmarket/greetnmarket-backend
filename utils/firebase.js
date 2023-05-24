require('dotenv').config();
var firebaseAdmin = require("firebase-admin");

var serviceAccount = require(process.env.FIREBASE_CREDENTIAL);

module.exports.initializeFirebase = () => {
    return firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });
}