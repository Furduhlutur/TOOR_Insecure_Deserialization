import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    // TODO: validate if token is here
    const { component: Component, ...rest } = this.props;
    let isLoggedIn = true;
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
