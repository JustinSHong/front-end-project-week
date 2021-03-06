import axios from "axios";
// action types
export const FETCHING_TODOS = "FETCHING_TODOS";
export const FETCH_TODOS = "FETCH_TODOS";
export const FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR";
export const ADDING_TODO = "ADDING_TODO";
export const ADDTODO = "ADDTODO";
export const ADDTODO_ERROR = "ADDTODO_ERROR";
export const DELETING_TODO = "DELETING_TODO";
export const DELETETODO = "DELETETODO";
export const DELETETODO_ERROR = "DELETETODO_ERROR";
export const UPDATING_TODO = "UPDATING_TODO";
export const UPDATETODO = "UPDATETODO";
export const UPDATETODO_ERROR = "UPDATETODO_ERROR";
export const ARCHIVING_TODO = "ARCHIVING_TODO";
export const ARCHIVETODO = "ARCHIVETODO";
export const ARCHIVETODO_ERROR = "ARCHIVETODO_ERROR";
export const COMPLETING_TODO = "COMPLETING_TODO";
export const COMPLETETODO = "COMPLETETODO";
export const COMPLETETODO_ERROR = "COMPLETETODO_ERROR";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const CREATING_USER = "CREATING_USER";
export const CREATE_USER = "CREATE_USER";
export const CREATEUSER_ERROR = "CREATEUSER_ERROR";
export const LOGGINGIN_USER = "LOGGINGIN_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGINUSER_ERROR = "LOGINUSER_ERROR";
export const SIGNINGOUT_USER = "SIGNINGOUT_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";
export const SIGNOUTUSER_ERROR = "SIGNOUTUSER_ERROR";
// filter types
export const VisibilityFilters = {
    SHOW_ALL_TODOS: "ALL_TODOS",
    SHOW_COMPLETED_TODOS: "COMPLETED_TODOS",
    SHOW_ACTIVE_TODOS: "ACTIVE_TODOS",
    SHOW_ARCHIVED_TODOS: "ARCHIVE_TODOS",
    SHOW_SEARCHED_TODOS: "SHOW_SEARCHED_TODOS"
};
// from node-uuid
let uuid = require("uuid-v4");

const url = process.env.REACT_APP_SERVER;

// action creators
export const fetchTodos = () => dispatch => {
    dispatch({ type: FETCHING_TODOS });
    axios
        .get(`${url}/api/notes`)
        .then(res => {
            dispatch({
                type: FETCH_TODOS,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({ type: FETCH_TODOS_ERROR });
        });
};

export const addTodo = (title, text) => dispatch => {
    dispatch({ type: ADDING_TODO });
    axios
        .post(`${url}/api/notes`, {
            title: title,
            content: text,
            isComplete: false,
            id: uuid(),
            archive: false
        })
        .then(res => {
            dispatch({
                type: ADDTODO,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: ADDTODO_ERROR
            });
        });
};

export const archiveTodo = (id, status) => dispatch => {
    dispatch({ type: ARCHIVING_TODO });
    axios
        .put(`${url}/api/notes/${id}`, {
            archive: !status
        })
        .then(res => {
            dispatch({
                type: ARCHIVETODO,
                payload: {
                    id: id,
                    status: !status
                }
            });
        })
        .catch(() => {
            dispatch({
                type: ARCHIVETODO_ERROR
            });
        });
};

export const completeTodo = (id, status) => dispatch => {
    dispatch({ type: COMPLETING_TODO });
    axios
        .put(`${url}/api/notes/${id}`, {
            isComplete: !status
        })
        .then(res => {
            dispatch({
                type: COMPLETETODO,
                payload: {
                    id: res.data._id,
                    status: !res.data.isComplete
                }
            });
        })
        .catch(() => {
            dispatch({
                type: COMPLETETODO_ERROR
            });
        });
};

export const deleteTodo = id => dispatch => {
    dispatch({ type: DELETING_TODO });
    axios
        .delete(`${url}/api/notes/${id}`)
        .then(res => {
            dispatch({
                type: DELETETODO,
                payload: id
            });
        })
        .catch(() => {
            dispatch({
                type: DELETETODO_ERROR
            });
        });
};

export const updateTodo = (id, title, text) => dispatch => {
    dispatch({ type: UPDATING_TODO });
    axios
        .put(`${url}/api/notes/${id}`, {
            title: title,
            content: text
        })
        .then(res => {
            dispatch({
                type: UPDATETODO,
                payload: {
                    id: res.data._id,
                    title: title,
                    text: text
                }
            });
        })
        .catch(() => {
            dispatch({
                type: UPDATETODO_ERROR
            });
        });
};

export function setVisibilityFilter(filter, text = "") {
    return {
        type: SET_VISIBILITY_FILTER,
        payload: {
            filter,
            searchText: text
        }
    };
}

// USER ACTIONS: creating and signing up
export const createUser = (user, error) => dispatch => {
    dispatch({ type: CREATING_USER });
    axios
        .post(`${url}/api/users`, user)
        .then(user => {
            dispatch({ type: CREATE_USER, payload: user.data });
        })
        .catch(() => {
            dispatch({ type: CREATEUSER_ERROR, payload: error });
        });
};

export const logInUser = (user, error) => dispatch => {
    dispatch({ type: LOGGINGIN_USER });
    // check for log in errors from firebase
    if (error) {
        dispatch({ type: LOGINUSER_ERROR, payload: error });
    } else {
        // no log in errors occurred
        dispatch({ type: LOGIN_USER, payload: user });
    }
};

export const signOutUser = (error = null) => dispatch => {
    dispatch({ type: SIGNINGOUT_USER });
    if (error) {
        dispatch({ stype: SIGNOUTUSER_ERROR, payload: error });
    } else {
        dispatch({ type: SIGNOUT_USER });
    }
};
