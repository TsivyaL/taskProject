const mongoose = require('mongoose')
const TaskSchema=new mongoose.Schema({
    TaskId:String,
    TaskTypeId:Number,
    TaskName:String,
    UserTaskId:String,
    DeadLine:String
})


module.exports=mongoose.model('Task',TaskSchema)