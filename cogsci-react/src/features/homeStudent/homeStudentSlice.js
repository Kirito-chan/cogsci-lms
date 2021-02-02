import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../app/apiConstants";
import { TIME_TO_WAIT_FOR_FETCHING } from "../../constants";
import moment from "moment";

export const slice = createSlice({
  name: "homeStudent",
  initialState: {
    attendances: [],
    homeworks: [],
    teacherPresentations: [],
    studentPresentations: [],
    myPres: {},
    grade: {},
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
    homeworksReceived: (state, action) => {
      state.homeworks = action.payload;
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
    allDataRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  allDataRequested,
  attendancesReceived,
  allDataRequestFailed,
  homeworksReceived,
  teacherPresentationsReceived,
  studentPresentationsReceived,
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

const urlHomeworks = "/homeworks";

export const loadHomeworks = (userId) => (dispatch, getState) => {
  if (dataInReduxAreRecent(getState)) return;

  return dispatch(
    apiCallBegan({
      url: urlHomeworks + "/" + userId,
      onStart: allDataRequested.type,
      onSuccess: homeworksReceived.type,
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

// Selectors
export const getLoading = (state) => state.features.homeStudent.loading;
export const getAttendance = (state) => state.features.homeStudent.attendances;
export const getHomeworks = (state) => state.features.homeStudent.homeworks;
export const getTeacherPresentations = (state) =>
  state.features.homeStudent.teacherPresentations;
export const getStudentPresentations = (state) =>
  state.features.homeStudent.studentPresentations;
