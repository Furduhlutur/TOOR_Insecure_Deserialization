import { GET_POSTS, ERROR_POSTS } from "../constants";

const initialState = {
  posts: [],
  error: "Empty"
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        error: "",
        posts: action.payload
      };
    case ERROR_POSTS:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default postsReducer;
