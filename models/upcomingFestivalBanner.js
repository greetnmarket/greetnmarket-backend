const mongoose = require("mongoose");

// DB Schema
const upcomingFestivalBannerSchema = new mongoose.Schema({
    img_name: {
       type: String,
       required: true,
       unique: true
    },
    sub_ctg_name: {
      type: String,
      required: true,
    },
    from: {
        type: Date,
        default: new Date()
    },
    to: {
        type: Date,
        default: new Date()
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
const upcomingFestivalBanner = mongoose.model("upcoming-festival-banner", upcomingFestivalBannerSchema);

module.exports = upcomingFestivalBanner;