import express from 'express';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authrouter from './routes/authroutes.js';
import imagerouter from './routes/imageroutes.js'


dotenv.config()
// initialising express
const app = express()

//middleware to parse input data
app.use(express.json({limit:'100mb'}))
//middleware to log http request
app.use(morgan("common"))
//to get browser cookie in req
app.use(cookie())
//to enable cors
// in localhost
app.use(cors({credentials:true,origin:"http://localhost:5173"})) 

// in production 


//app.use(cors({credentials:true,origin:"http://65.2.141.17"})) 

app.use('/api/auth',authrouter)
app.use('/api/image',imagerouter)


mongoose.connect(process.env.MONGO_URL,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  }
).then(()=>{
    app.listen(3000,()=>{
      console.log(process.env.API_KEY)
        console.log('server is starting...')
    })
}).catch((er)=>{
    console.log(er)
})


