import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Calendar from './Calendar';
import Navigator from './Navigator';
import Login from './Login';

import { firebaseAuth } from './config';


const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, email: null, isAuthenticated : false};
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true, email: user.email });
      }
      else {
        this.setState({ user: null, isAuthenticated: false, email:null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Personal Trainer</h1>
        </header>

        <BrowserRouter>
          <div>
            <Navigator isAuthenticated={this.state.isAuthenticated} />
            <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path = "/customers" component={CustomerList} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path = "/trainings" component={TrainingList} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path = "/calendar" component={Calendar} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
