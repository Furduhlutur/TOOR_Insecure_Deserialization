import React from "react";

// MaterialUI
import { SnackbarContent, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

// CSS
import styles from "./Errors.module.css";

const ErrorContentWrapper = props => {
  const { className, message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={styles["title"]}>
          <ErrorIcon />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={styles["snack"]} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

export default ErrorContentWrapper;
