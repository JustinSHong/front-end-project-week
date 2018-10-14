// action types
import {
    FETCHING_TODOS,
    FETCH_TODOS,
    FETCH_TODOS_ERROR,
    ADDING_TODO,
    ADDTODO,
    ADDTODO_ERROR,
    DELETING_TODO,
    DELETETODO,
    DELETETODO_ERROR,
    UPDATING_TODO,
    UPDATETODO,
    UPDATETODO_ERROR,
    TOGGLETODO,
    ARCHIVETODO
} from "../actions/index.js";

let uuid = require("uuid-v4");

const initialState = {
    todos: [],
    status: "",
    filter: "",
    searchText: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // fetching a todo
        case FETCHING_TODOS:
            return Object.assign({}, state, { status: "FETCHING TODOS" });
        // fetch todo
        case FETCH_TODOS:
            return Object.assign({}, state, {
                status: "FETCH TODO",
                todos: state.todos.concat(action.payload)
            });
        // failure to fetch todo
        case FETCH_TODOS_ERROR:
            return Object.assign({}, state, {
                status: "FETCHING TODO ERROR"
            });
        // adding a todo
        case ADDING_TODO:
            return Object.assign({}, state, { status: "ADDING NEW TODO" });
        // add new todo
        case ADDTODO:
            return Object.assign({}, state, {
                todos: [...state.todos, action.payload],
                status: "ADDED TODO"
            });
        // failure to add todo
        case ADDTODO_ERROR:
            return Object.assign({}, state, { status: "ADD TODO ERROR" });
        // editing a todo
        case UPDATING_TODO:
            return Object.assign({}, state, {
                status: "UPDATING_TODO"
            });
        // edit new todo
        case UPDATETODO:
            return Object.assign({}, state, {
                todos: state.todos.map(todo => {
                    if (action.payload._id === todo._id) {
                        todo.text = action.payload.text;
                        todo.content = action.payload.content;
                    }
                    return todo;
                }),
                status: "UPDATING A TODO"
            });
        // failure to edit todo
        case UPDATETODO_ERROR:
            return Object.assign({}, state, {
                status: "UPDATETODO_ERROR"
            });
        // deleting a todo
        case DELETING_TODO:
            return Object.assign({}, state, { status: "DELETING A TODO" });
        // delete new todo
        case DELETETODO:
            return Object.assign({}, state, {
                todos: state.todos.filter((todo, index) => {
                    return index !== parseInt(action.payload, 10);
                }),
                status: "DELETING A TODO"
            });
        // failure to delete todo
        case DELETETODO_ERROR:
            return Object.assign({}, state, { status: "DELETE TODO ERROR" });
        // change a todo's completion status
        case TOGGLETODO:
            console.log("ACTION.PAYLOAD: ", action.payload);
            return Object.assign({}, state, {
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return Object.assign({}, todo, {
                            isComplete: !todo.isComplete
                        });
                    }
                    return todo;
                }),
                status: "TOGGLED A TODO"
            });
        case ARCHIVETODO:
            return Object.assign({}, state, {
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return Object.assign({}, todo, {
                            archive: !todo.archive
                        });
                    }
                    return todo;
                }),
                status: "ARCHIVED A TODO"
            });
        // change filter status of the app
        case "SET_VISIBILITY_FILTER":
            return Object.assign({}, state, {
                filter: action.payload.filter,
                searchText: action.payload.searchText
            });
        default:
            return state;
    }
};

export default rootReducer;
