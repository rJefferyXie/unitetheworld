import '../../App.css';
import './Register.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
      super();
      this.state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
      };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            window.location.pathname = "/dashboard";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }  

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    
    onSubmit = e => {
        e.preventDefault();
    
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };
    
    render() {
        const { errors } = this.state;

        return (
            <div className="Register flex">
            <form className="Register-form flex" onSubmit={this.onSubmit}>
                <h3>Create New account</h3>
                <div className="Register-container">
                    <label>Username</label>
                    <div className="Register-item">
                        <input id="name" type="text" placeholder="Username" value={this.state.name} onChange={this.onChange} error={errors.name} className={classnames("Login-input", {invalid: errors.name})}/>
                        <FontAwesomeIcon className="Register-icon" icon={faUser}/>
                    </div>
                    <span>{errors.name}</span>
                </div>

                <div className="Register-container">
                    <label>Email</label>
                    <div className="Register-item">
                        <input id="email" type="email" placeholder="Email" value={this.state.email} onChange={this.onChange} error={errors.email} className={classnames("Login-input", {invalid: errors.email})}/>
                        <FontAwesomeIcon className="Register-icon" icon={faEnvelope}/>
                    </div>
                    <span>{errors.email}</span>
                </div>

                <div className="Register-container">
                    <label>Password</label>
                    <div className="Register-item">
                        <input id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} error={errors.password} className={classnames("Login-input", {invalid: errors.password})}/>
                        <FontAwesomeIcon className="Register-icon" icon={faLock}/>
                    </div>
                    <span>{errors.password}</span>
                </div>

                <div className="Register-container">
                    <label>Confirm Password</label>
                    <div className="Register-item">
                        <input id="password2" type="password" placeholder="Confirm Password" value={this.state.password2} onChange={this.onChange} error={errors.password2} className={classnames("Login-input", {invalid: errors.password2})}/>
                        <FontAwesomeIcon className="Register-icon" icon={faLock}/>
                    </div>
                    <span>{errors.password2}</span>
                </div>
                <button className="Register-button" type="submit">Create</button>

                <div>
                    <label>Already have an account? </label>
                    <a className="Login-account" href="/account">Sign In</a>
                </div>
            </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, 
    { registerUser })(Register);
