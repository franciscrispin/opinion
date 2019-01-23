import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Signup />
      </div>
    );
  }
}

export default App;
