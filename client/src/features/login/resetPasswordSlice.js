import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../app/actions";

export const slice = createSlice({
  name: "resetPassword",
  initialState: {
    username: null,
    fullName: null,
    passwordResetError: "",
    expirationError: "",
    passwordUpdateError: "",
  },
  reducers: {
    passwordReseted: (state) => {
      state.passwordResetError = "";
      state.passwordUpdateError = "";
    },
    passwordResetedFailed: (state, action) => {
      state.passwordResetError = action.payload.customMessage;
    },
    expirationChecked: (state, action) => {
      state.expirationError = "";
      state.username = action.payload.username;
      state.fullName = action.payload.firstName + " " + action.payload.lastName;
    },
    expirationCheckFailed: (state, action) => {
      state.expirationError = action.payload.customMessage;
    },
    passwordUpdated: () => {},
    passwordUpdateFailed: (state) => {
      state.passwordUpdateError =
        "Nastala chyba serveru, načítajte stránku a skúste ešteraz";
    },
  },
});

export const {
  passwordReseted,
  passwordResetedFailed,
  expirationChecked,
  expirationCheckFailed,
  passwordUpdated,
  passwordUpdateFailed,
} = slice.actions;

export default slice.reducer;

const urlForgottenPassword = "/forgotten-password/send-email";

export const resetPassword = (email) => (dispatch) => {
  const data = { email };

  return dispatch(
    apiCallBegan({
      url: urlForgottenPassword,
      onSuccess: passwordReseted.type,
      method: "put",
      data,
      onError: passwordResetedFailed.type,
    })
  );
};

const urlCheckExpiration = "/reseted-password/check-expiration";

export const checkExpiration = (userId, token) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlCheckExpiration + "/?userId=" + userId + "&token=" + token,
      onSuccess: expirationChecked.type,
      onError: expirationCheckFailed.type,
    })
  );
};

const urlChangePassword = "/reseted-password/change-password";

export const updatePassword = (userId, token, password) => (dispatch) => {
  const data = { password };
  return dispatch(
    apiCallBegan({
      method: "patch",
      url: urlChangePassword + "/?userId=" + userId + "&token=" + token,
      onSuccess: passwordUpdated.type,
      onError: passwordUpdateFailed.type,
      data,
    })
  );
};

// Selectors
export const getUsername = (state) => state.features.resetPassword.username;
export const getFullName = (state) => state.features.resetPassword.fullName;
export const getPasswordResetError = (state) =>
  state.features.resetPassword.passwordResetError;
export const getExpirationError = (state) =>
  state.features.resetPassword.expirationError;
export const getPasswordUpdateError = (state) =>
  state.features.resetPassword.passwordUpdateError;
