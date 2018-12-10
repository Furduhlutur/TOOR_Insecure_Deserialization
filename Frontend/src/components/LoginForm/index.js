import React, { Component } from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import { PropTypes } from "prop-types";

// Redux
import { connect } from "react-redux";
import { authenticate } from "../../actions/authActions";

//CSS
import styles from "./LoginForm.module.css";

class LoginForm extends Component {
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

  render() {
    const { name, pass } = this.state;
    let { title } = this.props;
    return (
      <div
        className={styles["container"]}
        autoComplete="off"
        onSubmit={() => this.handleSubmit(title)}
      >
        <Paper className={styles["jumbotron"]}>
          <h3 className={styles["title"]}>{title}</h3>
          <TextField
            label="Name"
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
            color="primary"
            onClick={() => this.handleSubmit()}
            className={styles["login-button"]}
          >
            {title}
          </Button>
        </Paper>
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

export default connect(
  null,
  { authenticate }
)(LoginForm);
