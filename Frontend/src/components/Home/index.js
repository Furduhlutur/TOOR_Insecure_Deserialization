import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import { getPosts } from "../../actions/postsActions";

//CSS
import styles from "./Home.module.css";

//Our components
import Post from "../Post";

// Dummy object
const posts = [
  {
    author_id: 7,
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum dolor sit amet consectetur. Egestas maecenas pharetra convallis posuere morbi leo urna. Imperdiet dui accumsan sit amet. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Etiam erat velit scelerisque in dictum non. Vehicula ipsum a arcu cursus vitae. Nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus. At imperdiet dui accumsan sit. Orci dapibus ultrices in iaculis. Eu consequat ac felis donec et odio. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Sem et tortor consequat id porta nibh venenatis cras. Etiam tempor orci eu lobortis elementum nibh. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Et tortor consequat id porta nibh venenatis cras sed felis.\n\nDictumst quisque sagittis purus sit amet. Vel turpis nunc eget lorem dolor sed. At consectetur lorem donec massa sapien faucibus et. Dis parturient montes nascetur ridiculus mus. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Integer malesuada nunc vel risus. Turpis egestas integer eget aliquet nibh. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. A lacus vestibulum sed arcu non odio euismod lacinia at. Risus viverra adipiscing at in tellus integer feugiat. Sit amet nisl purus in. In arcu cursus euismod quis. Aenean et tortor at risus. Pharetra diam sit amet nisl suscipit adipiscing. Amet risus nullam eget felis eget nunc lobortis mattis aliquam.\n",
    created: "Mon, 10 Dec 2018 20:02:32 GMT",
    id: 1,
    title: "Picklelicious",
    username: "admin"
  }
];

class Home extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    const { user, error } = this.props;
    // if (error) {
    //   return <div>The posts could not be fetched at this time.</div>;
    // }
    return (
      <div className={styles["container"]}>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, posts }) => ({
  user: auth.username,
  posts: posts.posts,
  error: posts.error
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Home);
