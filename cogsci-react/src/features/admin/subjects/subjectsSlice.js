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

const urlSubjects = "/admin/subjects";

export const loadSubjects = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubjects,
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

export const getSubjects = (state) => state.features.student.subjects.subjects;
export const getCurrentSubjectId = (state) =>
  state.features.student.subjects.currentSubjectId;
export const getCurrentSubjectName = (state) =>
  state.features.student.subjects.currentSubjectName;
