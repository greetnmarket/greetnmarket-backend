const mongoose = require("mongoose");

// DB Schema
const commonSubCategorySchema = new mongoose.Schema({
    cmn_sub_ctg_name: {
       type: String,
       required: true,
       unique: true
    },
    enabled: {
        type: Number,
        default: 0
    },
    orderNo: {
        type: Number,
        default: 0
    },
    cmn_sub_ctg_list_assoc: {
        type: Array,
        default: []
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const cmnSubCategory = mongoose.model("common-sub-categories", commonSubCategorySchema);

module.exports = cmnSubCategory;