// action types
import {
	ADDTODO,
	DELETETODO,
	UPDATETODO,
	TOGGLETODO
} from "../acions/index.js";

const initialState = {
	todos: [],
	addingTodo: false,
	updatingTodo: false,
	deletingTodo: false,
	viewingTodo: false
};

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		// add new todo
		case ADDTODO:
			return Object.assign({}, state, {
				// append new todo objects to the list
				todos: [...state.todos, action.payload]
			});
		// edit new todo
		case UPDATETODO:
			let updatedTodos = state.todos.map((todo, index) => {
				if (index === action.payload.index) {
					// only change the text of a todo if its index matches
					todo.text = action.payload.text;
				}
			});
			return Object.assign({}, state, {
				todos: updatedTodos
			});
		// delete new todo
		case DELETETODO:
			return Object.assign({}, state, {
				todos: state.todos.filter((todo, index) => {
					// return todos that don't match the target's index
					return index !== action.payload;
				})
			});
		default:
			return state;
	}
};