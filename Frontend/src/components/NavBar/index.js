// Added Components
import React, { Component } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";

// CSS
import styles from "./NavBar.module.css";
class NavBar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar className={styles["container"]}>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
