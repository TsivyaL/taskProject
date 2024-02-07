import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import AddTask from "./addTask";
import ViewTask from "./viewTask";
import axios from "axios";
import { getTasksList,getTaskType } from "../redux/action";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import AddTaskIcon from '@mui/icons-material/AddTask';
import RemoveIcon from '@mui/icons-material/Remove';
import {useParams,Navigate,useNavigate} from 'react-router-dom'
import { useLocation } from "react-router-dom";

const theme = createTheme({  
      palette: {
        primary: teal,
        secondary: orange,
      }
    
  }
);
function mapStateToProps(state){
    return { TasksList: state.tasks.TasksList,
      UsersList: state.users.UsersList };
    }
export default connect(mapStateToProps)( function TaskMenu(props){
    const location=useLocation()
    const {TasksList,UsersList,dispatch} = props;
    const UserId=location.state.UserId
// debugger;

    // const [useStateTasksList,setUseStateTasksList]=useState(TasksList)
    const [flag,setFlag]=useState(false)
    const [flagPlus,setFlagPlus]=useState(false)
    const [currentTask,setCurrentTask] = useState(null);
    const userTasksArr=TasksList.filter(x=>x.UserTaskId===UserId)
    const navigate=useNavigate()

    const thisUser=UsersList.find(x=>x.Id===UserId)
    // useEffect(()=>{setUseStateTasksList(TasksList)},flag)
    function flagPlusFunc(TaskId){
      console.log(flagPlus);
      setFlagPlus(!flagPlus);
      console.log(flagPlus);

      setCurrentTask(TaskId)
      console.log(TaskId);

    }
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
    useEffect(()=>{console.log(`tasks1:`,TasksList)},[TasksList])

      return(
        <>
        {/* <h2>שלום ל:{`${thisUser.FirstName} ${thisUser.LastName}`}</h2>
        <ul>
        
        {userTasksArr.map(x=>(<li key={x.TaskId}><h5>{x.TaskName}</h5><button onClick={()=>setCurrentTask(x.TaskId)}>להצגת פרטי משימה</button><br />{currentTask===x.TaskId&&<ViewTask thisTask={x}></ViewTask>}</li>))}
        </ul>
        <button onClick={()=>setFlag(!flag)} >להוספת משימה:</button>
          {flag&&<AddTask UserId={UserId} setFlag={setFlag}  ></AddTask>} 
          <br/>   <br/>   <br/>


 */}

          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {userTasksArr.map((value) => (
        
        <ListItem 
          key={value.TaskId}
          disableGutters
          secondaryAction={
            <IconButton  onClick={()=>flagPlusFunc(value.TaskId)} aria-label="comment">              
              {!flagPlus&&<AddSharpIcon />}
              {flagPlus&&<RemoveIcon />} 
            </IconButton>
          }
        >
          <ListItemText primary={value.TaskName} />
          <br/>
          {currentTask===value.TaskId&&flagPlus&&<ViewTask thisTask={value}></ViewTask>}
        </ListItem>
      ))}
    </List>
    <Button theme={theme} variant="outlined" disableElevation  onClick={()=>navigate('/addTask',{state:{UserId:UserId}})} >
    
    <AddTaskIcon/>
     להוספת משימה 
    </Button>
    {/* {flag&&<AddTask UserId={UserId} setFlag={setFlag}  ></AddTask>}  */}
      </> 
      )
}
)     
