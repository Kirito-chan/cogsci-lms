import { combineReducers } from "@reduxjs/toolkit";
import { RESET_STATE } from "../constants";
import currentUserReducer from "./currentUserSlice";

import featuresReducer from "./features";

const appReducer = combineReducers({
  features: featuresReducer,
  currentUser: currentUserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
