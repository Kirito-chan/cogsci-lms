import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/apiConstants";
import { loadBonuses } from "../home/homeSlice";

export const slice = createSlice({
  name: "bonus",
  initialState: {
    bonus: {},
    comments: [],
  },
  reducers: {
    bonusRequested: () => {},
    bonusReceived: (state, action) => {
      state.bonus = action.payload;
    },
    bonusRequestFailed: () => {},
    bonusInfoUpdated: () => {},
    bonusValuatedUpdated: () => {},
    bonusDeleted: () => {},
    commentsRequested: () => {},
    commentsReceived: (state, action) => {
      state.comments = action.payload;
    },
    commentInserted: () => {},
    commentsRequestFailed: () => {},
    commentDeleted: () => {},
  },
});

export const {
  bonusRequested,
  bonusReceived,
  bonusRequestFailed,
  bonusInfoUpdated,
  bonusValuatedUpdated,
  bonusDeleted,
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentInserted,
  commentDeleted,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadBonus = (userId, subjectId) => (dispatch) => {
  return dispatch(loadBonuses(userId, subjectId));
};

const urlBonusAdmin = "/admin/bonus";

export const updateBonusValuated = (bonusId, commentId, valuated) => (
  dispatch
) => {
  const data = { valuated };
  return dispatch(
    apiCallBegan({
      url: urlBonusAdmin + "/" + bonusId + "/comment/" + commentId,
      method: "patch",
      data,
      onSuccess: bonusValuatedUpdated.type,
    })
  );
};

export const updateBonusInfo = (
  bonusId,
  title,
  content,
  videoURL,
  isFocusingURL
) => (dispatch) => {
  const data = { title, content, videoURL, isFocusingURL };

  return dispatch(
    apiCallBegan({
      data,
      method: "put",
      url: urlBonusAdmin + "/" + bonusId,
      onSuccess: bonusInfoUpdated.type,
    })
  );
};

export const deleteBonus = (bonusId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      method: "delete",
      url: urlBonusAdmin + "/" + bonusId,
      onSuccess: bonusDeleted.type,
    })
  );
};

const urlBonus = "/bonus";

export const loadComments = (bonusId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlBonus + "/" + bonusId + "/comment",
      onStart: commentsRequested.type,
      onSuccess: commentsReceived.type,
      onError: commentsRequestFailed.type,
    })
  );
};

export const insertComment = (userId, bonusId, content, refCommentId) => (
  dispatch
) => {
  const data = { userId, content, refCommentId };

  return dispatch(
    apiCallBegan({
      data,
      method: "post",
      url: urlBonus + "/" + bonusId + "/comment",
      onSuccess: commentInserted.type,
    })
  );
};

const urlAdminComment = "/admin/comment";

export const deleteComment = (commentId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      method: "delete",
      url: urlAdminComment + "/" + commentId,
      onSuccess: commentDeleted.type,
    })
  );
};

export const getBonus = (state, bonusId) => {
  const bonuses = state.features.student.home.bonuses;
  if (bonuses === null || bonuses === undefined) return null;
  const bonusOrderNumber =
    bonuses?.length - bonuses?.findIndex((bonusik) => bonusik.id == bonusId);
  const bonus = bonuses?.filter((bonusik) => bonusik.id == bonusId)[0];

  return { ...bonus, orderNumber: bonusOrderNumber };
};

export const getBonusId = (state) => state.features.student.bonus.bonus.id;
export const getComments = (state) => state.features.student.bonus.comments;
