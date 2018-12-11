import { LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR } from "../constants";

const initialState = {
  username: "",
  error: ""
};

const authReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        username: action.payload,
        error: ""
      };
    case REGISTER_SUCCESS:
      return initialState;
    case ERROR:
      return {
        username: "",
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
