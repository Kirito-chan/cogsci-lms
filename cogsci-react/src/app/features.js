import { combineReducers } from "redux";
import counterReducer from '../features/counter/counterSlice';
import homeStudentReducer from '../features/homeStudent/homeStudentSlice';

export default combineReducers({
  counter: counterReducer,
  homeStudent: homeStudentReducer
});