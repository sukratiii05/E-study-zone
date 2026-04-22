const mongoose = require('mongoose')
const skillSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    skill:{
        type:String,
    },
    description:{
        type:String,
    }
},{
    timestamps:true
});
module.exports = mongoose.model("Skill",skillSchema)