// Added Components
import React, { Component } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

// CSS
import styles from "./NavBar.module.css";
class NavBar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar className={styles["container"]}>
          <Link to="/login" className={styles["link"]}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className={styles["link"]}>
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
