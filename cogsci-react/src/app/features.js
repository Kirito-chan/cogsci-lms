import { combineReducers } from "redux";
import homeStudentReducer from "../features/homeStudent/homeStudentSlice";

export default combineReducers({
  homeStudent: homeStudentReducer,
});
