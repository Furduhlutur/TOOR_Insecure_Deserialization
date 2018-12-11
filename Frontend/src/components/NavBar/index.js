// Added Components
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { isLoggedIn, logOut } from "../../actions/authActions";

// Material
import { AppBar, Button, Toolbar } from "@material-ui/core";

// CSS
import styles from "./NavBar.module.css";
class NavBar extends Component {
  componentDidMount() {
    const { username, isLoggedIn } = this.props;
    if (!username) {
      isLoggedIn();
    }
  }
  render() {
    const { username, logOut } = this.props;
    let links = (
      <div>
        <Link to="/login" className={styles["link"]}>
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/register" className={styles["link"]}>
          <Button color="inherit">Register</Button>
        </Link>
      </div>
    );

    if (username) {
      links = (
        <div>
          <div>{username}</div>
          <Link
            to="/register"
            className={styles["link"]}
            onClick={() => logOut()}
          >
            <Button color="inherit">Log Out</Button>
          </Link>
        </div>
      );
    }
    return (
      <AppBar position="static">
        <Toolbar className={styles["container"]}>{links}</Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    username: auth.username
  };
};

export default connect(
  mapStateToProps,
  { isLoggedIn, logOut }
)(NavBar);
