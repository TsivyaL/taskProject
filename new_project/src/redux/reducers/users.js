import { produce } from "immer";
import { createStore } from "redux"
import { useEffect, useRef, useState } from "react";

const InitialState = {
    UsersList: [
        // { FirstName: "shani", LastName: "fisher", Id: "326201753", Teacher: 0, phone: "0504108916" },
        // { FirstName: "צביה", LastName: "לוי", Id: "326201759", Teacher: 0, phone: "0548545131" },
        // { FirstName: "אילה", LastName: "צדוק", Id: "326201755", Teacher: 0, phone: "0533143970" },
        // { FirstName: "עדינה", LastName: "שטיינברג", Id: "326201756", Teacher: 1, phone: "0545859569" },

    ]

}
export default produce((state, action) => {
  
    switch (action.type) {
        case 'ADD_USER':
            {
              
                const s=state.UsersList.find(user => user.Id === action.payLoad.Id) ;
                if (s===undefined) {
                    
                        state.UsersList.push(action.payLoad);
                 console.log("add!!!!")
                
                 alert(`hello to ${action.payLoad.FirstName} ${action.payLoad.LastName}!!`)
                }
                else{
                    console.log("the user is exist!");
                     alert('you already exist!!')
                    }
            }
            break;
        case 'UPDATE_USER': {
            const userForUpdate = state.UsersList.find(user => user.Id === action.payLoad.Id);
            if(userForUpdate!=undefined)
            {userForUpdate.FirstName = action.payLoad.FirstName;
            userForUpdate.LastName = action.payLoad.LastName
            alert("הפרטים שלך עודכנו!!")
            }
            else
            console.log("the user is not exist!")
        }
            break;
        case 'DELETE_USER':
            {
                const index = state.UsersList.findIndex(user => user.Id === action.payLoad.Id);
                if (index != -1) {
                    if (action.payLoad.Teacher === 1)
                        state.TeacherCount--;
                    else
                        state.StudentsCount--;
                    state.UsersCount--;
                    state.UsersList.splice(index,1);
                    console.log("the user is deleted!!!");
                }
                else
                    console.log("the user is not exist!");
            }

            break;
            case 'GET_USER_LIST':{
                state.UsersList=action.payLoad
            }
            break;
    }
}
    , InitialState);
