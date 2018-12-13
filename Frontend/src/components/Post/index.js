import React, { Component } from "react";
import { PropTypes } from "prop-types";

// Material
import { Paper } from "@material-ui/core";

// Our Components
import Comments from "../Comments";

//CSS
import styles from "./Post.module.css";

// Images for first two posts..
const images = [
  "https://migardener-myworksdesign.netdna-ssl.com/wp-content/uploads/2016/11/national-pickling-cucumber.jpg",
  "https://assets3.thrillist.com/v1/image/962161/size/tl-horizontal_main/why-i-hate-a-food-you-probably-love-pickles"
];

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: 1000
    };
  }

  trimBody(post) {
    const { maxLength } = this.state;

    // Props to: https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
    //trim the string to the maximum length
    let trimmedString = post.substr(0, maxLength);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );

    return trimmedString;
  }

  render() {
    const { title, body, author_id, id, username } = this.props.post;
    const image = images[id - 1];
    const imageStyle = {
      backgroundImage: `url(${image})`
    };
    const { maxLength } = this.state;
    return (
      <div className={styles["card"]}>
        <Paper className={styles["card"]}>
          <div className={styles["image"]} style={imageStyle}>
            poop
          </div>
          <h3>{title}</h3>
          <div>
            {this.trimBody(body)}
            {body.length > maxLength ? `${this.trimBody(body)}...` : body}
          </div>
          <div>Written by: {username}</div>
        </Paper>
        <Comments info={[id, author_id]} />
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
