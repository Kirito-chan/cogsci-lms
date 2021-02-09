import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
// import { TIME_TO_WAIT_FOR_FETCHING } from "../../constants";
// import moment from "moment";

export const slice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    subjectsRequested: (state) => {
      state.loading = true;
    },
    subjectsReceived: (state, action) => {
      state.subjects = action.payload;
      state.lastFetch = new Date();
    },
    subjectsRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  subjectsRequested,
  subjectsReceived,
  subjectsRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
// function dataInReduxAreRecent(getState) {
//   const { lastFetch } = getState().features.homeStudent;

//   const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
//   if (diffInMinutes < TIME_TO_WAIT_FOR_FETCHING) return true;
//   return false;
// }

const urlSubjects = "/subjects";

export const loadSubjects = (userId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlSubjects + "/" + userId,
      onStart: subjectsRequested.type,
      onSuccess: subjectsReceived.type,
      onError: subjectsRequestFailed.type,
    })
  );
};

export const getSubjects = (state) => state.features.student.subjects.subjects;
