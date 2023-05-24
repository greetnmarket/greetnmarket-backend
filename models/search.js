const mongoose = require("mongoose");

// DB Schema
const serachSchema = new mongoose.Schema({
    usermob_no: {
        type: String,
        required: true
        
    },
    search_data: {
        type: Array,
        default: []
    }
},
{
  timestamps: true
});

// serachSchema.clearIndexes({ "usermob_no": 1 }, { sparse: true })
// mongoose.models = {}
// DB model
const searchdata = mongoose.model("searchdatas", serachSchema);

module.exports = searchdata;