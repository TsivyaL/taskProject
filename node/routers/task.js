const express=require('express')
const router=express.Router()
const{getAllTaskType,getAllTaskList,deleteTaskById,addTaskToList,addTaskToTypeList,getTaskById}=require('../controllers/task')
router.get('/taskType',getAllTaskType)
router.get('/taskList',getAllTaskList)
router.get('/:Id',getTaskById)
router.post('/taskType',addTaskToTypeList)
router.post('/taskList',addTaskToList)
router.delete('/:TaskId',deleteTaskById)
module.exports=router

