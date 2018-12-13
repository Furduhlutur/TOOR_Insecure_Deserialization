import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import { getPosts } from "../../actions/postsActions";
import { getComments } from "../../actions/commentActions";

//CSS
import styles from "./Home.module.css";

//Our components
import Post from "../Post";

class Home extends Component {
  componentDidMount() {
    const { getPosts, getComments, username } = this.props;
    getPosts();
    if (username) {
      getComments();
    }
  }

  render() {
    const { posts, error } = this.props;
    let postsJSX = posts.map
      ? posts.map(post => <Post key={post.id} post={post} />)
      : null;
    if (error) {
      postsJSX = <div>The posts could not be fetched at this time.</div>;
    }
    return <div className={styles["container"]}>{postsJSX}</div>;
  }
}

const mapStateToProps = ({ auth, posts }) => ({
  username: auth.username,
  posts: posts.posts,
  error: posts.error
});

export default connect(
  mapStateToProps,
  { getPosts, getComments }
)(Home);
