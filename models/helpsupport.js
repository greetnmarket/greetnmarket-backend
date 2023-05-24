const mongoose = require("mongoose");

// DB Schema
const reportInfo = new mongoose.Schema({
    user: {
       type: String,
       required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resolved: {
        type: Number,
        default: 0
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const frames = mongoose.model("reportinfo", reportInfo);

module.exports = frames;