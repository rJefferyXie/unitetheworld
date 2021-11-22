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

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

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
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
