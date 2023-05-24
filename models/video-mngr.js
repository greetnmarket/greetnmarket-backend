const mongoose = require("mongoose");

// DB Schema
const videoManagerSchema = new mongoose.Schema({
    video_name: {
       type: String,
       default: '',
       unique: true,
       required: true
    },
    sub_ctg_associaton: {
        type: Array,
        default: []
    },
    lang_association: {
        type: String,
        default: ''
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const videoManager = mongoose.model("video-manager", videoManagerSchema);

module.exports = videoManager;