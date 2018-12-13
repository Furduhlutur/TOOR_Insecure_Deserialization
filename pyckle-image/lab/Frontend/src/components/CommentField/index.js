import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { comment } from "../../actions/commentActions";

// MaterialUI
import { TextField, Button } from "@material-ui/core";

// CSS
import styles from "./CommentField.module.css";

class CommentField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComment: ""
    };
  }

  comment(event) {
    event.preventDefault();
    const { currentComment } = this.state;
    const { comment, postId, username, addComment } = this.props;
    addComment();
    comment(currentComment, postId, username);
    this.setState({ currentComment: "" });
  }

  handleChange = event => {
    this.setState({ currentComment: event.target.value });
  };

  render() {
    const { currentComment } = this.state;
    return (
      <form
        className={styles["comment-field-w-button"]}
        onSubmit={this.comment.bind(this)}
      >
        <TextField
          id="standard-with-placeholder"
          placeholder="Comment..."
          margin="normal"
          value={currentComment}
          onChange={this.handleChange}
          className={styles["comment-field"]}
        />
        <div className={styles["lefty"]}>
          <Button variant="contained" color="secondary" type="submit">
            Comment
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  username: auth.username
});

export default connect(
  mapStateToProps,
  { comment }
)(CommentField);
