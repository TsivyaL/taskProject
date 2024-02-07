import { addTaskToList } from "../redux/action";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getTasksList,getTaskType } from "../redux/action";
import { useParams, Navigate, useNavigate } from 'react-router-dom'


function mapStateToProps(state){
    return {TaskType: state.tasks.TaskType,
        TasksList: state.tasks.TasksList,
        UsersList:state.users.UsersList
    };
    }
export default connect(mapStateToProps)(function AddTaskByTeacher(props){
    const getAllTasks=async()=>{
        try{
          const response=await axios.get('http://localhost:5000/tasks/taskList')
          const responseType=await axios.get('http://localhost:5000/tasks/taskType')

          console.log(response.data);
          if(response.status==200&&responseType.status==200)

          {
            console.log("getTasksList");
            dispatch(getTaskType(responseType.data))
            dispatch(getTasksList(response.data))
          }
        }
        catch(error){
          console.log("pppp");
          console.error(error);
    
        }
      }
      const addTask=async()=>{
        try{
          const newTask={TaskId:TaskIdRef.current.value,TaskTypeId:TaskTypeIdRef.current.value,TaskName:TaskNameRef.current.value,UserTaskId:UserIdRef.current.value,DeadLine:DeadLineRef.current.value}
    
    
          const response=await axios.post('http://localhost:5000/tasks/taskList',newTask)

          console.log(response.data);
          if(response.status==200)
          {
            console.log("getUsersList");
    
            dispatch(addTaskToList(newTask))
    
          }
        }
        catch(error){
         
          console.error(error);
    
        }
      }
      useEffect(()=>{getAllTasks()},[])
    const{TaskType,dispatch,setFlag,TasksList,UsersList,UserId}=props
    //     {TaskId:1,TaskTypeId:1,TaskName:"homework in react",UserTaskId:"326201753",DeadLine:"12/12/2024"},
    let TaskIdRef=useRef('')
    let UserIdRef=useRef('')
    let TaskTypeIdRef=useRef('')
    let TaskNameRef=useRef('') 
    let DeadLineRef=useRef('')
    const navigate = useNavigate()

    useEffect(()=>{console.log(`tasks:`,TasksList)},[TasksList])
    function addThisTask(){  

         addTask();
         navigate('/teacherMenu', { state: { UserId} })

   //setFlag(false);
}
    return(<>
    <label>task id</label>
    <input type="number" ref={TaskIdRef} />
    <br />
    <select ref={TaskTypeIdRef}>
        <option > סוג משימה</option>
         {TaskType.map(x=><option key={x.TaskTypeName} value={x.TaskTypeId}>{x.TaskTypeName}</option>)}
    </select>
    <br/>
    <select ref={UserIdRef}>
        <option > בחר תלמיד</option>
         {UsersList.map(x=>x.Teacher===0&&<option key={x.Id} value={x.Id}>{x.FirstName } {x.LastName}</option>)}
    </select>
    <br/>
    <label >שם המשימה</label>
    <input type="text" ref={TaskNameRef} />
    <label>DeadLine</label>
    <input type="date" ref={DeadLineRef} />
    <button onClick={addThisTask}>להוספת המשימה</button>
    </>)
})