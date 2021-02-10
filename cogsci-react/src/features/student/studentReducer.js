import { combineReducers } from "redux";
import homeReducer from "./home/homeSlice";
import subjectsReducer from "./subjects/subjectsSlice";

export default combineReducers({
  home: homeReducer,
  subjects: subjectsReducer,
});
