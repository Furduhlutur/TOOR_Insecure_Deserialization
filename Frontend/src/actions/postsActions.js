import { GET_POSTS, ERROR_POSTS } from "../constants";
const axios = require("axios");

const getPostsSuccess = posts => {
  return {
    type: GET_POSTS,
    payload: posts
  };
};

const getPostsError = err => {
  return {
    type: ERROR_POSTS,
    payload: err
  };
};

export const getPosts = () => {
  return dispatch => {
    const { REACT_APP_API, REACT_APP_PORT } = process.env;
    console.log(`${REACT_APP_API}:${REACT_APP_PORT}/api/post`);
    return (
      axios
        .get(`${REACT_APP_API}:${REACT_APP_PORT}/api/post`, {
          mode: "no-cors",
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": `${REACT_APP_API}`
          }
        })
        //   .then(res => res.json())
        .then(resp => {
          console.log(resp);
          if (resp.status === 200) {
            console.log(resp);
            // dispatch(getPostsSuccess(resp.));
          }
        })
        .catch(error => dispatch(getPostsError(error)))
    );
  };
};
