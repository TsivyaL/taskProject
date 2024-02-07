import React, { useState } from "react";
import UserMenu from "./UserMenuToTeacher";
import AddTaskByTeacher from "./addTaskByTeacher";
import AddTaskType from "./addTaskType";
import {useParams,Navigate,useNavigate} from 'react-router-dom'
export default function TeacherMenu(props){
    const navigate=useNavigate()

    
    return(
        <>
        <button onClick={()=>{navigate('/userMemu')}}>רשימת תלמידים</button>
        <button onClick={()=>{navigate('/addTaskByTeacher')}}>הוספת משימה לתלמיד </button>
        <button onClick={()=>{navigate('/addTaskType')}}>הוספת סוג משימה </button>

        </>
    )
}


