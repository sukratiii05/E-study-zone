const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const MongoDB = require('./config/db')
const rateLimit=require('express-rate-limit')
const cluster=require('cluster')
const os=require('os')
dotenv.config()

const a =rateLimit({
    windowMs:1000*60,
    limit:5,
    message:"Limit exceeded."
})

// clustering
if(cluster.isPrimary){
    for(i=1;i<=os.availableParallelism();i++){
        cluster.fork();
    }
    cluster.on('fork',(worker)=>{
        console.log(worker.process.pid);
        
    })
}

else{
    const app = express();
app.use(express.json())
app.use(cors())
app.use(a)
MongoDB();

// api started
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/skill', require('./routes/skillRoutes'))
app.use('/api/content', require('./routes/contentRoutes'))
app.use('/api/handshake', require('./routes/handshakeRoutes'))
// api ended
app.listen(process.env.PORT, () => {
    console.log(('server is running at http://localhost:5001'));

}) 
}