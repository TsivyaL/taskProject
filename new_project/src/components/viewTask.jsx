import React from "react";
//     {TaskId:1,TaskTypeId:1,TaskName:"homework in react",UserTaskId:"326201753",DeadLine:"12/12/2024"},

import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { deleteTaskFromList } from "../redux/action";

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
const theme = createTheme({
  palette: {
    primary: teal,
    secondary: orange,
  }

}
);

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 180,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));
function mapStateToProps(state) {
  return {
    TaskType: state.tasks.TaskType
  };
}
export default connect(mapStateToProps)(function ViewTask(props) {

  const deleteTask = async () => {
    try {
      console.log(thisTask.TaskId);
      const response = await axios.delete(`http://localhost:5000/tasks/${thisTask.TaskId}`)
      console.log(response.data);
      if (response.status == 200) {
        console.log("getUsersList");

        dispatch(deleteTaskFromList(thisTask))

      }

    } catch (error) {
      console.error(error);
    }
  }
  const { thisTask, TaskType, dispatch } = props
  function deleteThisTask() {
    deleteTask();
  }
  return (<>
    {/* <p>שם:{thisTask.TaskName}<br></br>
        סוג משימה:{TaskType.find(x=>x.TaskTypeId===thisTask.TaskTypeId).TaskTypeName}<br></br>
         תאריך סיום המשימה:{thisTask.DeadLine};<br></br>
         <button onClick={deleteThisTask}>למחיקת המשימה</button>  
        </p>
         */}

    <DemoPaper square={false}> <p>שם:<br />{thisTask.TaskName}<br></br>
      סוג משימה:<br />{TaskType.find(x => x.TaskTypeId === thisTask.TaskTypeId).TaskTypeName}<br></br>
      תאריך סיום המשימה:<br />{thisTask.DeadLine};<br></br>
      <Button theme={theme} onClick={deleteThisTask}>

        <DeleteIcon />

      </Button>

    </p></DemoPaper>






  </>)
})