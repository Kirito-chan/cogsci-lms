import { combineReducers } from "redux";
import homeReducer from "./home/homeSlice";
import subjectsReducer from "./subjects/subjectsSlice";
import bonusReducer from "./bonus/bonusSlice";

export default combineReducers({
  home: homeReducer,
  subjects: subjectsReducer,
  bonus: bonusReducer,
});
