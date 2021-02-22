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

    commentsRequested: (state) => {
      state.loading = true;
    },
    commentsReceived: (state, action) => {
      state.comments = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
    },
    commentsRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  bonusRequested,
  bonusReceived,
  bonusRequestFailed,
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
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

const urlComment = "/comment";

export const loadComments = (bonusId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState().features.student.bonus.lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: urlComment + "/?bonusId=" + bonusId,
      onStart: commentsRequested.type,
      onSuccess: commentsReceived.type,
      onError: commentsRequestFailed.type,
    })
  );
};

export const getBonus = (state) => state.features.student.bonus.bonus;
export const getBonusId = (state) => state.features.student.bonus.bonus.id;
export const getComments = (state) => state.features.student.bonus.comments;
