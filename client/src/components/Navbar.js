import '../App.css';
import './Navbar.css';

import React, { Component } from "react";

class Navbar extends Component {
    render() {
        if (this.props.props) {
            return (
                <nav className="App-navbar">
                    <div className="App-navbar-container flex">
                        <a href="/dashboard" className="App-logo"><i className="fab fa-sith"></i>UniteTheWorld</a>
                        <ul className="App-navbar-menu flex">
                            <li className="App-navbar-item flex">
                                <a href="/dashboard" className="App-navbar-link about">Dashboard</a>
                            </li>
                            <li className="App-navbar-item flex">
                                <a href="/accountdetails" className="App-navbar-link about">Account</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
        else {
            return (
                <nav className="App-navbar">
                    <div className="App-navbar-container flex">
                        <a href="/" className="App-logo"><i className="fab fa-sith"></i>UniteTheWorld</a>
                        <ul className="App-navbar-menu flex">
                            <li className="App-navbar-item flex">
                                <a href="/about" className="App-navbar-link about">About</a>
                            </li>
                            <li className="App-navbar-item flex">
                                <a href="/donate" className="App-navbar-link donate">Donate</a>
                            </li>
                            <li className="App-navbar-item flex">
                                <a href="/contact" className="App-navbar-link contact">Contact</a>
                            </li>
                            <li className="App-navbar-item flex">
                                <a href="/account" className="App-navbar-link account">Account</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        };
    };
};

export default Navbar;