import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {useParams,Navigate,useNavigate} from 'react-router-dom'
import { addUser, getUsersList } from "../redux/action";

import axios from "axios";
function mapStateToProps(state) {
    return { UsersList: state.users.UsersList };
}




const defaultTheme = createTheme();

export default connect(mapStateToProps) (function SignIn(props) {
  const getAllUsers=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/users/')
      console.log(response.data);
      if(response.status==200)
      {
        console.log("getUsersList");

        dispatch(getUsersList(response.data))
      }
    }
    catch(error){
     
      console.error(error);

    }
  }
  useEffect(()=>{getAllUsers()},[])
  const { UsersList,dispatch } = props;
  let IdRef = useRef('');
  let FirstNameRef = useRef('');
  const [key,setKey]=useState(0)
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    const user = UsersList.find( x=> x.Id === IdRef.current.value )
        if (!user) {
            navigate('/login')
        }
        else if(user.Teacher===1)
        {
            navigate('/teacherMenu',{state:{UserId:IdRef.current.value}})
        }
        else {
            navigate('/taskMenu',{state:{UserId:IdRef.current.value}})

        }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="שם פרטי"
              name="name"
              autoComplete="name"
              inputRef={FirstNameRef}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="ID"
              label="תעודת זהות"
              type="password"
              inputRef={IdRef}
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              להתחברות
            </Button>
           
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
  );
})