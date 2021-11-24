import '../App.css';
import './EditAccount.css';

import React, { Component } from "react";
import axios from 'axios';
 
const Event = (props) => (
  <tr>
    <td>{props.event[0]}</td>
    <td>{props.event[1]}</td>
    <td>{props.event[2]}</td>
  </tr>
);

class EditAccount extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    this.propID = window.location.pathname.replace("/edit/", ""); 
    this.onChangeAccess = this.onChangeAccess.bind(this);
    this.onChangeEvents = this.onChangeEvents.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      rating: 0,
      access: "",
      events: [],
      eventname: "",
      eventlocation: "",
      eventrating: 0
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
          access: response.data.access,
          rating: response.data.rating,
          events: response.data.events
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  onChangeAccess = e => {
    this.setState({access: e.target.value});
  }

  onChangeEvents = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  addNewEvent = e => {
    e.preventDefault();

    this.setState({rating: this.state.rating + parseInt(this.state.eventrating)});

    const newEvent = [
      this.state.eventname, 
      this.state.eventlocation, 
      this.state.eventrating
    ];

    this.setState(state => ({
      events: [...state.events, newEvent]
    }));
  }

  eventList() {
    return this.state.events.map((currentevent) => {
        return (
          <Event
            event={currentevent}
            key={currentevent}
          />
        );
    });
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
      access: this.state.access,
      rating: this.state.rating,
      events: this.state.events
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
          <div className="Edit-form-container flex">
            <div className="Edit-container flex">
              <div className="Edit-info flex">
              <h3 className="user-header">User Account Details</h3>
                <div className="info-item" type="text">Username: {this.state.name}</div>
                  <div className="info-item" type="text">Email: {this.state.email}</div>
                  <div className="info-item" type="number">Rating: {((this.state.rating / (this.state.events.length * 5)) * 5).toFixed(2)}</div>
                  <div className="info-item" type="text" value={this.state.access}>Access Level: {this.state.access}</div>
                    <div className="EventList-container">
                      <table className="EventList-table">
                          <thead>
                              <tr>
                                  <th className="table-item">Event Name</th>
                                  <th className="table-item">Event Location</th>
                                  <th className="table-item">Rating</th>
                              </tr>
                          </thead>
                          <tbody>{this.eventList()}</tbody>
                      </table>  
                    </div>               
                  </div>
                <div className="Edit-info flex">
                  <div className="event-container flex">
                    <h3 className="edit-header">Add New Event</h3>
                    <input id="eventname" className="Event-item" type="text" value={this.state.eventname} placeholder="Event Name" onChange={this.onChangeEvents}></input>
                    <input id="eventlocation" className="Event-item" type="text" value={this.state.eventlocation} placeholder="Event Location" onChange={this.onChangeEvents}></input>
                    <input id="eventrating" className="Event-item" type="number" min="1" max="5" value={this.state.eventrating} placeholder="Rating: (1-5)" onChange={this.onChangeEvents}></input>
                    <button className="Event-item Event-Button" type="button" onClick={this.addNewEvent}>Add New Event</button>
                  </div>
                  <div className="access-container flex">
                    <h3 className="edit-header">Change User Access Level</h3>
                    <div className="Radio-button-container flex">
                      <input type="radio" name="access" className="Radio-button" value="Admin" onChange={this.onChangeAccess}></input>
                      <label>Admin</label>
                      <input type="radio" name="access" className="Radio-button" value="User" onChange={this.onChangeAccess}></input>
                      <label>User</label>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="Button-container flex">
            <button className="Edit-item flex Edit-button cancel" type="reset" onClick={this.cancel}>Cancel</button>
            <button className="Edit-item flex Edit-button update" type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditAccount;