import '../App.css';
import './EditAccount.css';

import React, { Component } from "react";
import axios from 'axios';
 
class EditAccount extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    this.propID = window.location.pathname.replace("/edit/", ""); 
    this.onChangeAccess = this.onChangeAccess.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      access: ""
    };
  }
  // This will get the account based on the id from the database.
  componentDidMount() {
    axios
      .get("/api/users/user/" + this.propID)
      .then((response) => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          access: response.data.access
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  onChangeAccess = e => {
    this.setState({access: e.target.value})
  }

  cancel() {
    window.location.pathname = "/dashboard";
  }
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedUser = {
      name: this.state.name,
      email: this.state.email,
      access: this.state.access
    };
 
    // This will send a post request to update the data in the database.
    axios
      .post("/api/users/edit/" + this.propID, newEditedUser)
      .then((res) => console.log(res.data))
      .then(window.location.pathname = "/dashboard");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div className="Edit flex">
        <form className="Edit-form flex" onSubmit={this.onSubmit}>
          <h3>Update account</h3>
          <div className="Edit-item" type="text">Username: {this.state.name}</div>
          <div className="Edit-item" type="text">Email: {this.state.email}</div>
          <div className="Edit-item" type="text" value={this.state.access}>Access Level: {this.state.access}</div>
          <div className="Radio-button-container flex">
            <input type="radio" name="access" className="Radio-button" value="Admin" onChange={this.onChangeAccess}></input>
            <label>Admin</label>
            <input type="radio" name="access" className="Radio-button" value="User" onChange={this.onChangeAccess}></input>
            <label>User</label>
          </div>
          <div className="Button-container flex">
            <button className="Edit-item Edit-button" type="reset" onClick={this.cancel}>Cancel</button>
            <button className="Edit-item Edit-button" type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditAccount;