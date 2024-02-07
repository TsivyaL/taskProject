
import { Provider } from 'react-redux';
import store from './redux/store';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TaskMenu from './components/taskMenu';
import addTask from './components/addTask';
import Enter from './components/enter';
import AddTask from './components/addTask';
import addTaskType from './components/addTaskType';
import AddTaskType from './components/addTaskType';
import AddTaskByTeacher from './components/addTaskByTeacher'
import UsersMenu from './components/UserMenuToTeacher'
import TeacherMenu from './components/teacherMenu'
import SignIn from './components/try'
import { Routes, Route, Link } from 'react-router-dom'
import UpdateUser from "./components/updateUser";
import ViewTask from "./components/viewTask";
import BasicExample from "./components/try"
import './index.css'
import './App.css';
function App() {
  return (
    
      <div className="App" >
        <Provider store={store}>
          <div id="div1">
            <div id='div2'>
               <Routes>
                  <Route path="/" element={<Enter /> }/>
                  <Route path="/login" element={<Login /> }/>
                  <Route path="/signUp" element={<SignUp /> }/>
                  <Route path="/updateUser" element={<UpdateUser /> }/>
                  <Route path="/taskMenu" element={<TaskMenu /> }/>
                  <Route path="/teacherMenu" element={<TeacherMenu /> }/>
          {/* <Route path="/viewTask" element={<ViewTask /> }/> */}
                  <Route path="/addTask" element={<AddTask /> }/>
                  <Route path="/addTaskType" element={<AddTaskType /> }/>
                  <Route path="/addTaskByTeacher" element={<AddTaskByTeacher /> }/>
                  <Route path="/userMemu" element={<UsersMenu /> }/>
              </Routes>
        {/* <Router>

        <div>
            <Menu /> */}
            {/* <Flash /> */}
            {/* <InsertPupil /> */}
            {/* <UpdateClass></UpdateClass> */}
            {/* <Switch>
              <Route path="/enter">
                <Enter />
              </Route> */}
              {/* <Route path="/login">
                <Login />
              </Route> */}
              {/* <Route path="/home">
              <Home />
              </Route>
              <Route path="/h">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route> */}
              {/* <Route path="/insertPupil">
                <InsertPupil />
              </Route>
              <Route path="/pupilDetails">
                <PupilDetails />
              </Route>
              <Route path="/showPupil/:id">
                <ShowPupil />
              </Route> */}
            {/* </Switch>
          </div>
        </Router> */}

           {/* <TaskMenu UserId={"326201753"}></TaskMenu> */}
           {/* <TaskMenu UserId="326201753"></TaskMenu> */}
           {/* <Try></Try> */}
         
             </div></div>
        </Provider>
        {/* <AddTaskByTeacher></AddTaskByTeacher> */}
        {/* <UsersMenu></UsersMenu> */}
        {/* <TeacherMenu></TeacherMenu> */}
      </div>
    
  );
}



export default App;

