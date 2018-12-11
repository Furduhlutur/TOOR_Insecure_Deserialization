import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getComments, comment } from "../../actions/commentActions";

// MaterialUI
import { TextField, Button } from "@material-ui/core";

// Our components
import Comment from "../Comment";

// CSS
import styles from "./Comments.module.css";

class Comments extends Component {
  componentDidMount() {
    const { getComments } = this.props;
    getComments();
  }

  constructor(props) {
    super(props);
    this.state = {
      currentComment: ""
    };
  }

  comment() {
    const { currentComment } = this.state;
    const { comment, info } = this.props;
    comment(currentComment, ...info);
    this.setState({ currentComment: "" });
  }

  handleChange = event => {
    this.setState({ currentComment: event.target.value });
  };

  render() {
    const { currentComment } = this.state;
    const { comments, info } = this.props;
    let postId = info[0];

    let commentsJSX = comments.map
      ? comments
          .filter(post => post.post_id === postId)
          .map(comm => {
            return <Comment key={comm.id} comm={comm} />;
          })
      : null;
    return (
      <div className={styles["container"]}>
        <div className={styles["container"]}>{commentsJSX}</div>
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
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => ({
  comments: comments.comments,
  error: comments.error
});

export default connect(
  mapStateToProps,
  { getComments, comment }
)(Comments);
