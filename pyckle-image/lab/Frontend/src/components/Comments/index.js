import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getComments, clearCommentError } from "../../actions/commentActions";

// MaterialUi
import { Button } from "@material-ui/core";

// Our components
import Comment from "../Comment";
import CommentField from "../CommentField";
import ErrorSnack from "../ErrorSnack";

// CSS
import styles from "./Comments.module.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealComments: 3
    };
  }

  extendComments() {
    const { comments, postId } = this.props;
    let length = comments.filter(post => post.post_id === postId).length;
    this.setState({ revealComments: length });
  }

  addComment() {
    const { revealComments } = this.state;
    this.setState({ revealComments: revealComments });
  }

  handleClose() {
    const { clearCommentError } = this.props;
    clearCommentError();
  }

  render() {
    const { revealComments } = this.state;
    const { comments, postId, username, error } = this.props;
    if (!username) {
      return null;
    }

    let commentsJSX = comments.map
      ? comments
          .filter(post => post.post_id === postId)
          .map(comm => {
            return <Comment key={comm.id} comm={comm} />;
          })
      : null;

    let commentLength = commentsJSX.length;

    commentsJSX = commentsJSX.slice(-revealComments);

    return (
      <div className={styles["comment-section"]}>
        <h3 className={styles["title"]}>Comments</h3>
        <div className={styles["container"]}>
          {commentLength <= 3 || commentsJSX.length > 3 ? null : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => this.extendComments()}
            >
              Show all comments
            </Button>
          )}
          <div className={styles["container"]}>{commentsJSX}</div>
          <CommentField
            postId={postId}
            addComment={this.addComment.bind(this)}
          />
        </div>
        <ErrorSnack
          open={error !== ""}
          close={this.handleClose.bind(this)}
          message={error}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ comments, auth }) => ({
  comments: comments.comments,
  error: comments.error,
  username: auth.username
});

export default connect(
  mapStateToProps,
  { getComments, clearCommentError }
)(Comments);
