import { produce } from "immer";
// import React from "react";
import {createStore} from "redux"

const initialState={
    TaskType:
    [
    //     {TaskTypeId:1,TaskTypeName:"homework"},
    // {TaskTypeId:2,TaskTypeName:"learn to test" } ,
    // {TaskTypeId:3,TaskTypeName:"do a project" } ,
    ],
    TasksList:[]
    // [
    //  {TaskId:'1',TaskTypeId:'1',TaskName:"homework in react",UserTaskId:"326201753",DeadLine:"12/12/2024"},
    //  {TaskId:'2',TaskTypeId:'2',TaskName:"learn to test in data structue",UserTaskId:"326201759",DeadLine:"12/12/2024"},
    //  {TaskId:'3',TaskTypeId:'3',TaskName:"do a project in python ",UserTaskId:"326201753",DeadLine:"12/12/2024"},
    // ]
}

export default produce((state,action)=>{
    
    switch(action.type){
        case 'ADD_TASK_TYPE':{
            if(state.TaskType.find(x=>x.TaskTypeId===action.payLoad.TaskTypeId)===undefined)
            {
            state.TaskType.push(action.payLoad)
            console.log("this task type is added!!");
            }
            else
            console.log("this task type already exist");
            console.log("task type",state.TaskType);
        }
        break;
        case 'ADD_TASK_LIST':{
            const f=state.TasksList.find(x=>x.TaskId===action.payLoad.TaskId)
            console.log(f);
            if(f===undefined)
            {
                state.TasksList.push(action.payLoad)
                console.log("this task is added!!"); 
            }                                                           
            else
            console.log("this task already exist");
        }
        break;
        case 'DELETE_TASK_FROM_LIST':   {
            const index=state.TasksList.findIndex(x=>x.TaskId===action.payLoad.TaskId);
           // const index2=state.TasksList.findIndex(x=>x.DeadLine<==)
            if(index!=-1){
                state.TasksList.splice(index,1)
                console.log("this task is delete!!"); 
            }
            else
            console.log("this task is not exist");
        }
        break;
        case 'GET_TASK_LIST':
           { state.TasksList=action.payLoad}
        break;
        case 'GET_TASK_TYPE':
            { state.TaskType=action.payLoad}
         break;
            
    }
}
,initialState)

