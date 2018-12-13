import {
  GET_COMMENTS,
  ERROR_COMMENTS,
  COMMENT,
  ERROR_COMMENT
} from "../constants";

const initialState = {
  comments: [],
  error: ""
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        error: "",
        comments: action.payload
      };
    case ERROR_COMMENTS || ERROR_COMMENT:
      return {
        ...state,
        error: action.payload
      };
    case COMMENT:
      const { comments } = state;
      return {
        ...state,
        comments: [...comments, action.payload]
      };
    default:
      return state;
  }
};

export default commentsReducer;
