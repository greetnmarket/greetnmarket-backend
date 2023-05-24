var razorpayInstance = require('../utils/razorpay').razorpayInstance;
var paymentsHandler = require('../modelsWrapper/payments');
var profileHandler = require('../modelsWrapper/profile');
const crypto = require('crypto');
require('dotenv').config();

module.exports.createPaymentOrder = async function(phoneNumber) {
    try {
        var options = {
            amount: process.env.PAYMENT_AMOUNT,  // amount in the smallest currency unit
            currency: process.env.PAYMENT_CURRENCY,
            receipt: crypto.randomUUID().toString()
        };
        let order = await razorpayInstance.orders.create(options);
        if (order) {
            let orderCreation = await paymentsHandler.createPayment(order.id, phoneNumber);
            if (orderCreation) {
                let orderInfo = {
                    'orderId': order.id,
                    'keyId': process.env.RAZORPAY_API_KEY,
                    'amount': process.env.PAYMENT_AMOUNT,  // amount in the smallest currency unit
                    'currency': process.env.PAYMENT_CURRENCY,
                };
                return orderInfo;
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.verifyPaymentOrder = async function(orderId, paymentId, paymentSignature, phoneNumber, referralCode) {
    try {
        let paymentInfo = orderId + "|" + paymentId;
        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
            .update(paymentInfo.toString()).digest('hex');
        if (!(expectedSignature === paymentSignature)) {
            throw('Fault order error maybe hacking try --->', orderId, paymentId, paymentSignature);
        }
        let updatePaymentInfo = await paymentsHandler.addPaymentConfirmInfo(orderId, paymentId, paymentSignature);
        if (updatePaymentInfo) {
            let updateUserAsPaid = await profileHandler.updatePaidUserInformation(phoneNumber, referralCode);
            if (updateUserAsPaid) {
                return true;
            } else {
                console.log('IMP : Payment Information Confirmed but profile updation failed',
                phoneNumber, orderId, paymentId, paymentSignature);
            }
        }
    } catch (err) {
        console.log(err);
    }
    return false;
};