import React, { Component } from "react";
import { PropTypes } from "prop-types";

// MaterialUI
import { Snackbar } from "@material-ui/core";

// Our Components
import ErrorContentWrapper from "./ErrorContentWrapper";

// CSS
import styles from "./Errors.module.css";

class ErrorSnack extends Component {
  render() {
    const { open, message, close } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <ErrorContentWrapper
          onClose={close}
          className={styles["snack"]}
          variant="error"
          message={message}
        />
      </Snackbar>
    );
  }
}

ErrorSnack.propTypes = {
  open: PropTypes.bool
};

export default ErrorSnack;
