const mongoose = require("mongoose");

// DB Schema
const subCtgTextBannerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    sub_ctg_name: {
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
const subCtgTextBanner = mongoose.model("subcategory-textbanner", subCtgTextBannerSchema);

module.exports = subCtgTextBanner;