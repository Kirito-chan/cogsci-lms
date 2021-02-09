import { combineReducers } from "redux";
import homeStudentReducer from "./homeStudent/homeStudentSlice";
import subjectsReducer from "./subjects/subjectsSlice";

export default combineReducers({
  homeStudent: homeStudentReducer,
  subjects: subjectsReducer,
});
