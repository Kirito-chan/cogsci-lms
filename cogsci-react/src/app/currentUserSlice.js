import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../app/apiConstants";

export const slice = createSlice({
  name: "currentUser",
  initialState: {
    id: 241, // 346 je dobry testovaci user, 241 som ja
    token: "",
  },
  reducers: {
    tokenReceived: (state, action) => {
      state.token = action.payload.token;
    },
    tokenCleared: (state) => {
      state.token = "";
    },
    tokenChecked: () => {},
  },
});

export const { tokenReceived, tokenCleared, tokenChecked } = slice.actions;

export default slice.reducer;

const urlToken = "/login";

export const loadToken = (username, password) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlToken,
      onSuccess: tokenReceived.type,
      method: "post",
      data: {
        username,
        password,
      },
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
    })
  );
};

export const clearToken = () => (dispatch) => {
  dispatch({ type: tokenCleared.type });
};

// Selectors
export const getCurrentUser = (state) => state.currentUser.id;
export const getToken = (state) => state.currentUser.token;
