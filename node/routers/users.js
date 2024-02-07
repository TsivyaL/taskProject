const express=require('express')
const router=express.Router()
const{getAllUsers,addUser,updateUserById,deleteUserById,getUserById}=require('../controllers/users')
router.get('/',getAllUsers)
router.get('/:Id',getUserById)
router.post('/',addUser)
router.delete('/:Id',deleteUserById)
router.post('/:Id',updateUserById)
module.exports=router