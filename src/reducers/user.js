// action types
import {
    CREATING_USER,
    CREATE_USER,
    CREATEUSER_ERROR
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
        default:
            return state;
    }
};

export default user;
