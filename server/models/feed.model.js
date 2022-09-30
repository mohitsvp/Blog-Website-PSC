const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    title : String,
    description : String,
    tags : [String],
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    versionKey : false,
    timestamps : true
})

module.exports = mongoose.model("Feeds", feedSchema);