import { combineReducers } from "redux";
import studentReducer from "../features/student/studentReducer";
import adminReducer from "../features/admin/adminReducer";

export default combineReducers({
  student: studentReducer,
  admin: adminReducer,
});
