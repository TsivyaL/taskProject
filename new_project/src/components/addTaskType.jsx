import { addTaskToList } from "../redux/action";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { addTaskType } from "../redux/action";
import { getTaskType } from "../redux/action";
import {useNavigate} from 'react-router-dom'

import axios from "axios";
function mapStateToProps(state){
    return({TaskType:state.tasks.TaskType})
    }
export default connect(mapStateToProps)(function AddTaskType(props){
  const navigate=useNavigate()
    const getAllTasks=async()=>{
        try{
          const responseType=await axios.get('http://localhost:5000/tasks/taskType')
  
          console.log(responseType.data);
          if(responseType.status==200)
  
          {
            console.log("getTasksList");
            dispatch(getTaskType(responseType.data))
          }
        }
        catch(error){
          console.log("pppp");
          console.error(error);
  
        }
      }

    
      useEffect(()=>{getAllTasks()},[])
      const addTaskType2=async()=>{
        try{
         const newTaskType={TaskTypeId:TaskTypeIdRef.current.value,TaskTypeName:TaskTypeNameRef.current.value}
          const responseType=await axios.post('http://localhost:5000/tasks/taskType',newTaskType)
  
          console.log(responseType.data);
        if(responseType.status==200)
          {
            console.log("getTasksList");
            dispatch(addTaskType(newTaskType))
        }
    }
        catch(error){
          console.log("pppp");
          console.error(error);
  
        }
      }
      
    const{dispatch,TaskType}=props
    useEffect(()=>{console.log(`tasks type:`,TaskType)},[TaskType])
    //     {TaskId:1,TaskTypeId:1,TaskName:"homework in react",UserTaskId:"326201753",DeadLine:"12/12/2024"},
    
    let TaskTypeIdRef=useRef(0)
    let TaskTypeNameRef=useRef('') 
    
    function addThisTaskType(){  
      console.log(TaskTypeIdRef);
    const task = TaskType.find( x=> x.TaskTypeId === TaskTypeIdRef.current.value )
    console.log(task);
    if(task===undefined){
      addTaskType2()
      
    }
    else{
      alert('this task type id exist already')
    }
    navigate('/teacherMenu')

   
}
    return(<>
    <label>task id</label>
    <input type="number" ref={TaskTypeIdRef} />
    <br />
    <label >סוג המשימה</label>
    <input type="text" ref={TaskTypeNameRef}/>
    <button onClick={addThisTaskType}>להוספת המשימה</button>
    </>)
})