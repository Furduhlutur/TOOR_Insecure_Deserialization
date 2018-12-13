import { GET_POSTS, ERROR_POSTS } from "../constants";

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
    return fetch("/api/post", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        dispatch(getPostsSuccess(resp));
      })
      .catch(error => dispatch(getPostsError(error)));
  };
};
