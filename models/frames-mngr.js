const mongoose = require("mongoose");

// DB Schema
const frameSchema = new mongoose.Schema({
    user: {
       type: String,
       required: true,
      //  unique: true
    },
    frame_info: {
        type: Array,
        default: []
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const frames = mongoose.model("frames-v2", frameSchema);

module.exports = frames;