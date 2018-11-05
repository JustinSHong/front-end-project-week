import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
// firebase
import { auth } from "../firebase";
// actions
import { setVisibilityFilter, signOutUser } from "../actions/index";
// filter types
import { VisibilityFilters } from "../actions/index";
// material components
import Button from "@material-ui/core/Button";
// styles
import "../styles/ControlPanel.css";

const styles = theme => ({
    button: {
        backgroundColor: "#26c6da",
        margin: "20px 0",
        padding: "10 0",
        width: "100%",
        fontSize: "1.75rem",
        fontWeight: "700",
        color: "white",
        letterSpacing: "0.2rem",
        "&:hover": {
            background: "black"
        }
    },
    input: {
        display: "none"
    }
});

class ControlPanel extends Component {
    handleSignOut = () => {
        console.log("MADE IT TO HANDLESIGN OUT");
        auth.doSignOut()
            .then(() => {
                console.log("SIGN OUT SUCCESS");
                this.props.signOutUser();
            })
            .catch(() => {
                const error = { message: "error signing out user" };
                this.props.signOutUser(error);
            });
    };

    render() {
        const { classes } = this.props;

        return [
            <h3 className="ControlPanel_header">
                Lambda
                <br />
                Notes
            </h3>,
            <Link to="/" className="ControlPanel_Link">
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        this.props.setVisibilityFilter(
                            VisibilityFilters.SHOW_ALL_TODOS
                        );
                    }}
                >
                    View Your Notes
                </Button>
            </Link>,
            <Link to="/addTodo" className="ControlPanel_Link">
                <Button variant="contained" className={classes.button}>
                    Create Todo
                </Button>
            </Link>,
            <Link to="/" className="ControlPanel_Link">
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        this.props.setVisibilityFilter(
                            VisibilityFilters.SHOW_COMPLETED_TODOS
                        );
                    }}
                >
                    View Complete Todos
                </Button>
            </Link>,
            <Link to="/" className="ControlPanel_Link">
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        this.props.setVisibilityFilter(
                            VisibilityFilters.SHOW_ACTIVE_TODOS
                        );
                    }}
                >
                    View Incomplete
                </Button>
            </Link>,
            <Link to="/" className="ControlPanel_Link">
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        this.props.setVisibilityFilter(
                            VisibilityFilters.SHOW_ARCHIVED_TODOS
                        );
                    }}
                >
                    View Archived Todos
                </Button>
            </Link>,
            <Button
                variant="contained"
                className={classes.button}
                style={{ backgroundColor: "#f44336" }}
                onClick={this.handleSignOut}
            >
                Sign Out
            </Button>
        ];
    }
}

export default connect(
    null,
    { setVisibilityFilter, signOutUser }
)(withStyles(styles)(ControlPanel));
