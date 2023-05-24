const mongoose = require("mongoose");

// DB Schema
const imgManagerSchema = new mongoose.Schema({
    img_name: {
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
    },
    user: { // This entry for user specific images uploaded
        type: String
    }
},
{
  timestamps: true
});

// mongoose.models = {}
// DB model
const categories = mongoose.model("img-manager", imgManagerSchema);

module.exports = categories;