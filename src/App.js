import React from 'react';
import { Home } from './containers/home/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {PrivateRoute} from "./PrivateRoute";
import {Profile} from "./containers/profile/Profile";
import {SignIn} from "./containers/session/SignIn";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={SignIn} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
