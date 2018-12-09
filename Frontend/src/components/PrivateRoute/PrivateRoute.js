import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    let isLoggedIn = false;
    let rest = null;
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
