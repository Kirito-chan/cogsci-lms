import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../app/apiConstants";
import { IS_ADMIN } from "../constants";

export const slice = createSlice({
  name: "currentUser",
  initialState: {
    id: null, // 346 je dobry testovaci user, 241 som ja
    name: "",
    isAdmin: null,
    email: "",
    token: "",
    tokenError: null,
    error: "",
    errorCustomMessage: "",
  },
  reducers: {
    tokenUserReceived: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.user.id;
      state.name =
        action.payload.user.first_name + " " + action.payload.user.last_name;
      state.email = action.payload.user.email;
      state.isAdmin = action.payload.user.role == IS_ADMIN;
      state.tokenError = null;
    },
    tokenCleared: (state) => {
      state.token = "";
      state.id = null;
      state.name = "";
      state.email = "";
    },
    tokenChecked: () => {},
    tokenRequestFailed: (state, action) => {
      state.error = action.payload.message;
      state.errorCustomMessage = action.payload.customMessage;
    },
    checkTokenFailed: (state, action) => {
      state.tokenError = action.payload.message;
    },
    userRegistered: () => {},
    userRegisterFailed: (state, action) => {
      state.error = action.payload.message;
      state.errorCustomMessage = action.payload.customMessage;
    },
    errorCleared: (state) => {
      state.error = "";
      state.errorCustomMessage = "";
    },
  },
});

export const {
  tokenUserReceived,
  tokenCleared,
  tokenChecked,
  tokenRequestFailed,
  checkTokenFailed,
  userRegistered,
  userRegisterFailed,
  errorCleared,
} = slice.actions;

export default slice.reducer;

const urlToken = "/login";

export const loadUserAndToken = (username, password) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlToken,
      onSuccess: tokenUserReceived.type,
      method: "post",
      data: {
        username,
        password,
      },
      onError: tokenRequestFailed.type,
    })
  );
};

const urlCheckedToken = "/checkToken";

export const checkToken = (token) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlCheckedToken,
      onSuccess: tokenChecked.type,
      method: "post",
      data: {
        token,
      },
      onError: checkTokenFailed.type,
    })
  );
};

export const clearToken = () => (dispatch) => {
  dispatch({ type: tokenCleared.type });
};

const urlRegister = "/register";

export const registerNewUser = (
  firstName,
  lastName,
  username,
  password,
  passwordAgain,
  email
) => (dispatch) => {
  const data = {
    firstName,
    lastName,
    username,
    password,
    passwordAgain,
    email,
  };
  return dispatch(
    apiCallBegan({
      url: urlRegister,
      onSuccess: userRegistered.type,
      method: "post",
      data,
      onError: userRegisterFailed.type,
    })
  );
};

export const clearError = () => (dispatch) => {
  dispatch({ type: errorCleared.type });
};

// Selectors
export const getCurrentUserId = (state) => state.currentUser.id;
export const getCurrentUserName = (state) => state.currentUser.name;
export const getCurrentUserEmail = (state) => state.currentUser.email;
export const getToken = (state) => state.currentUser.token;
export const getError = (state) => state.currentUser.error;
export const getTokenError = (state) => state.currentUser.tokenError;
export const getCustomError = (state) => state.currentUser.errorCustomMessage;
export const getIsAdmin = (state) => state.currentUser.isAdmin;
