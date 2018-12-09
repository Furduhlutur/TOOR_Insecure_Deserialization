import React, { Component } from "react";
import { TextField, Paper, Button } from "@material-ui/core";

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
    const { authenticate } = this.props;
    authenticate(name, pass);
  };

  render() {
    const { name, pass } = this.state;
    console.log(name);
    return (
      <form
        className={styles["container"]}
        autoComplete="off"
        onSubmit={() => this.handleSubmit()}
      >
        <Paper className={styles["jumbotron"]}>
          <TextField
            id="standard-name"
            label="Name"
            name="name"
            value={name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Password"
            name="pass"
            value={pass}
            onChange={this.handleChange("pass")}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={styles["login-button"]}
          >
            Login
          </Button>
        </Paper>
      </form>
    );
  }
}

export default connect(
  null,
  { authenticate }
)(LoginForm);
