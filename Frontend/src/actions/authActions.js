import { LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR } from "../constants";

const loginSuccess = username => {
  return {
    type: LOGIN_SUCCESS,
    payload: username
  };
};

export const authenticate = async (username, password, login) => dispatch => {
  let body = new FormData();
  body.set("username", username);
  body.set("password", password);
  const path = login ? "/api/login" : "/api/register";
  //   let res = await fetch(process.env.REACT_APP_API + path);
  //   let json = await res.json();
  //   if (res.status !== 200) {
  //     dispatch();
  //   } else if (login) {
  //     dispatch();
  //   } else {
  //     dispatch();
  //   }
};
