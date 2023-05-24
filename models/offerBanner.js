const mongoose = require("mongoose");

// DB Schema
const offerBannerSchema = new mongoose.Schema({
    img_name: {
       type: String,
       required: true,
       unique: true
    },
    orderNo: {
        type: Number,
        default: 0
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const offerBanner = mongoose.model("offer-banner", offerBannerSchema);

module.exports = offerBanner;