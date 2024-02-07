import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import UpdateUser from "./updateUser";
import { Redirect } from 'react-router-dom'
import {useParams,Navigate,useNavigate} from 'react-router-dom'




export default function Enter(props){
    // const [signUpFlag,setSignUpFlag]=useState(false)
    // const [LoginFlag,setLoginFlag]=useState(false)
    // const [UpdateUserFlag,setUpdateUserFlag]=useState(false)
    const navigate=useNavigate()

    
    return(
        <>
        <button onClick={()=>{return navigate('/login')}}>הרשמה</button>

        <button onClick={()=>{return navigate("/signUp") }}>כניסה</button>
        <button onClick={()=>{return navigate("/updateUser") }}>עדכון משתמש</button>
        </>
    )

}
