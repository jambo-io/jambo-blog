import React, { Component } from 'react';
import './App.css';
import Index from './pages/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function App() {
  return (<>
    <Router>
      <Route path="/" exact component={Index} />
    </Router>
  </>);
}

