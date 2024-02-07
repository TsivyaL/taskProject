import { addTaskToList } from "../redux/action";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import Autocomplete from '@mui/material/Autocomplete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useLocation } from "react-router-dom";
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import axios from "axios";
import { getTasksList,getTaskType } from "../redux/action";
const theme = createTheme({
  palette: {
    primary: teal,
    secondary: orange,
  }

}
);

function mapStateToProps(state) {
  return {
    TaskType: state.tasks.TaskType,
    TasksList: state.tasks.TasksList
  };
}
export default connect(mapStateToProps)(function AddTask(props) {

  const getAllTasks=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/tasks/taskList')
      const responseType=await axios.get('http://localhost:5000/tasks/taskType')

      console.log(response.data,responseType.data);
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
      const newTask={ TaskId: TaskIdRef.current.value, TaskTypeId: TaskTypeIdRef.current.value, TaskName: TaskNameRef.current.value, UserTaskId: UserId, DeadLine: DeadLineRef.current.value }


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
  const { TaskType, dispatch, setFlag, TasksList } = props
  //     {TaskId:1,TaskTypeId:1,TaskName:"homework in react",UserTaskId:"326201753",DeadLine:"12/12/2024"},
  let TaskIdRef = useRef('')
  let TaskTypeIdRef = useRef('')
  let TaskNameRef = useRef('')
  let DeadLineRef = useRef('')
  const location = useLocation()
  const navigate = useNavigate()
  const UserId = location.state.UserId
  function addThisTask() {
    console.log(TaskTypeIdRef);
    const task = TasksList.find( x=> x.TaskId === TaskIdRef.current.value )
    console.log(task);
    if(task===undefined){
      addTask();
    }
    else{
      alert('this task id exist already')
    }
    navigate('/taskMenu', { state: { UserId: UserId } })

    
  }
  return (<>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField id="outlined-basic" label="task name " variant="standard" inputRef={TaskNameRef} />
      <TextField id="outlined-basic" type="number" label="task ID " variant="standard" inputRef={TaskIdRef} />
      <br></br>
      <select ref={TaskTypeIdRef}>
        <option > id בחר </option>
         {TaskType.map(x=><option key={x.TaskTypeName} value={x.TaskTypeId}>{x.TaskTypeName}</option>)}
    </select>
      {/* <Autocomplete
        disablePortal
        // inputRef={TaskTypeIdRef}
        id="combo-box-demo"
        options={TaskType}
        getOptionLabel={(option) => option.TaskTypeName}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="סוג משימה" />} */}
       {/* onInputChange={(event, newInputValue) => {
         TaskTypeIdRef(newInputValue);
       }}
       /> */}
      {/* <TextField id="standard-basic" label=" שם המשימה" variant="standard" theme={theme}  ref={TaskNameRef} /> */}
      <br></br>
      DeadLine
      <br></br>
      <TextField id="filled-basic" type="date" variant="filled" inputRef={DeadLineRef} />
      <br></br>
      <Button theme={theme} size="large" variant="outlined" onClick={addThisTask} > הוספת המשימה <AddTaskIcon /></Button>

    </Box>



    {/* <label>task id</label>
    <input type="number" ref={TaskIdRef} />
    <br />
    <select ref={TaskTypeIdRef}>
        <option > id בחר </option>
         {TaskType.map(x=><option key={x.TaskTypeName} value={x.TaskTypeId}>{x.TaskTypeName}</option>)}
    </select>
    <br/>
    <label >שם המשימה</label>
    <input type="text" ref={TaskNameRef} />
    <label>DeadLine</label>
    <input type="date" ref={DeadLineRef} />
    <button onClick={addThisTask}>להוספת המשימה</button> */}
  </>)
})