const mongoose=require('mongoose')
const MongoDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB connected");
    })
    .catch(()=>{
        console.log("Try again");     
    })
}
module.exports=MongoDB;