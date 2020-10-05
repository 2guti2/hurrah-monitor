import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectSession} from "./containers/session/sessionSlice";
import {Nav} from "./containers/nav/Nav";

export function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectSession);

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <div>
            <Nav>
              <Component {...props} />
            </Nav>
          </div>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
