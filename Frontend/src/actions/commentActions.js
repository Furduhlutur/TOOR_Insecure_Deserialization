import {
  GET_COMMENTS,
  ERROR_COMMENTS,
  COMMENT,
  ERROR_COMMENT
} from "../constants";

const getCommentsSuccess = comments => {
  return {
    type: GET_COMMENTS,
    payload: comments
  };
};

const getCommentsError = err => {
  return {
    type: ERROR_COMMENTS,
    payload: err
  };
};

const commentSuccess = comm => {
  return {
    type: COMMENT,
    payload: comm
  };
};

const commentFailure = err => {
  return {
    type: ERROR_COMMENT,
    payload: err
  };
};

export const getComments = () => {
  return dispatch => {
    const { REACT_APP_API, REACT_APP_PORT } = process.env;
    return fetch(`${REACT_APP_API}:${REACT_APP_PORT}/api/comment`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        dispatch(getCommentsSuccess(resp));
      })
      .catch(error => dispatch(getCommentsError(error)));
  };
};

export const comment = (comm, postId, authorId) => {
  return dispatch => {
    const { REACT_APP_API, REACT_APP_PORT } = process.env;

    let body = new FormData();
    body.set("body", comm);
    body.set("post_id", postId);
    body.set("author_id", authorId);

    return fetch(`${REACT_APP_API}:${REACT_APP_PORT}/api/comment`, {
      method: "POST",
      body: body,
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        dispatch(commentSuccess(resp));
      })
      .catch(err => {
        dispatch(commentFailure(err));
      });
  };
};
