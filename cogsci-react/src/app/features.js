import { combineReducers } from "redux";
import studentReducer from "../features/student/studentReducer";
import adminReducer from "../features/admin/adminReducer";
import resetPasswordReducer from "../features/login/resetPasswordSlice";
import profileChangeReducer from "../components/profile-change/profileChangeSlice";

export default combineReducers({
  student: studentReducer,
  admin: adminReducer,
  resetPassword: resetPasswordReducer,
  profileChange: profileChangeReducer,
});
