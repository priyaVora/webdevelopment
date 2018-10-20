import React, { Component } from 'react';
import DropArea from "./components/DropArea/DropArea.js";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Floorplan</h1>
        <DropArea/>
      </div>
    );
  }
}

export default App;
