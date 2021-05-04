import { combineReducers } from "redux";
import studentReducer from "../features/student/studentReducer";
import adminReducer from "../features/admin/adminReducer";
import resetPasswordReducer from "../features/login/resetPasswordSlice";

export default combineReducers({
  student: studentReducer,
  admin: adminReducer,
  resetPassword: resetPasswordReducer,
});
