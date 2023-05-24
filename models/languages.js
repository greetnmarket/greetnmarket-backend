const mongoose = require("mongoose");

// DB Schema
const languagesSchema = new mongoose.Schema({
    lang_name: {
       type: String,
       required: true,
       unique: true
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const languages = mongoose.model("languages", languagesSchema);

module.exports = languages;