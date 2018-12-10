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
    return fetch(`${REACT_APP_API}:${REACT_APP_PORT}/api/post`)
      .then(res => res.json())
      .then(resp => {
        dispatch(getPostsSuccess(resp));
      })
      .catch(error => dispatch(getPostsError(error)));
  };
};
