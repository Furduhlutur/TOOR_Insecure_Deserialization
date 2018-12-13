import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getComments } from "../../actions/commentActions";

// Our components
import Comment from "../Comment";
import CommentField from "../CommentField";

// CSS
import styles from "./Comments.module.css";

class Comments extends Component {
  componentDidMount() {
    const { getComments, username } = this.props;
    if (username) {
      getComments();
    }
  }

  render() {
    const { comments, info, username } = this.props;
    if (!username) {
      return null;
    }
    let postId = info[0];

    let commentsJSX = comments.map
      ? comments
          .filter(post => post.post_id === postId)
          .map(comm => {
            return <Comment key={comm.id} comm={comm} />;
          })
      : null;
    return (
      <div className={styles["comment-section"]}>
        <h3>Comments</h3>
        <hr />
        <div className={styles["container"]}>
          <div className={styles["container"]}>{commentsJSX}</div>
          <CommentField info={info} />
        </div>
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
  { getComments }
)(Comments);
