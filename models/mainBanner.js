const mongoose = require("mongoose");

// DB Schema
const mainBannerSchema = new mongoose.Schema({
    img_name: {
       type: String,
       required: true,
       unique: true
    },
    sub_ctg_name: {
      type: String,
      required: true,
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
const mainBanner = mongoose.model("main-banner", mainBannerSchema);

module.exports = mainBanner;