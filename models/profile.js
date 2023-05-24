const mongoose = require("mongoose");

// DB Schema
const profileSchema = new mongoose.Schema({
    name: {
       type: String,
       default: ''
    },
    email: {
        type: String,
        default: ''
    },
    company_name: {
        type: String,
        default: ''
    },
    professional_mail: {
        type: String,
        default: ''
    },
    business_pic_url: {
        type: String,
        default: ''
    },
    profile_pic_url: {
        type: String,
        default: ''
    },
    business_category: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    },
    mobile_no: {
        type: String,
        unique: true,
        required: true
    },
    website: {
        type: String,
        default: ''
    },
    blocked: {
        type: Number,
        default: 0
    },
    last_business_changedAt: {
        type: Date
    },
    imageDownCount: {
        type: Number,
        default: 0
    },
    isPaidUser: {
        type: Number,
        default: 0
    },
    paymentExpiryDate: {
        type: Date,
        default: new Date()
    },
    referralcode: {
        type: String,
        default: ''
    },
    business_address: {
        type: String,
        default: ''
    },
    business_ph_1: {
        type: String,
        default: ''
    },
    business_ph_2: {
        type: String,
        default: ''
    },
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
// profileSchema.clearIndexes({ "mobile_no": 1 }, { sparse: true })

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;