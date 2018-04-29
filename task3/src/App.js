import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Calendar from './Calendar';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal Trainer</h1>
        </header>

        <BrowserRouter>
          <div>
            <Link to="/customers">Customers</Link>{' '}
            <Link to="/trainings">Trainings</Link>{' '}
            <Link to="/calendar">Calendar</Link>{' '}

            <Switch>
              <Route path = "/customers" component={CustomerList} />
              <Route path = "/trainings" component={TrainingList} />
              <Route exact path = "/calendar" component={Calendar} />

            </Switch>
          </div>
        </BrowserRouter>





      {  /*<CustomerList />
        <TrainingList />*/}
      </div>
    );
  }
}

export default App;
