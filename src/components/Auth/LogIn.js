import React, { Component } from "react";
import { connect } from "react-redux";
// styles
import "../../styles/LogIn.css";
// actions
import { createUser } from "../../actions/index";
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
                <button className="FormFields_LogInBtn">Log In</button>
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
        error: null
    };

    handleNewInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSignUp = e => {
        const { email, password } = this.state;

        const user = {
            username: this.state.email,
            auth: "email"
        };

        // save user to the db
        this.props.createUser(user);
        // save user to firebase
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({ email: "", password: "" });
            })
            .catch(error => {
                this.setState({ error: error }, () => {
                    console.log(this.state.error);
                });
            });

        e.preventDefault();
    };

    render() {
        return (
            <div className="LogInContainer">
                <FormFields
                    signUp={this.handleSignUp}
                    newInput={this.handleNewInput}
                />
                <ThirdPartyLogIn />
            </div>
        );
    }
}

export default connect(
    null,
    { createUser }
)(LogIn);
