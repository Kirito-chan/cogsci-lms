import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/actions";

export const slice = createSlice({
  name: "subjects",
  initialState: {
    currentSubject: null,
    currentSubjectId: null,
    currentSubjectName: null,
    currentSubjectStatus: null,
    currentSubjectNumOfWeeks: null,
    currentSubjectNumOfBonuses: null,
    subjects: null,
  },
  reducers: {
    subjectsRequested: () => {},
    subjectsReceived: (state, action) => {
      state.subjects = action.payload;
    },
    subjectInserted: () => {},
    subjectsRequestFailed: () => {},
    currentSubjectIdReceived: (state, action) => {
      state.currentSubjectId = action.payload;
    },
    subjectReceived: (state, action) => {
      state.currentSubjectId = action.payload.id;
      state.currentSubjectName = action.payload.name;
      state.currentSubjectStatus = action.payload.status;
      state.currentSubject = action.payload;
      state.currentSubjectNumOfWeeks = action.payload.weeks;
      state.currentSubjectNumOfBonuses = action.payload.bonuses;
    },
    clearedCurrentSubject: (state) => {
      state.currentSubjectId = null;
      state.currentSubjectName = null;
      state.currentSubjectStatus = null;
    },
    subjectStatusChanged: () => {},
    subjectUpdated: () => {},
    subjectsLoaded: () => {},
  },
});

export const {
  subjectsRequested,
  subjectsReceived,
  subjectsRequestFailed,
  subjectReceived,
  clearedCurrentSubject,
  currentSubjectIdReceived,
  subjectInserted,
  subjectStatusChanged,
  subjectUpdated,
  subjectsLoaded,
} = slice.actions;

export default slice.reducer;

// Action Creators

const urlAdminSubject = "/admin/subject";

// prettier-ignore

export const loadSubjects = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject,
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

export const insertSubject =
  (name, year, season, about, userLimit, weeks, active) => (dispatch) => {
    const data = { name, year, season, about, userLimit, weeks, active };
    return dispatch(
      apiCallBegan({
        url: urlAdminSubject,
        method: "post",
        data,
        onSuccess: subjectInserted.type,
      })
    );
  };

export const updateSubject =
  (
    subjectId,
    name,
    year,
    season,
    about,
    userLimit,
    weeks,
    numOfBonuses,
    active,
    subjectValPres,
    subjectValAttendance,
    subjectValComment
  ) =>
  (dispatch) => {
    const data = {
      name,
      year,
      season,
      about,
      userLimit,
      weeks,
      numOfBonuses,
      active,
      subjectValPres,
      subjectValAttendance,
      subjectValComment,
    };

    return dispatch(
      apiCallBegan({
        url: urlAdminSubject + "/" + subjectId,
        method: "put",
        data,
        onSuccess: subjectUpdated.type,
      })
    );
  };

export const updateSubjectStatus = (subjectId, status) => (dispatch) => {
  const data = { status };
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId,
      method: "patch",
      data,
      onSuccess: subjectStatusChanged.type,
    })
  );
};

export const loadCurrentSubjectId = (subjectId) => (dispatch) => {
  return dispatch({ type: currentSubjectIdReceived.type, payload: subjectId });
};

export const clearCurrentSubject = () => (dispatch) => {
  dispatch({ type: clearedCurrentSubject.type });
};
export const loadSubjectsAndClear = () => (dispatch) => {
  dispatch({ type: subjectsLoaded.type });
};

export const getSubjects = (state) => state.features.admin.subjects.subjects;
export const getCurrentSubject = (state) =>
  state.features.admin.subjects.currentSubject;
export const getCurrentSubjectId = (state) =>
  state.features.admin.subjects.currentSubjectId;
export const getCurrentSubjectName = (state) =>
  state.features.admin.subjects.currentSubjectName;
export const getCurrentSubjectStatus = (state) =>
  state.features.admin.subjects.currentSubjectStatus;
export const getCurrentSubjectNumOfWeeks = (state) =>
  state.features.admin.subjects.currentSubjectNumOfWeeks;
export const getCurrentSubjectNumOfBonuses = (state) =>
  state.features.admin.subjects.currentSubjectNumOfBonuses;
