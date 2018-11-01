// action types
import {
    CREATING_USER,
    CREATE_USER,
    CREATEUSER_ERROR
} from "../actions/index.js";

const initialState = {
    email: "",
    token: "",
    authType: "",
    status: ""
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case CREATING_USER:
            return Object.assign({}, state, { status: "CREATING A NEW USER" });
        default:
            return state;
    }
};

export default user;
