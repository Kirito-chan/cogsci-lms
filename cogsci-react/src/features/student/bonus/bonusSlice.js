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
    bonusDeleted: () => {},
    commentsRequested: () => {},
    commentsReceived: (state, action) => {
      state.comments = action.payload;
    },
    commentInserted: () => {},
    commentsRequestFailed: () => {},
  },
});

export const {
  bonusRequested,
  bonusReceived,
  bonusRequestFailed,
  bonusInfoUpdated,
  bonusDeleted,
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentInserted,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadBonus = (userId, subjectId) => (dispatch) => {
  return dispatch(loadBonuses(userId, subjectId));
};

const urlBonusAdmin = "/admin/bonus";

export const updateBonusInfo = (bonusId, title, content, videoURL) => (
  dispatch
) => {
  const data = { title, content, videoURL };

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

const urlComment = "/comment";

export const loadComments = (bonusId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlComment + "/?bonusId=" + bonusId,
      onStart: commentsRequested.type,
      onSuccess: commentsReceived.type,
      onError: commentsRequestFailed.type,
    })
  );
};

export const insertComment = (userId, bonusId, content, refCommentId) => (
  dispatch
) => {
  const data = { userId, bonusId, content, refCommentId };

  return dispatch(
    apiCallBegan({
      data,
      method: "post",
      url: urlComment,
      onSuccess: commentInserted.type,
    })
  );
};

export const getBonus = (state, bonusId) => {
  const bonuses = state.features.student.home.bonuses;
  const bonusOrderNumber =
    bonuses?.length - bonuses?.findIndex((bonusik) => bonusik.id == bonusId);
  const bonus = bonuses?.filter((bonusik) => bonusik.id == bonusId)[0];
  return { ...bonus, orderNumber: bonusOrderNumber };
};

export const getBonusId = (state) => state.features.student.bonus.bonus.id;
export const getComments = (state) => state.features.student.bonus.comments;
