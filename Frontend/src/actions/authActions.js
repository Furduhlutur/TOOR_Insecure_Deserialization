import { LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR } from "../constants";

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
        if (resp.status !== 200) {
          dispatch(errorStuff(resp.error));
        } else if (login) {
          dispatch(loginSuccess(resp.username));
        } else {
          dispatch(regsterSuccess());
        }
      })
      .catch(error => {
        dispatch(errorStuff(error));
      });
  };
};
