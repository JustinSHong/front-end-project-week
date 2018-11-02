// action types
import {
    CREATING_USER,
    CREATE_USER,
    CREATEUSER_ERROR,
    LOGGINGIN_USER,
    LOGIN_USER,
    LOGINUSER_ERROR
} from "../actions/index.js";

const initialState = {
    email: "",
    authType: "",
    status: "",
    authenticated: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case CREATING_USER:
            return Object.assign({}, state, { status: "CREATING A NEW USER" });
        case CREATE_USER:
            return Object.assign({}, state, {
                email: action.payload.username,
                authType: "email",
                status: "CREATED A NEW USER"
            });
        case CREATEUSER_ERROR:
            return Object.assign({}, state, { status: "CREATE USER ERROR" });
        case LOGGINGIN_USER:
            return Object.assign({}, state, { status: "LOGGING IN A USER" });
        default:
            return state;
    }
};

export default user;
