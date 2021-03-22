import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";

export const slice = createSlice({
  name: "presentation",
  initialState: {
    presentation: {},
    comments: [],
    valuationTypes: [],
  },
  reducers: {
    presentationRequested: () => {},
    presentationReceived: (state, action) => {
      state.presentation = action.payload;
      state.loading = false;
    },
    presentationRequestFailed: () => {},

    commentsRequested: () => {},
    commentsReceived: (state, action) => {
      state.comments = action.payload;
      console.log();
    },
    commentsRequestFailed: () => {},
    commentInserted: () => {},
    valuationTypesRequested: () => {},
    valuationTypesReceived: (state, action) => {
      state.valuationTypes = action.payload;
    },
    valuationTypesRequestFailed: () => {},
  },
});

export const {
  presentationRequested,
  presentationReceived,
  presentationRequestFailed,
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentInserted,
  valuationTypesRequested,
  valuationTypesReceived,
  valuationTypesRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadPresentation = (presentation) => (dispatch) => {
  dispatch({ type: presentationReceived.type, payload: presentation });
};

const urlPresentation = "/presentation";

// nacita komentare ktore patria ku prezentacii ucitela, cize nenacitava komentare, ktore ucitel napisal
export const loadTeacherComments = (presentationId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlPresentation + "/" + presentationId + "/teacher/comment",
      onStart: commentsRequested.type,
      onSuccess: commentsReceived.type,
      onError: commentsRequestFailed.type,
    })
  );
};
// nacita komentare ktore patria ku prezentacii studenta, cize nenacitava komentare, ktore student napisal
export const loadStudentComments = (presentationId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlPresentation + "/" + presentationId + "/student/comment",
      onStart: commentsRequested.type,
      onSuccess: commentsReceived.type,
      onError: commentsRequestFailed.type,
    })
  );
};

export const insertTeacherComment = (
  userId,
  presentationId,
  content,
  refCommentId
) => (dispatch) => {
  const data = { userId, content, refCommentId };

  return dispatch(
    apiCallBegan({
      data,
      method: "post",
      url: urlPresentation + "/" + presentationId + "/teacher/comment",
      onSuccess: commentInserted.type,
    })
  );
};

export const insertStudentComment = (
  userId,
  presentationId,
  content,
  refCommentId
) => (dispatch) => {
  const data = { userId, content, refCommentId };

  return dispatch(
    apiCallBegan({
      data,
      method: "post",
      url: urlPresentation + "/" + presentationId + "/student/comment",
      onSuccess: commentInserted.type,
    })
  );
};

const urlValuationTypes = "/presentation/valuation-types";

export const loadValuationTypes = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlValuationTypes + "/?subjectId=" + subjectId,
      onStart: valuationTypesRequested.type,
      onSuccess: valuationTypesReceived.type,
      onError: valuationTypesRequestFailed.type,
    })
  );
};
// prettier-ignore
export const getPresentation = (state, presentationId, presIsOpened, isTeacherPres, isMyPres) => {
  let presentations = null;
  // prettier-ignore
  if (isTeacherPres) { presentations = state.features.student.home.teacherPresentations;}
  // prettier-ignore
  else if (isMyPres) { presentations = [state.features.student.home.myPresentation.presentation]}
  else if (presIsOpened) {
    presentations = state.features.student.home.studentPresentationsOpened;
  } else {
    presentations = state.features.student.home.studentPresentationsClosed;
  }
  //prettier-ignore
  const presentation = presentations?.filter((studPres) => studPres.id == presentationId)[0];
  return presentation;
};

export const getPresentationId = (state) =>
  state.features.student.presentation.presentation.id;
export const getComments = (state) =>
  state.features.student.presentation.comments;
export const getValuationTypes = (state) =>
  state.features.student.presentation.valuationTypes;
