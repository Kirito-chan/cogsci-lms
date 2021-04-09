import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
import {
  createUrlToUploadPresentation,
  STUD_PRES_CLOSED,
  STUD_PRES_OPENED,
} from "../../../constants";

export const slice = createSlice({
  name: "home",
  initialState: {
    attendances: null, // []
    bonuses: null, // []
    teacherPresentations: null, // []
    studentPresentationsOpened: null, // []
    studentPresentationsClosed: null, // []
    myPresentation: null, // { presentation: null, presentationWeight: null }, // presentation is {}
    subjectValuation: null, // object
    uploadedPresentation: null,
  },
  reducers: {
    attendancesReceived: (state, action) => {
      state.attendances = action.payload;
    },
    bonusesReceived: (state, action) => {
      state.bonuses = action.payload;
    },
    teacherPresentationsReceived: (state, action) => {
      state.teacherPresentations = action.payload;
    },
    studentPresentationsOpenedReceived: (state, action) => {
      state.studentPresentationsOpened = action.payload;
    },
    studentPresentationsClosedReceived: (state, action) => {
      state.studentPresentationsClosed = action.payload;
    },
    myPresentationReceived: (state, action) => {
      const presentation = action.payload.presentation
        ? action.payload.presentation
        : {};
      state.myPresentation = {
        presentation,
        presentationWeight: action.payload.presentationWeight?.weight,
      };
    },
    subjectValuationReceived: (state, action) => {
      state.subjectValuation = action.payload;
    },
    uploadedPresentationReceived: (state) => {
      state.uploadedPresentation = true;
    },
    presentationCriteriaInserted: () => {},
  },
});

export const {
  attendancesReceived,
  bonusesReceived,
  teacherPresentationsReceived,
  studentPresentationsOpenedReceived,
  studentPresentationsClosedReceived,
  myPresentationReceived,
  subjectValuationReceived,
  uploadedPresentationReceived,
  presentationCriteriaInserted,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const uploadPresentation = (
  file,
  subjectId,
  currentUserId,
  isTeacherPres
) => (dispatch) => {
  const data = new FormData();
  data.append("file", file);
  const url = createUrlToUploadPresentation(
    subjectId,
    isTeacherPres,
    currentUserId
  );

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

const urlAttendance = "/attendance";

export const loadAttendance = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAttendance + "/" + userId + "/" + subjectId,
      onSuccess: attendancesReceived.type,
    })
  );
};

const urlBonuses = "/bonus";

export const loadBonuses = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlBonuses + "/?userId=" + userId + "&subjectId=" + subjectId,
      onSuccess: bonusesReceived.type,
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

const urlMyPresentation = "/my-presentation";

export const loadMyPresentation = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlMyPresentation + "/" + userId + "/" + subjectId,
      onSuccess: myPresentationReceived.type,
    })
  );
};

const urlSubjectValuation = "/subject-valuation";

export const loadSubjectValuation = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubjectValuation + "/" + subjectId,
      onSuccess: subjectValuationReceived.type,
    })
  );
};

export const updateSubjectValuation = (
  subjectId,
  gradeA,
  gradeB,
  gradeC,
  gradeD,
  gradeE,
  gradeFx
) => (dispatch) => {
  const data = { gradeA, gradeB, gradeC, gradeD, gradeE, gradeFx };
  return dispatch(
    apiCallBegan({
      method: "put",
      data,
      url: urlSubjectValuation + "/" + subjectId,
      onSuccess: subjectValuationReceived.type,
    })
  );
};

const urlAdmin = "/admin";
const urlSubject = "/subject";
const urlSettings = "/settings";
const urlPresCriteria = "/presentation-criteria";

export const deleteOldAndInsertNewPresentationCriteria = (
  subjectId,
  criteria,
  wereJustUpdatedNotDeletedOrInserted
) => (dispatch) => {
  const data = { criteria };
  return dispatch(
    apiCallBegan({
      method: "post",
      data,
      url:
        urlAdmin +
        urlSubject +
        "/" +
        subjectId +
        urlSettings +
        urlPresCriteria +
        "/?wereJustUpdatedNotDeletedOrInserted=" +
        wereJustUpdatedNotDeletedOrInserted,
      onSuccess: presentationCriteriaInserted.type,
    })
  );
};

// Selectors
export const getLoading = (state) => state.features.student.home.loading;
export const getAttendance = (state) => state.features.student.home.attendances;
export const getBonuses = (state) => state.features.student.home.bonuses;
export const getTeacherPresentations = (state) =>
  state.features.student.home.teacherPresentations;
export const getStudentPresentationsOpened = (state) =>
  state.features.student.home.studentPresentationsOpened;
export const getStudentPresentationsClosed = (state) =>
  state.features.student.home.studentPresentationsClosed;
export const getMyPresentation = (state) =>
  state.features.student.home.myPresentation;
export const getSubjectValuation = (state) =>
  state.features.student.home.subjectValuation;
