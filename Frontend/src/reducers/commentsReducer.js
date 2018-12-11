import {
  GET_COMMENTS,
  ERROR_COMMENTS,
  COMMENT,
  ERROR_COMMENT
} from "../constants";

const initialState = {
  comments: {},
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
      const { postId, comm } = action.payload;
      const { comments } = state;
      let obj = {
        ...state,
        comments: {
          ...comments,
          [postId]: comm
        }
      };
      console.log(obj);
      return obj;
    default:
      return state;
  }
};

export default commentsReducer;
