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
import { addUser, getUsersList } from "../redux/action";
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import axios from "axios";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
function mapStateToProps(state) {
  return { UsersList: state.users.UsersList };
}

const defaultTheme = createTheme();

export default connect(mapStateToProps)(function Login(props) {


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
  const addUser1 = async () => {
    try {
      const newUser = { FirstName: FirstNameRef.current.value, LastName: LastNameRef.current.value, Id: IdRef.current.value, Teacher: TeacherRef.current.checked, phone: phoneRef.current.value }


      const response = await axios.post('http://localhost:5000/users/', newUser)
      console.log(response.data);
      if (response.status == 200) {
        console.log("getUsersList");

        dispatch(addUser(newUser))

      }
    }
    catch (error) {

      console.error(error);

    }
  }
  useEffect(() => { getAllUsers() }, [])
  // useEffect(()=>{console.log(`users:`,UsersList)},[UsersList])
  const { UsersList, dispatch } = props; /*{ FirstName: "shani", LastName: "fisher", Id: "326201753", Teacher: 0, phone: "0504108916" },*/
  let FirstNameRef = useRef('');
  let LastNameRef = useRef('');
  let IdRef = useRef('');
  let phoneRef = useRef('');
  let TeacherRef = useRef('');
  const navigate = useNavigate()
  useEffect(function () {
    console.log("usersList", UsersList)
  }, [, UsersList]);
  const handleSubmit = (event) => {
    const user = UsersList.find(x => x.Id === IdRef.current.value)
    if (!user) {
      addUser1();
      if (TeacherRef.current.checked === false)
        navigate('/taskMenu', { state: { UserId: IdRef.current.value } })
      else
        navigate('/teacherMenu', { state: { UserId: IdRef.current.value } })
    }
    else {
      alert('this id exist alraedy')
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
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={FirstNameRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  inputRef={LastNameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phone"
                  autoComplete="phone"
                  inputRef={phoneRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ID"
                  label="ID"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={IdRef}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="top" color="primary" inputRef={TeacherRef} />}
                  label="האם מורה"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signUp" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
})