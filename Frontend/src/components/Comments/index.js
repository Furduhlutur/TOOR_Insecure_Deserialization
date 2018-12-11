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

  handleChange = event => {
    this.setState({ currentComment: event.target.value });
  };

  render() {
    const { comments, comment, info } = this.props;
    const { currentComment } = this.state;
    let postId = info[0];
    console.log(comments);

    let commentsJSX = comments.map
      ? comments
          .filter(post => post.post_id === postId)
          .map(comm => {
            return <Comment key={comm.id} comm={comm} />;
          })
      : null;
    return (
      <div>
        <div>{commentsJSX}</div>
        <div>
          <TextField
            id="standard-with-placeholder"
            placeholder="Comment..."
            margin="normal"
            onChange={this.handleChange}
            className={styles["comment-field"]}
          />
        </div>
        <div className={styles["lefty"]}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => comment(currentComment, ...info)}
          >
            Comment
          </Button>
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
