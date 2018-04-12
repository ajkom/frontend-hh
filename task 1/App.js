import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Customers Database</h1>
        </header>
        <CustomerList />
        <TrainingList />
      </div>
    );
  }
}

export default App;
