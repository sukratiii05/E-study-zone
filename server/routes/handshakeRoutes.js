const express=require('express')
const routes=express.Router();
const Handshake= require('../models/HandShake')

routes.post('./request',async(req,res)=>{
    const {trainerId,learnerId,status}=req.body
    try{
        const data=await new Handshake({
            trainerId:req.params.id,
            learnerId:learnerId,
            status:status
        })
        data.save()
        res.json("request send successfully")
    }
    catch(er){
        console.log(er);
        res.json("Sorry")
    }
})
routes.get(':id/',async(req,res)=>{
    const data =await Handshake.find({trainerId:req.params.id}).populate('learnerId')
    res.json(data)
})
routes.patch('/accept/:id',async(req,res)=>{
    const data=await Handshake.findByIdAndUpdate(req.params.id,{status:"accepted"});
    res.json("Request Accepted")
})
routes.patch('/reject/:id',async(req,res)=>{
    const data=await Handshake.findByIdAndUpdate(req.params.id,{status:"reject"});
    res.json("Request Rejected")
})
module.exports=routes