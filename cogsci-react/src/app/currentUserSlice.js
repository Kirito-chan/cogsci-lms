import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../app/apiConstants";

export const slice = createSlice({
  name: "currentUser",
  initialState: {
    id: null, // 346 je dobry testovaci user, 241 som ja
    name: null,
    token: "",
    error: "",
  },
  reducers: {
    tokenUserReceived: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.user.id;
      state.name =
        action.payload.user.first_name + " " + action.payload.user.last_name;
    },
    tokenCleared: (state) => {
      state.token = "";
    },
    tokenChecked: () => {},
    apiFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  tokenUserReceived,
  tokenCleared,
  tokenChecked,
  apiFailed,
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
      onError: apiFailed.type,
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
      onError: apiFailed.type,
    })
  );
};

export const clearToken = () => (dispatch) => {
  dispatch({ type: tokenCleared.type });
};

// Selectors
export const getCurrentUserId = (state) => state.currentUser.id;
export const getCurrentUserName = (state) => state.currentUser.name;
export const getToken = (state) => state.currentUser.token;
export const getError = (state) => state.currentUser.error;
