import './App.css';

import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About'
import Donation from './Components/Donation';
import Contact from './Components/Contact';
import Account from './Components/Account';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="Hero">
      <Navbar></Navbar>

      <Router>
        <Routes>
          <Route exact path="/" element={<Hero/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/donate" element={<Donation/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/account" element={<Account/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
