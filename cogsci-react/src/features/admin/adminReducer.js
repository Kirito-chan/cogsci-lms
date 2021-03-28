import { combineReducers } from "redux";
import homeReducer from "./home/homeSlice";
import subjectsReducer from "./subjects/subjectsSlice";
// import bonusReducer from "./bonus/bonusSlice";
// import presentationReducer from "./presentation/presentationSlice";

export default combineReducers({
  home: homeReducer,
  subjects: subjectsReducer,
  //bonus: bonusReducer,
  //presentation: presentationReducer,
});
