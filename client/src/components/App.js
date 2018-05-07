import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const ChannelList = () => {
  return (
    <ul className="Item-list">
      <li>Channel 1</li>
      <li>Channel 2</li>
    </ul>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Test Apollo stuff</h2>
        </header>
        <ChannelList />
      </div>
    );
  }
}

export default App;
