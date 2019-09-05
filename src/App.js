import React, { Component } from 'react';
import './App.css';
import Index from './pages/articles/index.js';
import Show from './pages/articles/show.js';
import New from './pages/articles/new.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function App() {
  return (<>
    <header />
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/show/:id" exact component={Show} />
      <Route path="/new" exact component={New} />
    </Router>
    <footer />
  </>);
}

