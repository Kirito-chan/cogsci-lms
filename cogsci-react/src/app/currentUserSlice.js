import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "currentUser",
  initialState: {
    id: 241, // 346 je dobry testovaci user, 241 som ja
  },
  reducers: {},
});

export default slice.reducer;
// Selectors
export const getCurrentUser = (state) => state.currentUser.id;
