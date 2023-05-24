var express = require('express');
var router = express.Router();
var paymentsController = require('../controllers/payments');
var responseConstants = require('../responses/payments');
var verifyAccessTokenMiddleWare = require('../controllers/auth').verifyAccessTokenMiddleWare;

// create order and provide
router.get('/createorder', verifyAccessTokenMiddleWare, async function (req, res, next) {
    try {
        let orderInfo = await paymentsController.createPaymentOrder(req.headers.phone_number);
        if (orderInfo) {
            let response = responseConstants.constants.orderCreatedSuccessfully;
            response.data = orderInfo;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.unableToCreateOrder;
    return res.status(response.status).send(response);
});

// confirm and verfiy payment
router.post('/confirmpayment', verifyAccessTokenMiddleWare, async function (req, res, next) {
    try {
        let referralCode = req.body.referral_code || 'OWN_PAYMENT';
        let orderInfo = await paymentsController.verifyPaymentOrder(
            req.body.razorpay_order_id,
            req.body.razorpay_payment_id,
            req.body.razorpay_signature,
            req.headers.phone_number,
            referralCode);
        if (orderInfo) {
            let response = responseConstants.constants.paymentVerifiedSuccessfully;
            return res.status(response.status).send(response);
        }
    } catch (err) {
        console.log(err);
    }
    let response = responseConstants.constants.paymentVerificationFailed;
    return res.status(response.status).send(response);
});

module.exports = router;