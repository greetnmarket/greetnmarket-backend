const mongoose = require("mongoose");

// DB Schema
const categoriesSchema = new mongoose.Schema({
    ctg_name: {
       type: String,
       default: '',
       unique: true
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const categories = mongoose.model("categories", categoriesSchema);

module.exports = categories;