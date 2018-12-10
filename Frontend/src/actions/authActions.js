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
    let body = new FormData();
    body.set("username", username);
    body.set("password", password);
    const path = login ? "/api/login" : "/api/register";
    // return fetch(path, {
    return (
      fetch(process.env.REACT_APP_API + path, {
        method: "POST",
        mode: "no-cors",
        body: body,
        credentials: "same-origin"
      })
        // .then(res => {
        //   console.log(res);
        //   return res.json();
        // })
        .then(resp => {
          console.log(resp);
          if (resp.status !== 200) {
            dispatch(errorStuff(resp.error));
          } else if (login) {
            dispatch(loginSuccess(resp.username));
          } else {
            dispatch(regsterSuccess());
          }
        })
        .catch(error => {
          console.error(error);
          dispatch(errorStuff(error));
        })
    );
  };
};
