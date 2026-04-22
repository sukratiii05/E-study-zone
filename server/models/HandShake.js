const mongoose=require('mongoose')
const handshakeSchema=mongoose.Schema({
    trainerId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    learnerId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:['pending','rejected','accepted'],
        default:'pending'
    }
})