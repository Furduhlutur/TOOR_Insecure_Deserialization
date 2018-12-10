import React, { Component } from "react";
import { PropTypes } from "prop-types";

// Material
import { Paper } from "@material-ui/core";

//CSS
import styles from "./Post.module.css";

class Post extends Component {
  render() {
    const { title, body, author_id, id, username } = this.props.post;
    // TODO: get comments
    return (
      <Paper className={styles["card"]}>
        <h3>{title}</h3>
        <div>{body}</div>
        <div>Written by: {username}</div>
      </Paper>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default Post;
