import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan /*studentDetailCleared*/ } from "../../../app/actions";
//import { subjectsLoaded } from "../subjects/subjectsSlice";
//const subjectsLoaded = createAction("subjectsLoaded");

export const slice = createSlice({
  name: "studentDetail",
  initialState: {
    student: null, // {id: "", first_name: "", last_name: "", email: "" ...}
    attendances: null, // []
    bonuses: null, // []
    myPresentation: null, // { presentation: null, presentationWeight: null }, // presentation is {}
    subjectValuation: null, // object
    presentationWeight: null,
    attendanceWeight: null,
    commentsWeight: null,
  },
  reducers: {
    studentReceived: (state, action) => {
      state.student = action.payload;
    },
    studentRequestFailed: () => {},
    attendancesReceived: (state, action) => {
      state.attendances = [];
      for (const attendance of action.payload) {
        let attendanceCopy = Object.assign({}, attendance);
        delete attendanceCopy.password;
        state.attendances.push(attendanceCopy);
      }
    },
    bonusesReceived: (state, action) => {
      state.bonuses = action.payload;
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
    weightReceived: (state, action) => {
      state.presentationWeight = action.payload.presentationWeight.weight;
      state.attendanceWeight = action.payload.attendanceWeight.weight;
      state.commentsWeight = action.payload.commentsWeight.weight;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(studentDetailCleared, (state) => {
  //     console.log(state.student.first_name);
  //     //return { ...this.initialState };
  //   });
  // },
});

export const {
  studentReceived,
  studentRequestFailed,
  attendancesReceived,
  bonusesReceived,
  myPresentationReceived,
  subjectValuationReceived,
  weightReceived,
} = slice.actions;

export default slice.reducer;

// Action Creators
const urlAdminSubject = "/admin/subject";
const urlUser = "/user";

export const loadStudent = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId + urlUser + "/" + userId,
      onSuccess: studentReceived.type,
      onError: studentRequestFailed.type,
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

const urlSubject = "/subject";
const urlWeight = "/weight";
export const loadSubjectWeight = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlSubject + "/" + subjectId + urlWeight,
      onSuccess: weightReceived.type,
    })
  );
};

export const getStudent = (state) => state.features.admin.studentDetail.student;
export const getAttendance = (state) =>
  state.features.admin.studentDetail.attendances;
export const getBonuses = (state) => state.features.admin.studentDetail.bonuses;
export const getMyPresentation = (state) =>
  state.features.admin.studentDetail.myPresentation;
export const getSubjectValuation = (state) =>
  state.features.admin.studentDetail.subjectValuation;
export const getPresentationWeight = (state) =>
  state.features.admin.studentDetail.presentationWeight;
export const getAttendanceWeight = (state) =>
  state.features.admin.studentDetail.attendanceWeight;
export const getCommentsWeight = (state) =>
  state.features.admin.studentDetail.commentsWeight;
