import '../../App.css';
import './Dashboard.css';

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import AccountList from "../AccountList";

const Event = (props) => (
    <tr>
      <td>{props.event[0]}</td>
      <td>{props.event[1]}</td>
      <td>{props.event[2]}</td>
    </tr>
);

class Dashboard extends Component {
    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    eventList() {
        return this.props.auth.user.events.map((currentevent) => {
            return (
              <Event
                event={currentevent}
                key={currentevent}
              />
            );
        });
      }

    render() {
        const { user } = this.props.auth;

        if (user.access === "User") {
            return (
                <div className="Dashboard flex">
                    <div className="Dashboard-container flex">
                        <div className="User-info-container flex">
                            <label className="info-item">Username: {user.name}</label>
                            <label className="info-item">Email: {user.email}</label>
                            <label className="info-item">Rating: {((user.rating / (user.events.length * 5)) * 5).toFixed(2)}</label>
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
                            <button className="Dashboard-button" onClick={this.onLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )
        }

        else if (user.access === "Admin") {
            return (
                <div className="Dashboard flex">
                    <div className="Dashboard-container flex">
                        <AccountList className="AccountList"></AccountList>
                        <div className="User-info-container flex">
                            <h3 className="user-header">Your Account Details</h3>
                            <label className="info-item">Username: {user.name}</label>
                            <label className="info-item">Email: {user.email}</label>
                            <label className="info-item">Rating: {((user.rating / (user.events.length * 5)) * 5).toFixed(2)}</label>
                            <label className="info-item">Access Level: {user.access}</label>
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
                            <button className="Dashboard-button" onClick={this.onLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            );
        }

        else {
            return (
                <div>"Error occurred. You are not an Admin or a User.
                    <button className="Dashboard-button" onClick={this.onLogout}>Logout</button>
                </div>
            )
        }
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser})(Dashboard);
