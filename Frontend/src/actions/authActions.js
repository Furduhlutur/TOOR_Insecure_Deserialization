import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  ERROR,
  LOG_OUT,
  CLEAR_AUTH_ERR
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

const handleErrors = res => {
  console.log(res.ok);
};

export const authenticate = (username, password, login) => {
  return dispatch => {
    const { REACT_APP_API, REACT_APP_PORT } = process.env;
    const path = login ? "/api/login" : "/api/register";

    let body = new FormData();
    body.set("username", username);
    body.set("password", password);

    return fetch(`${REACT_APP_API}:${REACT_APP_PORT}` + path, {
      method: "POST",
      body: body,
      credentials: "include"
    })
      .then(res => res.json())
      .then(resp => {
        if (login) {
          localStorage.setItem("username", resp.username);
          dispatch(loginSuccess(resp.username));
        } else {
          dispatch(regsterSuccess());
        }
      })
      .catch(error => {
        dispatch(
          errorStuff(
            login ? "Username or Password incorrect." : "Username already taken"
          )
        );
      });
  };
};
