import React, { Component } from "react";
import { Link } from "react-router-dom";
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

    componentWillReceiveProps(nextProps) {
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
            <div className="Create flex">
            <form className="Create-form flex" onSubmit={this.onSubmit}>
                <h3>Create New account</h3>
                <input id="name" type="text" placeholder="Username" value={this.state.name} onChange={this.onChange} error={errors.name} className={classnames("Form-item", {invalid: errors.name})}/>
                <span>{errors.name}</span>
                <input id="email" type="email" placeholder="Email" value={this.state.email} onChange={this.onChange} error={errors.email} className={classnames("Form-item", {invalid: errors.email})}/>
                <span>{errors.email}</span>
                <input id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} error={errors.password} className={classnames("Form-item", {invalid: errors.password})}/>
                <span>{errors.password}</span>
                <input id="password2" type="password" placeholder="Confirm Password" value={this.state.password2} onChange={this.onChange} error={errors.password2} className={classnames("Form-item", {invalid: errors.password2})}/>
                <span>{errors.password2}</span>
                <div className="Button-container flex">
                    <button className="Form-item Form-button" type="reset"onClick={this.cancel}>Cancel</button>
                    <button className="Form-item Form-button" type="submit">Create</button>
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

// const withRouter = (Component) => {
//     const Wrapper = (props) => {
//         return (
//             <Component 
//             {...props}
//             />
//         );
//     };
//     return Wrapper;
// };

export default connect(
    mapStateToProps, 
    { registerUser })(Register);
