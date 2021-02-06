import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../app/apiConstants";
import { TIME_TO_WAIT_FOR_FETCHING } from "../../constants";
import moment from "moment";

export const slice = createSlice({
  name: "homeStudent",
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
function dataInReduxAreRecent(getState) {
  const { lastFetch } = getState().features.homeStudent;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < TIME_TO_WAIT_FOR_FETCHING) return true;
  return false;
}

const urlAttendance = "/attendance";

export const loadAttendance = (userId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlAttendance + "/" + userId,
      onStart: allDataRequested.type,
      onSuccess: attendancesReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlBonuses = "/bonuses";

export const loadBonuses = (userId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlBonuses + "/" + userId,
      onStart: allDataRequested.type,
      onSuccess: bonusesReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlTeacherPresentations = "/teacher-presentations";

export const loadTeacherPresentations = (userId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlTeacherPresentations + "/" + userId,
      onStart: allDataRequested.type,
      onSuccess: teacherPresentationsReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlStudentPresentations = "/student-presentations";

export const loadStudentPresentations = (userId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlStudentPresentations + "/" + userId,
      onStart: allDataRequested.type,
      onSuccess: studentPresentationsReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlMyPresentation = "/my-presentation";

export const loadMyPresentation = (userId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlMyPresentation + "/" + userId,
      onStart: allDataRequested.type,
      onSuccess: myPresentationReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

const urlSubjectValuation = "/subject-valuation";

export const loadSubjectValuation = () => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlSubjectValuation,
      onStart: allDataRequested.type,
      onSuccess: subjectValuationReceived.type,
      onError: allDataRequestFailed.type,
    })
  );
};

// Selectors
export const getLoading = (state) => state.features.homeStudent.loading;
export const getAttendance = (state) => state.features.homeStudent.attendances;
export const getBonuses = (state) => state.features.homeStudent.bonuses;
export const getTeacherPresentations = (state) =>
  state.features.homeStudent.teacherPresentations;
export const getStudentPresentations = (state) =>
  state.features.homeStudent.studentPresentations;
export const getMyPresentation = (state) =>
  state.features.homeStudent.myPresentation;
export const getSubjectValuation = (state) =>
  state.features.homeStudent.subjectValuation;
