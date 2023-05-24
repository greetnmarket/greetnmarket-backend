const Razorpay = require('razorpay');
require('dotenv').config();

var razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

module.exports.razorpayInstance = razorpayInstance;