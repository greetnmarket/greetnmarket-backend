const mongoose = require("mongoose");

// DB Schema
const subCategorySchema = new mongoose.Schema({
    sub_ctg_name: {
       type: String,
       default: '',
       unique: true
    },
    ctg_associaton: {
        type: Array,
        default: []
    },
    orderNo: {
        type: Number,
        default: 0
    },
    sub_ctg_list_assoc: {
        type: Array,
        default: []
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const subCategory = mongoose.model("sub-categories", subCategorySchema);

module.exports = subCategory;