import '../App.css';
import './AccountList.css';

import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Account = (props) => (
  <tr>
    <td>{props.account.username}</td>
    <td>{props.account.email}</td>
    <td>{props.account.password}</td>
    <td>
      <Link to={"/edit/" + props.account._id}>Edit</Link> |
      <a href="/" onClick={() => { props.deleteaccount(props.account._id); }}>Delete</a>
    </td>
  </tr>
);

export default class AccountList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteaccount = this.deleteaccount.bind(this);
    this.state = { accounts: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/account/")
      .then((response) => {
        this.setState({ accounts: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a account based on the method
  deleteaccount(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    }).then(document.location.pathname = "/summary");

    this.setState({
      account: this.state.accounts.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  accountList() {
    return this.state.accounts.map((currentaccount) => {
      return (
        <Account
          account={currentaccount}
          deleteaccount={this.deleteaccount}
          key={currentaccount._id}
        />
      );
    });
  }

  showInfo() {
    axios.get("http://localhost:5000/account").then((res) => console.log(res.data));
  }

  // This following section will display the table with the accounts of individuals.
  render() {
    return (
      <div className="AccountList flex">
        <h3>Account List</h3>
        <table className="AccountList-table">
          <thead>
            <tr>
              <th className="table-item">Username</th>
              <th className="table-item">Email Address</th>
              <th className="table-item">Password</th>
              <th className="table-item">Action</th>
            </tr>
          </thead>
          <tbody>{this.accountList()}</tbody>
        </table>
        <a href="/create">Create Account</a>
        <button className="Form-item Form-button" onClick={this.showInfo}>Show Info</button>
      </div>
    );
  }
}