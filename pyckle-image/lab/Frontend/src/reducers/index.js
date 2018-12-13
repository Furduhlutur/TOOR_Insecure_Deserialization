import { combineReducers } from "redux";
import auth from "./authReducer";
import posts from "./postsReducer";
import comments from "./commentsReducer";

export default combineReducers({
  auth,
  posts,
  comments
});
