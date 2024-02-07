const mongoose = require('mongoose')
const UsersSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Id:String,
    Teacher:Number,
    phone:String
})


module.exports=mongoose.model('User',UsersSchema)