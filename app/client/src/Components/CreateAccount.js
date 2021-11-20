import '../App.css';
import './CreateAccount.css';

import {validEmail, validPassword} from '../regex.js'
import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeAccountName = this.onChangeAccountName.bind(this);
    this.onChangeAccountEmail = this.onChangeAccountEmail.bind(this);
    this.onChangeAccountPassword = this.onChangeAccountPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeAccountName(e) {
    this.setState({
      username: e.target.value,
    });
  }
 
  onChangeAccountEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
 
  onChangeAccountPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  emailValidation(email) {
    if (!validEmail.test(email)) {
        return false;
    }
    return true;
  }

  passwordValidation(password) {
    if (!validPassword.test(password)) {
      return false;
    }
    return true;
  }

  cancel() {
    document.location.pathname = "/summary";
  }
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new account(newaccount) to the database.
    const newaccount = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    if (!this.emailValidation(newaccount.email)) {
      alert("Email invalid.");
      return;
    }

    if (!this.passwordValidation(newaccount.password)) {
      alert("Password invalid.");
      return;
    }
 
    axios
      .post("http://localhost:5000/account/add", newaccount)
      .then((res) => console.log(res.data))
      .then(document.location.pathname = "/summary");
 
    // We will empty the state after posting the data to the database
    this.setState({
      username: "",
      email: "",
      password: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className="Create flex">
        <form className="Create-form flex" onSubmit={this.onSubmit}>
          <h3>Create New account</h3>
          <input className="Form-item" type="text" value={this.state.username} placeholder="Username" onChange={this.onChangeAccountName}/>
          <input className="Form-item" type="text" value={this.state.email} placeholder="Email" onChange={this.onChangeAccountEmail}/>
          <input className="Form-item" type="text" value={this.state.password} placeholder="Password" onChange={this.onChangeAccountPassword}/>
          <div className="Button-container flex">
            <button className="Form-item Form-button" type="reset"onClick={this.cancel}>Cancel</button>
            <button className="Form-item Form-button" type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}