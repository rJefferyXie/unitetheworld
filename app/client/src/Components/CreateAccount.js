import '../App.css';
import './CreateAccount.css';

import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeaccountName = this.onChangeaccountName.bind(this);
    this.onChangeaccountEmail = this.onChangeaccountEmail.bind(this);
    this.onChangeaccountPassword = this.onChangeaccountPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      account_username: "",
      account_email: "",
      account_password: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeaccountName(e) {
    this.setState({
      account_username: e.target.value,
    });
  }
 
  onChangeaccountEmail(e) {
    this.setState({
      account_email: e.target.value,
    });
  }
 
  onChangeaccountPassword(e) {
    this.setState({
      account_password: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newaccount) to the database.
    const newaccount = {
      account_username: this.state.account_username,
      account_email: this.state.account_email,
      account_password: this.state.account_password,
    };
 
    axios
      .post("http://localhost:5000/record/add", newaccount)
      .then((res) => console.log(res.data))
      .then(document.location.pathname = "/summary");
 
    // We will empty the state after posting the data to the database
    this.setState({
      account_username: "",
      account_email: "",
      account_password: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className="Create flex">
        <h3>Create New Record</h3>
        <form className="Create-form flex" onSubmit={this.onSubmit}>
          <input className="Form-item" type="text" value={this.state.account_username} placeholder="Username" onChange={this.onChangeaccountName}/>
          <input className="Form-item" type="text" value={this.state.account_email} placeholder="Email" onChange={this.onChangeaccountEmail}/>
          <input className="Form-item" type="text" value={this.state.account_password} placeholder="Password" onChange={this.onChangeaccountPassword}/>
          <button className="Form-item Form-button" type="submit">Create Account</button>
        </form>
      </div>
    );
  }
}