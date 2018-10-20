import React, { Component } from 'react';
import DropArea from "./components/DropArea/DropArea.js";
import Navigation from "./components/Navigation/Navigation.js";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>FLOORPLAN</h1>
        <Navigation/>
        <DropArea/>
      </div>
    );
  }
}

export default App;
