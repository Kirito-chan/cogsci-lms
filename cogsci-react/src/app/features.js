import { combineReducers } from "redux";
import studentReducer from "../features/student/studentReducer";

export default combineReducers({
  student: studentReducer,
  //teacher: teacherReducer,s
});
