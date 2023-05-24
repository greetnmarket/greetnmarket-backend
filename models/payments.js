const mongoose = require("mongoose");

// DB Schema
const paymentsSchema = new mongoose.Schema({
    orderId: {
       type: String,
       required: true,
       unique: true
    },
    paymentId: {
        type: String
    },
    paymentSignature: {
        type: String
    },
    createdBy: {
        type: String,
        required: true,
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const payments = mongoose.model("payments", paymentsSchema);

module.exports = payments;