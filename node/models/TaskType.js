
const mongoose = require('mongoose')
const TaskTypeSchema=new mongoose.Schema({
    TaskTypeId:Number,
    TaskTypeName:String
})


module.exports=mongoose.model('TaskType',TaskTypeSchema)