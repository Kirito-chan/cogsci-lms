import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
//import { dataInReduxAreRecent } from "../../../components/DateUtils";

export const slice = createSlice({
  name: "presentation",
  initialState: {
    presentation: {},
    comments: [],
    valuationTypes: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    presentationRequested: (state) => {
      state.loading = true;
    },
    presentationReceived: (state, action) => {
      state.presentation = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
    },
    presentationRequestFailed: (state) => {
      state.loading = false;
    },

    commentsRequested: (state) => {
      state.loading = true;
    },
    commentsReceived: (state, action) => {
      state.comments = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
    },
    commentsRequestFailed: (state) => {
      state.loading = false;
    },
    valuationTypesRequested: (state) => {
      state.loading = true;
    },
    valuationTypesReceived: (state, action) => {
      state.valuationTypes = action.payload;
      state.lastFetch = Date.now();
      state.loading = false;
    },
    valuationTypesRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  presentationRequested,
  presentationReceived,
  presentationRequestFailed,
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  valuationTypesRequested,
  valuationTypesReceived,
  valuationTypesRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadPresentation = (presentation) => (dispatch) => {
  //if (dataInReduxAreRecent(getState().features.student.presentation.lastFetch)) return;
  dispatch({ type: presentationReceived.type, payload: presentation });
};

const urlComment = "/presentation/comment";

export const loadComments = (presentationId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState().features.student.presentation.lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: urlComment + "/?presentationId=" + presentationId,
      onStart: commentsRequested.type,
      onSuccess: commentsReceived.type,
      onError: commentsRequestFailed.type,
    })
  );
};

const urlValuationTypes = "/presentation/valuation-types";

export const loadValuationTypes = (subjectId) => (dispatch) => {
  //if (dataInReduxAreRecent(getState().features.student.presentation.lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: urlValuationTypes + "/?subjectId=" + subjectId,
      onStart: valuationTypesRequested.type,
      onSuccess: valuationTypesReceived.type,
      onError: valuationTypesRequestFailed.type,
    })
  );
};

export const getPresentation = (state) =>
  state.features.student.presentation.presentation;
export const getPresentationId = (state) =>
  state.features.student.presentation.presentation.id;
export const getComments = (state) =>
  state.features.student.presentation.comments;
export const getValuationTypes = (state) =>
  state.features.student.presentation.valuationTypes;
