import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Paper, Button } from "@material-ui/core";
import { PropTypes } from "prop-types";

// Redux
import { connect } from "react-redux";
import { authenticate, clearError } from "../../actions/authActions";

// Our Components
import ErrorSnack from "../ErrorSnack";

//CSS
import styles from "./LoginForm.module.css";

class LoginForm extends Component {
  componentDidMount() {
    const { clearError } = this.props;
    clearError();
  }
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pass: ""
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    const { name, pass } = this.state;
    const { authenticate, title } = this.props;

    authenticate(name, pass, title.toLowerCase() === "login");
    this.setState({ name: "", pass: "" });
  };

  handleClose() {
    const { clearError } = this.props;
    clearError();
  }

  render() {
    const { name, pass } = this.state;
    let { title, username, error } = this.props;
    if (username) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className={styles["container"]}
        autoComplete="off"
        onSubmit={() => this.handleSubmit(title)}
      >
        <Paper className={styles["jumbotron"]}>
          <h3 className={styles["title"]}>{title}</h3>
          <TextField
            label="Username"
            name="name"
            value={name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="pass"
            value={pass}
            onChange={this.handleChange("pass")}
            margin="normal"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.handleSubmit()}
            className={styles["login-button"]}
          >
            {title}
          </Button>
        </Paper>
        <ErrorSnack
          open={error !== ""}
          close={this.handleClose.bind(this)}
          message={error}
        />
      </div>
    );
  }
}

LoginForm.propTypes = {
  title: PropTypes.string
};

LoginForm.defaultProps = {
  title: "Login"
};

const mapStateToProps = ({ auth }) => {
  return {
    username: auth.username,
    error: auth.error
  };
};

export default connect(
  mapStateToProps,
  { authenticate, clearError }
)(LoginForm);
