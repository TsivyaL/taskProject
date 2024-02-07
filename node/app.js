require("dotenv").config()
const express=require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const app=express()
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())
const usersRuters=require('./routers/users')
const tasksRuters=require('./routers/task')
const CONECTION_URL='mongodb+srv://project:1234@cluster0.ezzzkif.mongodb.net/?retryWrites=true&w=majority';
const PORT=process.env.PORT || 5000;
app.use('/users',usersRuters)
app.use('/tasks',tasksRuters)
mongoose.connect(CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));

