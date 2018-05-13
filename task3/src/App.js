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
        document.getElementById("greeting").style.display="block";
        document.getElementById("loggedoff").style.display="none";
      }
      else {
        this.setState({ user: null, isAuthenticated: false, email:null });
        document.getElementById("greeting").style.display="none";
        document.getElementById("loggedoff").style.display="block";
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
      
      <div id="greeting" className='jumbotron' style={{display:'none'}}>
          <h3>Welcome to the Personal Trainer, {this.state.email}!</h3>
          <h4>You can see what we have to offer</h4>
        </div>

        <div id="loggedoff" className='jumbotron' style={{display:'block'}}>
          <h3>Welcome to the Personal Trainer!</h3>
          <h4>Please, login to see what we have to offer</h4>
        </div>
      </div>
    );
  }
}

export default App;
