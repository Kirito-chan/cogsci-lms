import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./rootReducer";
import api from "./middleware/api";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: appReducer,
  middleware: [...customizedMiddleware, api],
});

export default store;
