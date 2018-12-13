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

  comment() {
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
      <div className={styles["comment-field-w-button"]}>
        <TextField
          id="standard-with-placeholder"
          placeholder="Comment..."
          margin="normal"
          value={currentComment}
          onChange={this.handleChange}
          className={styles["comment-field"]}
        />
        <div className={styles["lefty"]}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.comment()}
          >
            Comment
          </Button>
        </div>
      </div>
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
