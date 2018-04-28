import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
//import Homepage from './Homepage';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal Trainer</h1>
        </header>

        <BrowserRouter>
          <div>
            {/*<Link to="/">Home</Link>{' '} */}
            <Link to="/customers">Customers</Link>{' '}
            <Link to="/trainings">Trainings</Link>{' '}

            <Switch>
            {/*  <Route exact path = "/" component={Homepage} />*/}
              <Route path = "/customers" component={CustomerList} />
              <Route path = "/trainings" component={TrainingList} />

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
