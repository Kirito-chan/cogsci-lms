import { combineReducers } from "redux";
import homeReducer from "./home/homeSlice";
import subjectsReducer from "./subjects/subjectsSlice";
import studentDetailReducer from "./student-detail/studentDetailSlice";
import allUsersReducer from "./all-users/allUsersSlice";

export default combineReducers({
  home: homeReducer,
  subjects: subjectsReducer,
  studentDetail: studentDetailReducer,
  allUsers: allUsersReducer,
});
