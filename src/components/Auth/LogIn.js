import React, { Component } from "react";
// styles
import "../../styles/LogIn.css";

// username and password fields
const FormFields = () => {
    return (
        <div>
            <h1>form fields here</h1>
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
        password: ""
    };
    render() {
        return (
            <div className="LogInContainer">
                <FormFields />
                <ThirdPartyLogIn />
            </div>
        );
    }
}

export default LogIn;
