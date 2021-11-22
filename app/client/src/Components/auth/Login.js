import '../../App.css';
// import './LoginAccount.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect, connet } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classNames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            document.location.pathname = "/";
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    cancel() {
        document.location.pathname = "/summary";
    }    

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
    
        this.props.loginUser(userData);
    }

    cancel = () => {
        document.location.pathname = "/account";
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="Login flex">
                <form className="Login-form flex" onSubmit={this.onSubmit}>
                    <h3>Login</h3>
                    <div className="Login-email">
                        <label>Email</label>
                        <div className="Login-item">
                            <input id="email" className="Login-input" type="email" placeholder="Email" onChange={this.onChange} value={this.state.email} error={errors.email}/>
                            <FontAwesomeIcon className="Login-icon" icon={faUser}/>
                        </div>
                    </div>
    
                    <div className="Login-password">
                        <label>Password</label>
                        <div className="Login-item">
                            <input id="password" className="Login-input" type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} error={errors.password}/>
                            <FontAwesomeIcon className="Login-icon" icon={faLock}/>
                        </div>
                    </div>
    
                    <div className="Button-container flex">
                        <button className="Form-item Form-button" type="reset"onClick={this.cancel}>Cancel</button>
                        <button className="Form-item Form-button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser })(Login);