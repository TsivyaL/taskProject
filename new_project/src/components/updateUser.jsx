import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { updateUser } from "../redux/action";
import Login from "./Login";
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getUsersList } from "../redux/action";
import axios from "axios";
function mapStateToProps(state) {
  return { UsersList: state.users.UsersList };
}
export default connect(mapStateToProps)(function UpdateUser(props) {



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
  const updateUser1 = async () => {
    try {
      const toUpdateUser = { FirstName: FirstNameRef.current.value, LastName: LastNameRef.current.value }


      const response = await axios.post(`http://localhost:5000/users/${IdRef.current.value}`, toUpdateUser)
      console.log(response.data);
      if (response.status == 200) {
        console.log("updateUsersList");

        dispatch(updateUser({ Id: IdRef.current.value, FirstName: FirstNameRef.current.value, LastName: LastNameRef.current.value }))

      }
    }
    catch (error) {

      console.error(error);

    }
  }
  useEffect(() => { getAllUsers() }, [])
  const { UsersList, dispatch } = props;
  let IdRef = useRef('');
  let FirstNameRef = useRef('');
  let LastNameRef = useRef('');
  const navigate = useNavigate()
  useEffect(function () {
    console.log("usersList", UsersList)
  }, [, UsersList]);

  function updateUserfunc() {
    updateUser1();

    navigate('/taskMenu', { state: { UserId: IdRef.current.value } })

  }
  return (
    <>
      <label>תעודת זהות</label>
      <input ref={IdRef}></input><br></br>
      <label>שם פרטי חדש</label>
      <input ref={FirstNameRef}></input><br></br>
      <label>שם משפחה חדש</label>
      <input ref={LastNameRef}></input><br></br>

      <button onClick={updateUserfunc}>לעדכון הפרטים</button>
      {/* <SignUp key={key}/> */}
    </>
  )
})