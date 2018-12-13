import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    // TODO: validate if token is here
    const { username, component: Component, ...rest } = this.props;
    let isLoggedIn = username ? true : false;
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
const mapStateToProps = ({ auth }) => ({
  username: auth.username
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
