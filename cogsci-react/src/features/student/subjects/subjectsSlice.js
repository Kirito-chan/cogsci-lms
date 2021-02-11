import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
// import { TIME_TO_WAIT_FOR_FETCHING } from "../../constants";
// import moment from "moment";

export const slice = createSlice({
  name: "subjects",
  initialState: {
    currentSubjectId: null,
    currentSubjectName: null,
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
      state.lastFetch = Date.now();
    },
    subjectsRequestFailed: (state) => {
      state.loading = false;
    },
    currentSubjectIdReceived: (state, action) => {
      state.currentSubjectId = action.payload;
    },
    subjectReceived: (state, action) => {
      state.currentSubjectName = action.payload.name;
    },
    clearedCurrentSubject: (state) => {
      state.currentSubject = null;
    },
  },
});

export const {
  subjectsRequested,
  subjectsReceived,
  subjectsRequestFailed,
  subjectReceived,
  clearedCurrentSubject,
  currentSubjectIdReceived,
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

const urlSubject = "/subject";

export const loadSubject = (subjectId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlSubject + "/" + subjectId,
      onSuccess: subjectReceived.type,
    })
  );
};

export const loadCurrentSubjectId = (subjectId) => (dispatch) => {
  dispatch({ type: currentSubjectIdReceived.type, payload: subjectId });
};

export const clearCurrentSubject = () => (dispatch) => {
  dispatch({ type: clearedCurrentSubject.type });
};

export const getSubjects = (state) => state.features.student.subjects.subjects;
export const getCurrentSubject = (state) =>
  state.features.student.subjects.currentSubjectId;
export const getCurrentSubjectName = (state) =>
  state.features.student.subjects.currentSubjectName;
