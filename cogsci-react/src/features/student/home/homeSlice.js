import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/actions";
import {
  createUrlToUploadPresentation,
  STUD_PRES_CLOSED,
  STUD_PRES_OPENED,
} from "../../../constants";

export const slice = createSlice({
  name: "home",
  initialState: {
    attendances: null, // []
    attendanceErrorPassword: "",
    bonuses: null, // []
    teacherPresentations: null, // []
    studentPresentationsOpened: null, // []
    studentPresentationsClosed: null, // []
    myPresentation: null, // { },
    subjectValuation: null, // object
    uploadedPresentation: null,
    presentationWeight: null,
    attendanceWeight: null,
    commentsWeight: null,
  },
  reducers: {
    attendancesReceived: (state, action) => {
      state.attendances = [];
      for (const attendance of action.payload) {
        let attendanceCopy = Object.assign({}, attendance);
        delete attendance.password;
        state.attendances.push(attendanceCopy);
      }
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
      state.myPresentation = action.payload;
    },
    subjectValuationReceived: (state, action) => {
      state.subjectValuation = action.payload;
    },
    uploadedPresentationReceived: (state) => {
      state.uploadedPresentation = true;
    },
    presentationCriteriaInserted: () => {},
    passwordForAttendanceAdded: () => {},
    passwordForAttendanceFailed: (state, action) => {
      state.attendanceErrorPassword = action.payload.customMessage;
    },
    attendancePasswordErrorCleared: (state) => {
      state.attendanceErrorPassword = "";
    },
    weightReceived: (state, action) => {
      state.presentationWeight = action.payload.presentationWeight.weight;
      state.attendanceWeight = action.payload.attendanceWeight.weight;
      state.commentsWeight = action.payload.commentsWeight.weight;
    },
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
  passwordForAttendanceAdded,
  attendancePasswordErrorCleared,
  passwordForAttendanceFailed,
  weightReceived,
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
const urlSubject = "/subject";

export const addPasswordForAttendance = (userId, subjectId, password) => (
  dispatch
) => {
  const data = { password };
  return dispatch(
    apiCallBegan({
      method: "post",
      url: urlSubject + "/" + subjectId + urlAttendance + "/?userId=" + userId,
      data,
      onSuccess: passwordForAttendanceAdded.type,
      onError: passwordForAttendanceFailed.type,
    })
  );
};

export const loadAttendance = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubject + "/" + subjectId + urlAttendance + "/?userId=" + userId,
      onSuccess: attendancesReceived.type,
    })
  );
};

const urlWeight = "/weight";
export const loadSubjectWeight = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubject + "/" + subjectId + urlWeight,
      onSuccess: weightReceived.type,
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

const urlTeacherPresentations = "/teacher-presentation";

export const loadTeacherPresentations = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url:
        urlTeacherPresentations +
        "/?userId=" +
        userId +
        "&subjectId=" +
        subjectId,
      onSuccess: teacherPresentationsReceived.type,
    })
  );
};

const urlStudentPresentations = "/student-presentation";

export const loadStudentPresentationsOpened = (userId, subjectId) => (
  dispatch
) => {
  return dispatch(
    apiCallBegan({
      // prettier-ignore
      url: urlStudentPresentations + "/?status=" + STUD_PRES_OPENED + "&userId=" + userId + "&subjectId=" + subjectId,
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
        urlStudentPresentations + "/?status=" + STUD_PRES_CLOSED + "&userId=" + userId + "&subjectId=" + subjectId,
      onSuccess: studentPresentationsClosedReceived.type,
    })
  );
};

const urlMyPresentation = "/my-presentation";

export const loadMyPresentation = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url:
        urlSubject + "/" + subjectId + urlMyPresentation + "/?userId=" + userId,
      onSuccess: myPresentationReceived.type,
    })
  );
};

const urlSubjectValuation = "/subject-valuation";

export const loadSubjectValuation = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubject + "/" + subjectId + urlSubjectValuation,
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
      url: urlAdmin + urlSubject + "/" + subjectId + urlSubjectValuation,
      onSuccess: subjectValuationReceived.type,
    })
  );
};

const urlAdmin = "/admin";
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

export const clearAttendancePasswordError = () => (dispatch) => {
  dispatch({ type: attendancePasswordErrorCleared.type, payload: "" });
};

// Selectors
export const getAttendance = (state) => state.features.student.home.attendances;
export const getAttendanceErrorPassword = (state) =>
  state.features.student.home.attendanceErrorPassword;
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
export const getPresentationWeight = (state) =>
  state.features.student.home.presentationWeight;
export const getAttendanceWeight = (state) =>
  state.features.student.home.attendanceWeight;
export const getCommentsWeight = (state) =>
  state.features.student.home.commentsWeight;
