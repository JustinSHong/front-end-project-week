import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// actions
import { toggleTodo, deleteTodo, archiveTodo } from "../actions/index";
// material components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// styles
import "../styles/SingleTodos.css";

const styles = theme => ({
    menuItem: {
        fontSize: "1.25rem"
    }
});

// const SingleTodo = props => {
class SingleTodo extends React.Component {
    state = {
        anchorEl: null
    };
    // change a todo's completion status
    handleToggleTodo = id => {
        this.props.toggleTodo(id);
    };
    // delete a todo
    handleDeleteTodo = id => {
        this.props.deleteTodo(id);
    };
    // archive a todo
    handleArchiveTodo = (id, status) => {
        console.log(`AT HANDLEARCHIVETODO() ${id} ${status}`);
        this.props.archiveTodo(id, status);
    };
    // open menu
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    // close menu
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { classes, index } = this.props;
        const todo = this.props.todos[index];

        return [
            <Card className="SingleTodo">
                <Link className="SingleTodo_link" to={`/todo/${index}`}>
                    <h3>{todo.title}</h3>
                </Link>
                <CardContent
                    style={{
                        padding: "0",
                        margin: "10px 0"
                    }}
                >
                    <p
                        className="SingleTodo_content"
                        // onClick={() => this.handleToggleTodo(id)}
                        style={{
                            textDecoration: todo.isComplete
                                ? "line-through"
                                : "none"
                        }}
                    >
                        {todo.content}
                    </p>
                    <IconButton
                        onClick={this.handleClick}
                        style={{
                            float: "right",
                            padding: "0",
                            width: "3rem",
                            height: "3rem"
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                    >
                        <MenuItem className={classes.menuItem}>
                            <Link
                                to={`/todo/${this.props.index}`}
                                style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}
                            >
                                Edit this note
                            </Link>
                        </MenuItem>
                        <MenuItem
                            className={classes.menuItem}
                            onClick={() => {
                                this.handleDeleteTodo(todo._id);
                                this.props.handleClick(
                                    "Item removed from list"
                                );
                            }}
                        >
                            Delete
                        </MenuItem>
                        <MenuItem
                            className={classes.menuItem}
                            onClick={() => {
                                this.handleArchiveTodo(todo._id, todo.archive);
                                this.props.handleClick("Archived item");
                            }}
                        >
                            Archive
                        </MenuItem>
                    </Menu>
                </CardContent>
            </Card>
        ];
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

export default connect(
    mapStateToProps,
    { toggleTodo, deleteTodo, archiveTodo }
)(withStyles(styles)(SingleTodo));
