import '../App.css';
import './CreateAccount.css';

import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
 
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
    this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      person_name: "",
      person_position: "",
      person_level: "",
    };
  }
 
  // These methods will update the state properties.
  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value,
    });
  }
 
  onChangePersonPosition(e) {
    this.setState({
      person_position: e.target.value,
    });
  }
 
  onChangePersonLevel(e) {
    this.setState({
      person_level: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_name: this.state.person_name,
      person_position: this.state.person_position,
      person_level: this.state.person_level,
    };
 
    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data))
      .then(document.location.pathname = "/summary");
 
    // We will empty the state after posting the data to the database
    this.setState({
      person_name: "",
      person_position: "",
      person_level: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className="Create">
        <h3>Create New Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of the person: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_name}
              onChange={this.onChangePersonName}
            />
          </div>
          <div className="form-group">
            <label>Person's position: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.person_position}
              onChange={this.onChangePersonPosition}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Intern"
                checked={this.state.person_level === "Intern"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Intern</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Junior"
                checked={this.state.person_level === "Junior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Junior</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Senior"
                checked={this.state.person_level === "Senior"}
                onChange={this.onChangePersonLevel}
              />
              <label className="form-check-label">Senior</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}