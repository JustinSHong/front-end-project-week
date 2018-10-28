import { combineReducers } from "redux";
// reducers
import user from "./user";
import todos from "./todos";

export default combineReducers({
    user,
    todos
});
