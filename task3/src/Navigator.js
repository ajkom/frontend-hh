import React, { Component } from 'react';
import './App.css';
import { Link} from 'react-router-dom';
require( 'bootstrap/dist/js/bootstrap.min.js');

class Navigator extends Component {

  render() {
    return (

      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Main Page</Link>
          </div>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse" id="navbarText">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trainings">Trainings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar">Calendar</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigator;
