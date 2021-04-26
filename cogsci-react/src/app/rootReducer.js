import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUserSlice";

import featuresReducer from "./features";

const appReducer = combineReducers({
  features: featuresReducer,
  currentUser: currentUserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
