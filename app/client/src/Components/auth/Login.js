import '../../App.css';
import './Login.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons'

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

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
            document.location.pathname = "/dashboard";
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
                    <FontAwesomeIcon className="Login-logo" icon={faUserCircle}/>
                    <h3>Sign In</h3>
                    <div className="Login-container">
                        <label>Email</label>
                        <div className="Login-item">
                            <input id="email" className={classnames("Login-input", {invalid: errors.email || errors.emailnotfound})} type="email" placeholder="Email" onChange={this.onChange} value={this.state.email} error={errors.email}/>
                            <FontAwesomeIcon className="Login-icon" icon={faEnvelope}/>
                        </div>
                        <span>{errors.email}{errors.emailnotfound}</span>
                    </div>
    
                    <div className="Login-container">
                        <label>Password</label>
                        <div className="Login-item">
                            <input id="password" className={classnames("Login-input", {invalid: errors.password || errors.passwordincorrect})} type="password" placeholder="Password" onChange={this.onChange} value={this.state.password} error={errors.password}/>
                            <FontAwesomeIcon className="Login-icon" icon={faLock}/>
                        </div>
                        <span>{errors.password}{errors.passwordincorrect}</span>
                    </div>
    
                    <button className="Login-button" type="submit">Login</button>

                    <div>
                        <label>Not Registered? </label>
                        <a className="Create-account" href="/register">Create An Account</a>
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