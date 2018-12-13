import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  ERROR,
  LOG_OUT,
  CLEAR_AUTH_ERR,
  REGISTER_CLEAR
} from "../constants";

const initialState = {
  username: "",
  error: "",
  registered: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        username: action.payload,
        error: ""
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registered: true
      };
    case REGISTER_CLEAR:
      return {
        ...state,
        registered: false
      };
    case ERROR:
      return {
        username: "",
        error: action.payload
      };
    case LOG_OUT:
      return initialState;
    case CLEAR_AUTH_ERR:
      return {
        ...state,
        error: ""
      };
    default:
      return state;
  }
};

export default authReducer;
