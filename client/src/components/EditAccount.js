import '../App.css';
import './EditAccount.css';

import React, { Component } from "react";
import axios from 'axios';
 
export default class EditAccount extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeAccountName = this.onChangeAccountName.bind(this);
    this.onChangeAccountEmail = this.onChangeAccountEmail.bind(this);
    this.onChangeAccountPassword = this.onChangeAccountPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.propID = window.location.pathname.replace("/edit/", "");
 
    this.state = {
      username: "",
      email: "",
      password: "",
      accounts: [],
    };
  }
  // This will get the account based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/account/" + this.propID)
      .then((response) => {
        this.setState({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  cancel() {
    window.location.pathname = "/summary";
  }
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(newEditedperson);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.propID,
        newEditedperson
      )
      .then((res) => console.log(res.data))
      .then(window.location.pathname = "/summary");
 
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div className="Edit flex">
        <form className="Edit-form flex" onSubmit={this.onSubmit}>
          <h3 align="center">Update account</h3>
          <input className="Form-item" type="text" value={this.state.username} placeholder="Username" onChange={this.onChangeAccountName}/>
          <input className="Form-item" type="text" value={this.state.email} placeholder="Email" onChange={this.onChangeAccountEmail}/>
          <input className="Form-item" type="text" value={this.state.password} placeholder="Password" onChange={this.onChangeAccountPassword}/>
          <div className="Button-container flex">
            <button className="Form-item Form-button" onClick={this.cancel}>Cancel</button>
            <button className="Form-item Form-button" type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}