import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUserSlice";
import api from "./middleware/api";
import featuresReducer from "./features";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: {
    features: featuresReducer,
    currentUser: currentUserReducer,
  },

  middleware: [...customizedMiddleware, api],
});
