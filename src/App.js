import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
// styles
import "./styles/App.css";
import "./styles/animation.css";
// action
import { fetchTodos } from "./actions";
// components
import CreateTodoForm from "./components/CreateTodoForm";
import ControlPanel from "./components/ControlPanel";
import Todo from "./components/Todo";
import EditTodoForm from "./components/EditTodoForm";
import VisibilityTodos from "./components/VisibilityTodos";

class App extends Component {
    // fetch all notes
    componentDidMount() {
        this.props.fetchTodos();
    }

    render() {
        return (
            <div className="App fade">
                <div className="ControlPanel">
                    <ControlPanel />
                </div>
                <div className="TodoContainer">
                    <Route exact path="/" component={VisibilityTodos} />
                    <Route exact path="/addTodo" component={CreateTodoForm} />
                    <Route exact path="/todo/:id" component={Todo} />
                    <Route exact path="/editTodo" component={EditTodoForm} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

export default connect(
    mapStateToProps,
    { fetchTodos }
)(App);
