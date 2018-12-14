import {
  GET_COMMENTS,
  ERROR_COMMENTS,
  COMMENT,
  ERROR_COMMENT,
  DEBUG,
  CLEAR_COMMENTS_ERROR
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

export const clearCommentError = () => dispatch => {
  dispatch({
    type: CLEAR_COMMENTS_ERROR
  });
};

export const getComments = () => {
  return dispatch => {
    return fetch(DEBUG ? "http://localhost:5000/api/comment" : "/api/comment", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        dispatch(getCommentsSuccess(resp));
      })
      .catch(error => dispatch(getCommentsError(error)));
  };
};

export const comment = (comm, postId, username) => {
  return dispatch => {
    let body = new FormData();
    body.set("body", comm);
    body.set("post_id", postId);
    body.set("username", username);

    return fetch(DEBUG ? "http://localhost:5000/api/comment" : "/api/comment", {
      method: "POST",
      body: body,
      credentials: "include"
    })
      .then(res => {
        if (res.headers.get("content-type").includes("application/json")) {
          return res.json();
        } else if (res.status === 500) {
          dispatch(commentFailure("Oops something went wrong..."));
        } else {
          return res.text();
        }
      })
      .then(resp => {
        if (resp.error) {
          dispatch(commentFailure(resp.error));
        } else {
          dispatch(commentSuccess(resp));
        }
      })
      .catch(err => {
        dispatch(commentFailure("Oops something went wrong..."));
      });
  };
};
