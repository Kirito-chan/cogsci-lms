import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/actions";

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
    },
    presentationRequestFailed: () => {},
    commentsRequested: () => {},
    commentsReceived: (state, action) => {
      state.comments = action.payload;
    },
    commentsRequestFailed: () => {},
    commentInserted: () => {},
    commentDeleted: () => {},
    valuationTypesRequested: () => {},
    valuationTypesReceived: (state, action) => {
      state.valuationTypes = action.payload;
    },
    valuationTypesRequestFailed: () => {},
    updatedPresentationStatus: (state, action) => {
      state.presentation.status = action.payload;
    },
    presentationDeleted: () => {},
    presentationEvaluationInserted: () => {},
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
  commentDeleted,
  valuationTypesRequested,
  valuationTypesReceived,
  valuationTypesRequestFailed,
  updatedPresentationStatus,
  presentationDeleted,
  presentationEvaluationInserted,
} = slice.actions;

export default slice.reducer;

// Action Creators

const urlPresentation = "/presentation";
const urlAdminPresentation = "/admin/presentation";
const urlPresentationEvaluation = "/evaluation";

export const insertPresentationEvaluation =
  (subjectId, presentationId, userWhoEvaluatesId, evaluatedUserId, values) =>
  (dispatch) => {
    const data = { values };

    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url:
          "/subject" +
          "/" +
          subjectId +
          urlPresentation +
          "/" +
          presentationId +
          urlPresentationEvaluation +
          "/?userWhoEvaluatesId=" +
          userWhoEvaluatesId +
          "&evaluatedUserId=" +
          evaluatedUserId,
        onSuccess: presentationEvaluationInserted.type,
      })
    );
  };
("/api/subject/:subjectId/presentation/:presentationId/evaluation");

export const loadPresentation = (presentation) => (dispatch) => {
  dispatch({ type: presentationReceived.type, payload: presentation });
};

export const deletePresentation =
  (presentationId, path, subjectId) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        method: "delete",
        url:
          "/admin" +
          "/subject/" +
          subjectId +
          urlPresentation +
          "/" +
          presentationId +
          "/?path=" +
          path,
        onSuccess: presentationDeleted.type,
      })
    );
  };

export const updatePresentationStatus =
  (presentationId, status) => (dispatch) => {
    const data = { status };
    return dispatch(
      apiCallBegan({
        url: urlAdminPresentation + "/" + presentationId,
        method: "patch",
        data,
        onSuccess: updatedPresentationStatus.type,
      })
    );
  };
const urlSubject = "/subject";
// nacita komentare ktore patria ku prezentacii ucitela, cize nenacitava komentare, ktore ucitel napisal
export const loadTeacherComments =
  (presentationId, subjectId) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url:
          urlSubject +
          "/" +
          subjectId +
          urlPresentation +
          "/" +
          presentationId +
          "/teacher/comment",
        onStart: commentsRequested.type,
        onSuccess: commentsReceived.type,
        onError: commentsRequestFailed.type,
      })
    );
  };
// nacita komentare ktore patria ku prezentacii studenta, cize nenacitava komentare, ktore student napisal
export const loadStudentComments =
  (presentationId, subjectId) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        url:
          urlSubject +
          "/" +
          subjectId +
          urlPresentation +
          "/" +
          presentationId +
          "/student/comment",
        onStart: commentsRequested.type,
        onSuccess: commentsReceived.type,
        onError: commentsRequestFailed.type,
      })
    );
  };

export const insertTeacherComment =
  (userId, presentationId, content, refCommentId, subjectId) => (dispatch) => {
    const data = { userId, content, refCommentId };

    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url:
          urlSubject +
          "/" +
          subjectId +
          urlPresentation +
          "/" +
          presentationId +
          "/teacher/comment",
        onSuccess: commentInserted.type,
      })
    );
  };

export const insertStudentComment =
  (userId, presentationId, content, refCommentId, subjectId) => (dispatch) => {
    const data = { userId, content, refCommentId };

    return dispatch(
      apiCallBegan({
        data,
        method: "post",
        url:
          urlSubject +
          "/" +
          subjectId +
          urlPresentation +
          "/" +
          presentationId +
          "/student/comment",
        onSuccess: commentInserted.type,
      })
    );
  };

const urlAdminComment = "/admin/presentation/comment";

export const deleteComment = (commentId, isTeachers) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      method: "delete",
      url: urlAdminComment + "/" + commentId + "/?is_teachers=" + isTeachers,
      onSuccess: commentDeleted.type,
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
export const getPresentation = (state, presentationId, presIsOpened, presIsNeutral, isTeacherPres, isMyPres) => {
  let presentations = null;
  // prettier-ignore
  if (isTeacherPres) {  presentations = state.features.student.home.teacherPresentations;}
  // prettier-ignore
  else if (isMyPres) { presentations = [state.features.student.home.myPresentation]}
  else if (presIsNeutral) {
    presentations = state.features.admin.home.studentPresentationsNeutral;
  }
  else if (presIsOpened) {
    presentations = state.features.student.home.studentPresentationsOpened;
  } else {
    presentations = state.features.student.home.studentPresentationsClosed;
  }
  //prettier-ignore
  
  const presentation = presentations?.filter((studPres) => studPres?.id == presentationId)[0];
  return presentation;
};

export const getPresentationId = (state) =>
  state.features.student.presentation.presentation.id;
export const getComments = (state) =>
  state.features.student.presentation.comments;
export const getValuationTypes = (state) =>
  state.features.student.presentation.valuationTypes;
