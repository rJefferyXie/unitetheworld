import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About'
import Donation from './components/Donation';
import Contact from './components/Contact';
import EditAccount from './components/EditAccount';

import Account from './components/Account';
import AccountDetails from './components/accountdetails/AccountDetails';
import Register from './components/auth/Register';
import AccountList from './components/AccountList';
import Posts from './components/posts/Posts'
import PrivateRoute from './components/private-route/PrivateRoute';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authActions";

var isAuth = false;

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  isAuth = true;
  setAuthToken(token);
  const decodedToken = jwt_decode(token);
  store.dispatch(setCurrentUser(decodedToken));

  // Check if token has expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./account";
  }
} else {
  isAuth = false;
}

function App() {
  return (
    <div className="App">
      <Navbar props={ isAuth }></Navbar>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Hero/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/donate" element={<Donation/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/account" element={<Account/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/edit/:id" element={<EditAccount/>}></Route>

            <Route path="" element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Posts/>}></Route>
              <Route path="/accountdetails" element={<AccountDetails/>}></Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
