import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
import { dataInReduxAreRecent } from "../../../components/DateUtils";
import { STUD_PRES_CLOSED, STUD_PRES_OPENED } from "../../../constants";

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
    lastFetch: {
      bonus: null,
      attendance: null,
      teacherPresentations: null,
      studentPresentationsOpened: null,
      studentPresentationsClosed: null,
      myPresentation: null,
      subjectValuation: null,
    },
  },
  reducers: {
    attendancesReceived: (state, action) => {
      state.attendances = action.payload;
      state.lastFetch.attendance = Date.now();
    },
    bonusesReceived: (state, action) => {
      state.bonuses = action.payload;
      state.lastFetch.bonus = Date.now();
    },
    teacherPresentationsReceived: (state, action) => {
      state.teacherPresentations = action.payload;
      state.lastFetch.teacherPresentations = Date.now();
    },
    studentPresentationsOpenedReceived: (state, action) => {
      state.studentPresentationsOpened = action.payload;
      state.lastFetch.studentPresentationsOpened = Date.now();
    },
    studentPresentationsClosedReceived: (state, action) => {
      state.studentPresentationsClosed = action.payload;
      state.lastFetch.studentPresentationsClosed = Date.now();
    },
    myPresentationReceived: (state, action) => {
      state.myPresentation = {
        presentation: action.payload.presentation,
        presentationWeight: action.payload.presentationWeight.weight,
      };
      state.lastFetch.myPresentation = Date.now();
    },
    subjectValuationReceived: (state, action) => {
      state.subjectValuation = action.payload;
      state.lastFetch.subjectValuation = Date.now();
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
} = slice.actions;

export default slice.reducer;

// Action Creators

const urlAttendance = "/attendance";

export const loadAttendance = (userId, subjectId) => (dispatch, getState) => {
  if (
    dataInReduxAreRecent(getState().features.student.home.lastFetch.attendance)
  )
    return;

  return dispatch(
    apiCallBegan({
      url: urlAttendance + "/" + userId + "/" + subjectId,
      onSuccess: attendancesReceived.type,
    })
  );
};

const urlBonuses = "/bonus";

export const loadBonuses = (userId, subjectId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState().features.student.home.lastFetch.bonus))
    return;

  return dispatch(
    apiCallBegan({
      url: urlBonuses + "/?userId=" + userId + "&subjectId=" + subjectId,
      onSuccess: bonusesReceived.type,
    })
  );
};

const urlTeacherPresentations = "/teacher-presentations";

export const loadTeacherPresentations = (userId, subjectId) => (
  dispatch,
  getState
) => {
  if (
    dataInReduxAreRecent(
      getState().features.student.home.lastFetch.teacherPresentations
    )
  )
    return;

  return dispatch(
    apiCallBegan({
      url: urlTeacherPresentations + "/" + userId + "/" + subjectId,
      onSuccess: teacherPresentationsReceived.type,
    })
  );
};

const urlStudentPresentations = "/student-presentations";

export const loadStudentPresentationsOpened = (userId, subjectId) => (
  dispatch,
  getState
) => {
  if (
    dataInReduxAreRecent(
      getState().features.student.home.lastFetch.studentPresentationsOpened
    )
  )
    return;

  return dispatch(
    apiCallBegan({
      // prettier-ignore
      url: urlStudentPresentations + "/" + userId + "/" + subjectId + "/?status=" + STUD_PRES_OPENED,
      onSuccess: studentPresentationsOpenedReceived.type,
    })
  );
};

export const loadStudentPresentationsClosed = (userId, subjectId) => (
  dispatch,
  getState
) => {
  if (
    dataInReduxAreRecent(
      getState().features.student.home.lastFetch.studentPresentationsClosed
    )
  )
    return;

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

export const loadMyPresentation = (userId, subjectId) => (
  dispatch,
  getState
) => {
  if (
    dataInReduxAreRecent(
      getState().features.student.home.lastFetch.myPresentation
    )
  )
    return;

  return dispatch(
    apiCallBegan({
      url: urlMyPresentation + "/" + userId + "/" + subjectId,
      onSuccess: myPresentationReceived.type,
    })
  );
};

const urlSubjectValuation = "/subject-valuation";

export const loadSubjectValuation = (subjectId) => (dispatch, getState) => {
  if (
    dataInReduxAreRecent(
      getState().features.student.home.lastFetch.subjectValuation
    )
  )
    return;

  return dispatch(
    apiCallBegan({
      url: urlSubjectValuation + "/" + subjectId,
      onSuccess: subjectValuationReceived.type,
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
