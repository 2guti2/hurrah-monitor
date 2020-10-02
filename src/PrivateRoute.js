import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectSession} from "./features/session/sessionSlice";
import {NavBar} from "./features/common/navBar/NavBar";

export function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(selectSession);

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <div>
            <NavBar>
              <Component {...props} />
            </NavBar>
          </div>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}