import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/actions";

export const slice = createSlice({
  name: "allUsers",
  initialState: {
    users: null, // []
  },
  reducers: {
    usersReceived: (state, action) => {
      state.users = action.payload;
    },
    usersRequestFailed: () => {},
    userRoleUpdated: () => {},
    userRoleUpdateFailed: () => {},
  },
});

export const {
  usersReceived,
  usersRequestFailed,
  userRoleUpdated,
  userRoleUpdateFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
const urlAdmin = "/admin";
const urlUser = "/user";

export const loadUsers = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdmin + urlUser,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const updateUserRole = (userId, role) => (dispatch) => {
  const data = { role };
  return dispatch(
    apiCallBegan({
      method: "patch",
      url: urlAdmin + urlUser + "/" + userId,
      data,
      onSuccess: userRoleUpdated.type,
      onError: userRoleUpdateFailed.type,
    })
  );
};

export const getUsers = (state) => state.features.admin.allUsers.users;
