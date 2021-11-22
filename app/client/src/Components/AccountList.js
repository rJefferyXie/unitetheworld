import '../App.css';
import './AccountList.css';

import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Account = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
    <td>{props.user.access}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>Edit</Link> |
      <a href="/dashboard/" onClick={() => {props.deleteAccount(props.user._id)}}>
        Delete
      </a>
    </td>
  </tr>
);

export default class AccountList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.state = { accounts: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("/api/users/summary")
      .then((response) => {
        this.setState({ accounts: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a account based on the method
  deleteAccount(id) {
    axios.delete("/api/users/" + id).then((response) => {
      console.log(response.data);
    })

    this.setState({
      account: this.state.accounts.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  accountList() {
    return this.state.accounts.map((currentaccount) => {
      return (
        <Account
          user={currentaccount}
          deleteAccount={this.deleteAccount}
          key={currentaccount._id}
        />
      );
    });
  }

  // This following section will display the table with the accounts of individuals.
  render() {
    return (
      <div className="AccountList flex">
        <div className="AccountList-container flex">
          <h3>Account List</h3>
          <table className="AccountList-table">
            <thead>
              <tr>
                <th className="table-item">Username</th>
                <th className="table-item">Email Address</th>
                <th className="table-item">Access</th>
                <th className="table-item">Action</th>
              </tr>
            </thead>
            <tbody>{this.accountList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}