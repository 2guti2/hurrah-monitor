import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Profile } from './containers/profile/Profile';
import { SignIn } from './containers/session/SignIn';
import { Dashboard } from './containers/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={SignIn}/>
          <PrivateRoute path="/profile" component={Profile}/>
          <PrivateRoute path="/" component={Dashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
