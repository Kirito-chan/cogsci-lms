import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
//import { dataInReduxAreRecent } from "../../../components/DateUtils";

export const slice = createSlice({
  name: "bonus",
  initialState: {
    bonus: {},
    comments: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bonusRequested: (state) => {
      state.loading = true;
    },
    bonusReceived: (state, action) => {
      state.bonus = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
    },
    bonusRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  bonusRequested,
  bonusReceived,
  bonusRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators

const urlBonus = "/bonus";

export const loadBonus = (bonusId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState().features.student.bonus.lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: urlBonus + "/" + bonusId,
      onStart: bonusRequested.type,
      onSuccess: bonusReceived.type,
      onError: bonusRequestFailed.type,
    })
  );
};

export const getBonus = (state) => state.features.student.bonus.bonus;
export const getBonusId = (state) => state.features.student.bonus.bonus.id;
