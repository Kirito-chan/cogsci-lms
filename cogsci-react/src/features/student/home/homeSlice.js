import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
// import { TIME_TO_WAIT_FOR_FETCHING } from "../../constants";
// import moment from "moment";

export const slice = createSlice({
  name: "home",
  initialState: {
    attendances: [],
    bonuses: [],
    teacherPresentations: [],
    studentPresentations: [],
    myPresentation: [],
    subjectValuation: {},
    loading: false,
    lastFetch: null,
  },
  reducers: {
    allDataRequested: (state) => {
      state.loading = true;
    },
    attendancesReceived: (state, action) => {
      state.attendances = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    bonusesReceived: (state, action) => {
      state.bonuses = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    teacherPresentationsReceived: (state, action) => {
      state.teacherPresentations = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    studentPresentationsReceived: (state, action) => {
      state.studentPresentations = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    myPresentationReceived: (state, action) => {
      state.myPresentation = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    subjectValuationReceived: (state, action) => {
      state.subjectValuation = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    allDataRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  allDataRequested,
  attendancesReceived,
  allDataRequestFailed,
  bonusesReceived,
  teacherPresentationsReceived,
  studentPresentationsReceived,
  myPresentationReceived,
  subjectValuationReceived,
} = slice.actions;

export default slice.reducer;

// Action Creators
// function dataInReduxAreRecent(getState) {
//   const { lastFetch } = getState().features.home;

//   const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
//   if (diffInMinutes < TIME_TO_WAIT_FOR_FETCHING) return true;
//   return false;
// }

const urlAttendance = "/attendance";

export const loadAttendance = (userId, subjectId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlAttendance + "/" + userId + "/" + subjectId,
      onStart: allDataRequested.type,
      onSuccess: attendancesReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlBonuses = "/bonuses";

export const loadBonuses = (userId, subjectId) => (dispatch) => {
  // if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlBonuses + "/" + userId + "/" + subjectId,
      onStart: allDataRequested.type,
      onSuccess: bonusesReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlTeacherPresentations = "/teacher-presentations";

export const loadTeacherPresentations = (userId, subjectId) => (dispatch) => {
  // if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlTeacherPresentations + "/" + userId + "/" + subjectId,
      onStart: allDataRequested.type,
      onSuccess: teacherPresentationsReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlStudentPresentations = "/student-presentations";

export const loadStudentPresentations = (userId, subjectId) => (dispatch) => {
  // if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlStudentPresentations + "/" + userId + "/" + subjectId,
      onStart: allDataRequested.type,
      onSuccess: studentPresentationsReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlMyPresentation = "/my-presentation";

export const loadMyPresentation = (userId, subjectId) => (dispatch) => {
  // if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlMyPresentation + "/" + userId + "/" + subjectId,
      onStart: allDataRequested.type,
      onSuccess: myPresentationReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlSubjectValuation = "/subject-valuation";

export const loadSubjectValuation = (subjectId) => (dispatch) => {
  // if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlSubjectValuation + "/" + subjectId,
      onStart: allDataRequested.type,
      onSuccess: subjectValuationReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

// Selectors
export const getLoading = (state) => state.features.student.home.loading;
export const getAttendance = (state) => state.features.student.home.attendances;
export const getBonuses = (state) => state.features.student.home.bonuses;
export const getTeacherPresentations = (state) =>
  state.features.student.home.teacherPresentations;
export const getStudentPresentations = (state) =>
  state.features.student.home.studentPresentations;
export const getMyPresentation = (state) =>
  state.features.student.home.myPresentation;
export const getSubjectValuation = (state) =>
  state.features.student.home.subjectValuation;
