import { createStore,combineReducers ,applyMiddleware} from "redux";
import tasks from "./reducers/tasks";
import users from "./reducers/users";
const reducer=combineReducers({tasks,users});



const logAction = (store) => (next) => (action) => {
    if(action.type==='ADD_USER')
    {
        alert("bla")
        console.log(store.getState().users.UsersList);
    }
    return next(action)
    }  
const store=createStore(reducer,applyMiddleware(logAction));
window.store=store;
export default store;