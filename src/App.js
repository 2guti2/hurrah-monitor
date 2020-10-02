import React from 'react';
import { Home } from './features/home/Home'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {PrivateRoute} from "./PrivateRoute";
import {Profile} from "./features/profile/Profile";
import {SignIn} from "./features/session/SignIn";

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
