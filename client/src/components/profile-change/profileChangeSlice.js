import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../app/actions";

export const slice = createSlice({
  name: "profileChange",
  initialState: {
    error: "",
  },
  reducers: {
    profileUpdated: (state) => {
      state.error = "";
    },
    errorReceived: (state, action) => {
      state.error = action.payload.customMessage;
    },
    errorCleared: (state) => {
      state.error = "";
    },
  },
});

export const { profileUpdated, errorReceived, errorCleared } = slice.actions;

export default slice.reducer;

const urlProfile = "/profile";

export const updateUserProfile = (
  userId,
  firstName,
  lastName,
  username,
  oldPassword,
  password,
  passwordAgain,
  email
) => (dispatch) => {
  const data = {
    firstName,
    lastName,
    username,
    oldPassword,
    password,
    passwordAgain,
    email,
  };
  return dispatch(
    apiCallBegan({
      method: "put",
      url: "/user/" + userId + urlProfile,
      data,
      onSuccess: profileUpdated.type,
      onError: errorReceived.type,
    })
  );
};

export const clearError = () => (dispatch) => {
  dispatch({ type: errorCleared.type });
};

// Selectors
export const getError = (state) => state.features.profileChange.error;
