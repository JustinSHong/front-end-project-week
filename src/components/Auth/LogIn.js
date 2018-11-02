import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
// styles
import "../../styles/LogIn.css";
// actions
import { createUser, logInUser } from "../../actions/index";
// firebase
import { auth } from "../../firebase";

// username and password fields
const FormFields = props => {
    return (
        <div className="FormFieldsContainer">
            <form className="FormFields_Form">
                <fieldset className="FormFields_InputContainer">
                    <input
                        className="FormFields_Input"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        onChange={props.newInput}
                        required
                    />
                    <input
                        className="FormFields_Input"
                        name="password"
                        type="password"
                        placeholder="Your password"
                        onChange={props.newInput}
                        required
                    />
                </fieldset>
                <button className="FormFields_LogInBtn" onClick={props.logIn}>
                    Log In
                </button>
                <button className="FormFields_SignUpBtn" onClick={props.signUp}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

// 3rd party oAuth buttons
const ThirdPartyLogIn = () => {
    return (
        <div className="LogIn_3rdPartyContainer">
            <button className="LogIn_3rdPartyBtn">Google</button>
            <button className="LogIn_3rdPartyBtn">Facebook</button>
            <button className="LogIn_3rdPartyBtn">Twitter</button>
            <button className="LogIn_3rdPartyBtn">Github</button>
        </div>
    );
};

class LogIn extends Component {
    state = {
        email: "",
        password: "",
        error: null,
        toAppHome: false
    };

    handleNewInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSignUp = e => {
        const { email, password } = this.state;
        const user = {
            username: email,
            auth: "email"
        };
        // save user to firebase
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({ email: "", password: "" }, () => {
                    // save user to the db
                    this.props.createUser(user, null);
                });
            })
            .catch(error => {
                this.setState({ error: error }, () => {
                    this.props.createUser(null, error);
                });
            });
        e.preventDefault();
    };

    handleLogIn = e => {
        const { email, password } = this.state;
        const userDetails = {
            username: email,
            auth: "email",
            authenticated: true
        };
        auth.doSignInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({ email: "", password: "" }, () => {
                    this.props.logInUser(userDetails, null);
                });
            })
            .catch(error => {
                this.setState({ error: error }, () => {
                    this.props.logInUser(null, error);
                });
            });
        e.preventDefault();
    };

    render() {
        // redirect to app home page on successful sign up
        if (this.state.toAppHome) {
            <Redirect to="/" />;
        }

        return (
            <div className="LogInContainer">
                <FormFields
                    signUp={this.handleSignUp}
                    newInput={this.handleNewInput}
                    logIn={this.handleLogIn}
                />
                <ThirdPartyLogIn />
            </div>
        );
    }
}

export default connect(
    null,
    { createUser, logInUser }
)(LogIn);
