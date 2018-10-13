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
export const TOGGLETODO = "TOGGLETODO";
export const ARCHIVETODO = "ARCHIVETODO";
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
            console.log(`FETCHING TODO RESPONSE ${res}`);
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

export function archiveTodo(id) {
    return {
        type: ARCHIVETODO,
        payload: id
    };
}

export function toggleTodo(id) {
    return {
        type: TOGGLETODO,
        payload: id
    };
}

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

export function updateTodo(id, title, text) {
    dispatch({ type: UPDATING_TODO });
    axios
        .put(`${url}/api/notes/${id}`, {
            title: title,
            content: text
        })
        .then(res => {
            dispatch({
                type: UPDATETODO,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: UPDATETODO_ERROR
            });
        });
}

export function setVisibilityFilter(filter, text = "") {
    return {
        type: "SET_VISIBILITY_FILTER",
        payload: {
            filter,
            searchText: text
        }
    };
}
