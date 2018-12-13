import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  ERROR,
  LOG_OUT,
  CLEAR_AUTH_ERR,
  DEBUG,
  REGISTER_CLEAR
} from "../constants";

const loginSuccess = username => {
  return {
    type: LOGIN_SUCCESS,
    payload: username
  };
};

const regsterSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

const errorStuff = error => {
  return {
    type: ERROR,
    payload: error
  };
};

const hasTokenCookie = () => {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    if (cookie.startsWith("token")) {
      return cookie.split("=")[1];
    }
  }
  return "";
};

export const clearError = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_ERR
  });
};

export const registerClear = () => dispatch => {
  dispatch({
    type: REGISTER_CLEAR
  });
};

export const logOut = () => dispatch => {
  localStorage.setItem("username", "");
  document.cookie = "token=;";
  dispatch({
    type: LOG_OUT
  });
};

export const isLoggedIn = () => dispatch => {
  let token = hasTokenCookie();
  if (token) {
    let username = localStorage.getItem("username");
    if (username) {
      dispatch(loginSuccess(username));
    }
  }
};

export const authenticate = (username, password, login) => {
  return dispatch => {
    const path = login ? "/api/login" : "/api/register";

    let body = new FormData();
    body.set("username", username);
    body.set("password", password);

    return fetch(DEBUG ? `http://localhost:5000${path}` : path, {
      method: "POST",
      body: body,
      credentials: "include"
    })
      .then(res => {
        if (login || res.status !== 201) {
          return res.json();
        } else {
          return res;
        }
      })
      .then(resp => {
        if (resp.error) {
          dispatch(errorStuff(resp.error));
        } else if (login) {
          localStorage.setItem("username", resp.username);
          dispatch(loginSuccess(resp.username));
        } else {
          dispatch(regsterSuccess());
        }
      })
      .catch(error => {
        dispatch(errorStuff(error.message));
      });
  };
};
