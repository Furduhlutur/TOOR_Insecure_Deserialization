import React, { Component } from "react";
import { PropTypes } from "prop-types";

// Material
import { Paper } from "@material-ui/core";

// Our Components
import Comments from "../Comments";

//CSS
import styles from "./Post.module.css";

// Images for first two posts..
const images = [];

class Post extends Component {
  render() {
    const { title, body, id, username, image } = this.props.post;
    const imageStyle = {
      backgroundImage: `url(${image})`
    };
    return (
      <div className={styles["card"]}>
        <Paper className={styles["card"]}>
          <div className={styles["image"]} style={imageStyle} />
          <h3 className={styles["title"]}>{title}</h3>
          <div>{body}</div>
          <div>Written by: {username}</div>
        </Paper>
        <Comments postId={id} />
      </div>
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
