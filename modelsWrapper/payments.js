const payments = require("../models/payments");

module.exports.createPayment = async function (orderId, phoneNumber) {
    let paymentInfo;
    try {
        paymentInfo = await payments.create({
            'orderId': orderId,
            createdBy: phoneNumber
        });
        if (paymentInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

module.exports.addPaymentConfirmInfo = async function (orderId, paymentId, paymentSignature) {
    let paymentInfo;
    try {
        paymentInfo = await payments.updateOne({
            'orderId': orderId
        }, {
            'paymentId': paymentId,
            'paymentSignature': paymentSignature
        });
        if (paymentInfo) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}