import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions";
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
    anyError: "",
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
    tokenRequestFromLoginFailed: (state, action) => {
      state.error = action.payload.message;
      state.errorCustomMessage = action.payload.customMessage;
    },
    tokenRequestFromTokenFailed: (state, action) => {
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
    anyErrorReceived: (state, action) => {
      state.anyError = action.payload;
    },
    anyErrorCleared: (state) => {
      state.anyError = "";
    },
  },
});

export const {
  tokenUserReceived,
  tokenCleared,
  tokenChecked,
  tokenRequestFromLoginFailed,
  tokenRequestFromTokenFailed,
  checkTokenFailed,
  userRegistered,
  userRegisterFailed,
  errorCleared,
  anyErrorReceived,
  anyErrorCleared,
} = slice.actions;

export default slice.reducer;

const urlTokenWithLogin = "/login";

export const loadUserAndTokenWithLogin = (username, password) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlTokenWithLogin,
      onSuccess: tokenUserReceived.type,
      method: "post",
      data: {
        username,
        password,
      },
      onError: tokenRequestFromLoginFailed.type,
    })
  );
};

const urlToken = "/get-token";

export const loadUserAndTokenWithToken = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlToken,
      onSuccess: tokenUserReceived.type,
      onError: tokenRequestFromTokenFailed.type,
    })
  );
};

const urlCheckedToken = "/check-token";

export const checkToken = (token) => (dispatch) => {
  const headers = getHeaderToken(token);

  return dispatch(
    apiCallBegan({
      url: urlCheckedToken,
      onSuccess: tokenChecked.type,
      method: "post",
      headers,
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

export const clearAnyError = () => (dispatch) => {
  dispatch({ type: anyErrorCleared.type });
};

export const getHeaderToken = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export const getTokenHeaders = () => {
  const token = localStorage.getItem("token");
  return getHeaderToken(token);
};

// Selectors
export const getCurrentUserId = (state) => state.currentUser.id;
export const getCurrentUserName = (state) => state.currentUser.name;
export const getCurrentUserEmail = (state) => state.currentUser.email;
export const getToken = (state) => state.currentUser.token;
export const getError = (state) => state.currentUser.error;
export const getTokenError = (state) => state.currentUser.tokenError;
export const getCustomError = (state) => state.currentUser.errorCustomMessage;
export const getAnyError = (state) => state.currentUser.anyError;
export const getIsAdmin = (state) => state.currentUser.isAdmin;
