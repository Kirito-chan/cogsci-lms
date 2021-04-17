import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";

export const slice = createSlice({
  name: "subjects",
  initialState: {
    currentSubjectId: null,
    currentSubjectName: null,
    subjects: null,
  },
  reducers: {
    subjectsRequested: () => {},
    subjectsReceived: (state, action) => {
      state.subjects = action.payload;
    },
    subjectsRequestFailed: () => {},
    currentSubjectIdReceived: (state, action) => {
      state.currentSubjectId = action.payload;
    },
    subjectReceived: (state, action) => {
      state.currentSubjectId = action.payload.id;
      state.currentSubjectName = action.payload.name;
    },
    clearedCurrentSubject: (state) => {
      state.currentSubjectId = null;
      state.currentSubjectName = null;
    },
    signedInForSubject: () => {},
  },
});

export const {
  subjectsRequested,
  subjectsReceived,
  subjectsRequestFailed,
  subjectReceived,
  clearedCurrentSubject,
  currentSubjectIdReceived,
  signedInForSubject,
} = slice.actions;

export default slice.reducer;

// Action Creators

const urlSubjects = "/subject";

export const loadSubjects = (userId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubjects + "/?userId=" + userId,
      onStart: subjectsRequested.type,
      onSuccess: subjectsReceived.type,
      onError: subjectsRequestFailed.type,
    })
  );
};

const urlSubject = "/subject";

export const loadSubject = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubject + "/" + subjectId,
      onSuccess: subjectReceived.type,
    })
  );
};

export const loadCurrentSubjectId = (subjectId) => (dispatch) => {
  return dispatch({ type: currentSubjectIdReceived.type, payload: subjectId });
};

export const clearCurrentSubject = () => (dispatch) => {
  dispatch({ type: clearedCurrentSubject.type });
};

const urlSignInToSubject = "/sign-in";

export const signInForSubject = (userId, subjectId) => (dispatch) => {
  const data = { userId };
  return dispatch(
    apiCallBegan({
      method: "post",
      url: urlSubject + "/" + subjectId + urlSignInToSubject,
      data,
      onSuccess: signedInForSubject.type,
    })
  );
};

export const getSubjects = (state) => state.features.student.subjects.subjects;
export const getCurrentSubjectId = (state) =>
  state.features.student.subjects.currentSubjectId;
export const getCurrentSubjectName = (state) =>
  state.features.student.subjects.currentSubjectName;
