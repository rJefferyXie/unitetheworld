import '../../App.css';
import './Dashboard.css';

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import AccountList from "../AccountList";

class Dashboard extends Component {
    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        
        return (
            <div className="Dashboard flex">
                <div className="Dashboard-container flex">
                    <AccountList></AccountList>
                    <label>{user.name}</label>
                    <label>{user.email}</label>
                    <label>{user.access}</label>
                    <button onClick={this.onLogout}>Logout</button>
                </div>
            </div>
        );
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
