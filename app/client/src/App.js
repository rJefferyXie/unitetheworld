import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About'
import Donation from './components/Donation';
import Contact from './components/Contact';
import Account from './components/Account';
import CreateAccount from './components/CreateAccount';
import LoginAccount from './components/LoginAccount';
import EditAccount from './components/EditAccount';
import AccountList from './components/AccountList';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/private-route/PrivateRoute';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authActions";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);
  store.dispatch(setCurrentUser(decodedToken));

  // Check if token has expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Hero/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/donate" element={<Donation/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/account" element={<Account/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/edit/:id" element={<EditAccount/>}></Route>
            <Route path="/summary" element={<AccountList/>}></Route>

            <Route path="/dashboard" element={<PrivateRoute/>}>
              <Route path="" element={<Dashboard/>}></Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
