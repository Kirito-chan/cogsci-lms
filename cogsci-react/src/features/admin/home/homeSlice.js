import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
import {
  createUrlToUploadPresentation,
  STUD_PRES_CLOSED,
  STUD_PRES_OPENED,
  STUD_PRES_NEUTRAL,
} from "../../../constants";

export const slice = createSlice({
  name: "home",
  initialState: {
    teacherPresentations: null, // []
    studentPresentationsNeutral: null, // []   prezentacie prijate na ucitelov feedback, este nezobrazene pre studentov
    studentPresentationsOpened: null, // []
    studentPresentationsClosed: null, // []
    uploadedPresentation: null,
  },
  reducers: {
    teacherPresentationsReceived: (state, action) => {
      state.teacherPresentations = action.payload;
    },
    studentPresentationsNeutralReceived: (state, action) => {
      state.studentPresentationsNeutral = action.payload;
    },
    studentPresentationsOpenedReceived: (state, action) => {
      state.studentPresentationsOpened = action.payload;
    },
    studentPresentationsClosedReceived: (state, action) => {
      state.studentPresentationsClosed = action.payload;
    },
    uploadedPresentationReceived: (state) => {
      state.uploadedPresentation = true;
    },
  },
});

export const {
  teacherPresentationsReceived,
  studentPresentationsNeutralReceived,
  studentPresentationsOpenedReceived,
  studentPresentationsClosedReceived,
  uploadedPresentationReceived,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const uploadPresentation = (file, subjectId, currentUserId) => (
  dispatch
) => {
  const data = new FormData();
  data.append("file", file);
  const url = createUrlToUploadPresentation(subjectId, false, currentUserId);

  return dispatch(
    apiCallBegan({
      method: "post",
      data,
      url,
      onSuccess: uploadedPresentationReceived.type,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
  );
};

const urlTeacherPresentations = "/teacher-presentations";

export const loadTeacherPresentations = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlTeacherPresentations + "/" + userId + "/" + subjectId,
      onSuccess: teacherPresentationsReceived.type,
    })
  );
};

const urlStudentPresentations = "/student-presentations";

export const loadStudentPresentationsNeutral = (userId, subjectId) => (
  dispatch
) => {
  return dispatch(
    apiCallBegan({
      // prettier-ignore
      url: urlStudentPresentations + "/" + userId + "/" + subjectId + "/?status=" + STUD_PRES_NEUTRAL,
      onSuccess: studentPresentationsNeutralReceived.type,
    })
  );
};

export const loadStudentPresentationsOpened = (userId, subjectId) => (
  dispatch
) => {
  return dispatch(
    apiCallBegan({
      // prettier-ignore
      url: urlStudentPresentations + "/" + userId + "/" + subjectId + "/?status=" + STUD_PRES_OPENED,
      onSuccess: studentPresentationsOpenedReceived.type,
    })
  );
};

export const loadStudentPresentationsClosed = (userId, subjectId) => (
  dispatch
) => {
  return dispatch(
    apiCallBegan({
      // prettier-ignore
      url:
        urlStudentPresentations + "/" + userId + "/" + subjectId + "/?status=" + STUD_PRES_CLOSED,
      onSuccess: studentPresentationsClosedReceived.type,
    })
  );
};

// Selectors
export const getTeacherPresentations = (state) =>
  state.features.admin.home.teacherPresentations;
export const getStudentPresentationsNeutral = (state) =>
  state.features.admin.home.studentPresentationsNeutral;
export const getStudentPresentationsOpened = (state) =>
  state.features.admin.home.studentPresentationsOpened;
export const getStudentPresentationsClosed = (state) =>
  state.features.admin.home.studentPresentationsClosed;
