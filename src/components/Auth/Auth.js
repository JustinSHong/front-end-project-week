import React, { Component } from "react";
// components
import LogIn from "./LogIn";
// styles
import "../../styles/Auth.css";

class Auth extends Component {
    render() {
        return (
            <div className="AuthContainer">
                <h1 className="AuthForm_header">Log In or Sign Up!</h1>
                {/* Sign In/ Sign up form here */}
                <LogIn />
            </div>
        );
    }
}

export default Auth;
