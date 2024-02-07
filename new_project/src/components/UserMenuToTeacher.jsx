
import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { deleteUser } from "../redux/action";
import { deleteTaskFromList } from "../redux/action";
import { getUsersList } from "../redux/action";
import { getTasksList,getTaskType } from "../redux/action";

import axios from 'axios'
function mapStateToProps(state) {
  return {
    TasksList: state.tasks.TasksList,
    UsersList: state.users.UsersList
  };
}

export default connect(mapStateToProps)(function UsersMenu(props) {
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
  useEffect(()=>{getAllTasks()},[])
  const { TasksList, UsersList, dispatch } = props;
  useEffect(()=>{console.log(`tasks1:`,TasksList)},[TasksList])
  
  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/')
      console.log(response.data);
      if (response.status == 200) {
        console.log("getUsersList");

        dispatch(getUsersList(response.data))
      }
    }
    catch (error) {

      console.error(error);

    }
  }
  useEffect(() => { getAllUsers() }, [])
  const deleteUser1 = async (id) => {
    try {

      const response = await axios.delete(`http://localhost:5000/users/${id}`)
      console.log(response.data);
      if (response.status == 200) {
        console.log(id);

        dispatch(deleteUser({ Id: id }));
      const arr=  TasksList.filter(x => x.UserTaskId === id )
      console.log(arr);
      if(arr!=null)
      for(let i=0;i<arr.length;i++)
      {
        deleteTask(arr[i].TaskId)
      }
      }

    } catch (error) {
      console.error(error);
    }
  }
  const deleteTask = async (taskId) => {
    try {

      const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`)
      console.log(response.data);
      if (response.status == 200) {


        dispatch(deleteTaskFromList({ TaskId: taskId }))

      }

    } catch (error) {
      console.error(error);
    }
  }
 
  // const [useStateTasksList,setUseStateTasksList]=useState(TasksList)
  const usersArr = UsersList.filter(x => x.Teacher === 0)
  useEffect(() => { console.log(`tasks:`, TasksList) }, [TasksList])
  useEffect(() => { console.log(`user:`, UsersList) }, [UsersList])
  // useEffect(()=>{setUseStateTasksList(TasksList)},flag)
  function deleteSelectUser(id) {
    deleteUser1(id);

  }

  return (
    <>
      <ul>

        {usersArr.map(x => (<li key={x.FirstName}><h5>{x.FirstName}  {x.LastName}</h5><h5>{x.phone}</h5><button onClick={() => deleteUser1(x.Id)}>למחיקת משתמש</button></li>))}
      </ul>

    </>
  )
}
)
