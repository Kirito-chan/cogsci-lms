import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../../app/actions";
import {
  STUD_PRES_CLOSED,
  STUD_PRES_OPENED,
  STUD_PRES_NEUTRAL,
} from "../../../constants";

export const slice = createSlice({
  name: "home",
  initialState: {
    attendances: null,
    overallAttendance: null, // [ {student: {}, attendance: [ {}, {}, ...] }, ...]
    overallBonuses: null, // [ {student: {}, bonuses: [ {}, {}, ...] }, ... ]
    teacherPresentations: null, // []
    studentPresentationsNeutral: null, // []   prezentacie prijate na ucitelov feedback, este nezobrazene pre studentov
    studentPresentationsOpened: null, // []
    studentPresentationsClosed: null, // []
    pendingStudents: null,
    acceptedStudents: null,
    rejectedStudents: null,
    uploadedPresentation: null,
    studentEmails: null, // []
  },
  reducers: {
    teacherPresentationsReceived: (state, action) => {
      state.teacherPresentations = action.payload;
    },
    studentPresentationsNeutralReceived: (state, action) => {
      state.studentPresentationsNeutral = action.payload;
    },
    studentPresentationsOpenedReceived: (state, action) => {
      state.studentPresentationsOpened = action.payload;
    },
    studentPresentationsClosedReceived: (state, action) => {
      state.studentPresentationsClosed = action.payload;
    },
    uploadedPresentationReceived: (state) => {
      state.uploadedPresentation = true;
    },
    insertedBonus: () => {},
    userEmailsAndNamesReceived: (state, action) => {
      state.studentEmails = action.payload;
    },
    emailSent: () => {},
    pendingStudentsReceived: (state, action) => {
      state.pendingStudents = action.payload;
    },
    acceptedStudentsReceived: (state, action) => {
      state.acceptedStudents = action.payload;
    },
    rejectedStudentsReceived: (state, action) => {
      state.rejectedStudents = action.payload;
    },
    updatedStudentStatus: () => {},
    attendancesReceived: (state, action) => {
      state.attendances = action.payload;
    },
    updatedAttendanceStatus: () => {},
    newAttendanceAdded: () => {},
    studentsAttendanceReceived: (state, action) => {
      state.overallAttendance = action.payload;
    },
    studentsAttendanceUpdated: () => {},
    studentsBonusesReceived: (state, action) => {
      state.overallBonuses = action.payload;
    },
    studentsBonusesUpdated: () => {},
  },
});

export const {
  teacherPresentationsReceived,
  studentPresentationsNeutralReceived,
  studentPresentationsOpenedReceived,
  studentPresentationsClosedReceived,
  uploadedPresentationReceived,
  insertedBonus,
  userEmailsAndNamesReceived,
  emailSent,
  pendingStudentsReceived,
  acceptedStudentsReceived,
  rejectedStudentsReceived,
  updatedStudentStatus,
  attendancesReceived,
  updatedAttendanceStatus,
  newAttendanceAdded,
  studentsAttendanceReceived,
  studentsAttendanceUpdated,
  studentsBonusesReceived,
  studentsBonusesUpdated,
} = slice.actions;

export default slice.reducer;

// Action Creators
const urlAdminSubject = "/admin/subject";

const urlAttendance = "/attendance";

export const addnewAttendance = (subjectId, date, password) => (dispatch) => {
  const data = { date, password };
  return dispatch(
    apiCallBegan({
      method: "post",
      url: urlAdminSubject + "/" + subjectId + urlAttendance,
      data,
      onSuccess: newAttendanceAdded.type,
    })
  );
};

export const loadAttendance = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId + urlAttendance,
      onSuccess: attendancesReceived.type,
    })
  );
};

export const updateAttendanceStatus =
  (subjectId, attendanceId, status) => (dispatch) => {
    const data = { status };
    return dispatch(
      apiCallBegan({
        method: "patch",
        data,
        url:
          urlAdminSubject +
          "/" +
          subjectId +
          urlAttendance +
          "/" +
          attendanceId,
        onSuccess: updatedAttendanceStatus.type,
      })
    );
  };

const urlStudents = "/student";

export const loadPendingStudents = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId + urlStudents + "/?status=pending",
      onSuccess: pendingStudentsReceived.type,
    })
  );
};

export const loadAcceptedStudents = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url:
        urlAdminSubject + "/" + subjectId + urlStudents + "/?status=accepted",
      onSuccess: acceptedStudentsReceived.type,
    })
  );
};

export const loadRejectedStudents = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url:
        urlAdminSubject + "/" + subjectId + urlStudents + "/?status=rejected",
      onSuccess: rejectedStudentsReceived.type,
    })
  );
};

export const updateStudentStatus =
  (subjectId, studentId, status) => (dispatch) => {
    const data = { status };
    return dispatch(
      apiCallBegan({
        method: "put",
        url: urlAdminSubject + "/" + subjectId + urlStudents + "/" + studentId,
        data,
        onSuccess: updatedStudentStatus.type,
      })
    );
  };

const urlEmail = "/email";

export const loadUserEmailsAndNames = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId + urlEmail,
      onSuccess: userEmailsAndNamesReceived.type,
    })
  );
};

const urlOverallAttendance = "/overall-attendance";

export const loadStudentsAndAttendance = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId + urlOverallAttendance,
      onSuccess: studentsAttendanceReceived.type,
    })
  );
};

export const updateStudentsAndAttendance =
  (subjectId, checkedAttendances) => (dispatch) => {
    const data = { checkedAttendances };
    return dispatch(
      apiCallBegan({
        method: "put",
        url: urlAdminSubject + "/" + subjectId + urlOverallAttendance,
        data,
        onSuccess: studentsAttendanceUpdated.type,
      })
    );
  };

const urlOverallBonuses = "/overall-bonuses";

export const loadStudentsAndBonuses = (subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: urlAdminSubject + "/" + subjectId + urlOverallBonuses,
      onSuccess: studentsBonusesReceived.type,
    })
  );
};

export const updateStudentsAndBonuses =
  (subjectId, checkedBonuses) => (dispatch) => {
    const data = { checkedBonuses };
    return dispatch(
      apiCallBegan({
        method: "put",
        url: urlAdminSubject + "/" + subjectId + urlOverallBonuses,
        data,
        onSuccess: studentsBonusesUpdated.type,
      })
    );
  };

const urlAdminSendEmail = "/admin/send-email";

export const sendEmail =
  (fromEmail, toEmail, fromName, subject, text) => (dispatch) => {
    const data = { toEmail, fromEmail, fromName, subject, text };
    return dispatch(
      apiCallBegan({
        url: urlAdminSendEmail,
        method: "post",
        data,
        onSuccess: emailSent.type,
      })
    );
  };

const urlBonus = "/bonus";

export const insertBonus =
  (subjectId, title, content, urlRef) => (dispatch) => {
    const data = { title, content, urlRef };

    return dispatch(
      apiCallBegan({
        method: "post",
        data,
        url: urlAdminSubject + "/" + subjectId + urlBonus,
        onSuccess: insertedBonus.type,
      })
    );
  };

const urlTeacherPresentations = "/teacher-presentation";

export const loadTeacherPresentations = (userId, subjectId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url:
        urlTeacherPresentations +
        "/?userId=" +
        userId +
        "&subjectId=" +
        subjectId,
      onSuccess: teacherPresentationsReceived.type,
    })
  );
};

const urlStudentPresentations = "/student-presentation";

export const loadStudentPresentationsNeutral =
  (userId, subjectId) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        // prettier-ignore
        url: urlStudentPresentations + "/?status=" + STUD_PRES_NEUTRAL + "&userId=" + userId + "&subjectId=" + subjectId,
        onSuccess: studentPresentationsNeutralReceived.type,
      })
    );
  };

export const loadStudentPresentationsOpened =
  (userId, subjectId) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        // prettier-ignore
        url: urlStudentPresentations + "/?status=" + STUD_PRES_OPENED + "&userId=" + userId + "&subjectId=" + subjectId,
        onSuccess: studentPresentationsOpenedReceived.type,
      })
    );
  };

export const loadStudentPresentationsClosed =
  (userId, subjectId) => (dispatch) => {
    return dispatch(
      apiCallBegan({
        // prettier-ignore
        url:
        urlStudentPresentations + "/?status=" + STUD_PRES_CLOSED + "&userId=" + userId + "&subjectId=" + subjectId,
        onSuccess: studentPresentationsClosedReceived.type,
      })
    );
  };

// Selectors
export const getTeacherPresentations = (state) =>
  state.features.admin.home.teacherPresentations;
export const getStudentPresentationsNeutral = (state) =>
  state.features.admin.home.studentPresentationsNeutral;
export const getStudentPresentationsOpened = (state) =>
  state.features.admin.home.studentPresentationsOpened;
export const getStudentPresentationsClosed = (state) =>
  state.features.admin.home.studentPresentationsClosed;
export const getStudentEmailsAndNames = (state) =>
  state.features.admin.home.studentEmails;
export const getPendingStudents = (state) =>
  state.features.admin.home.pendingStudents;
export const getAcceptedStudents = (state) =>
  state.features.admin.home.acceptedStudents;
export const getRejectedStudents = (state) =>
  state.features.admin.home.rejectedStudents;
export const getAttendance = (state) => state.features.admin.home.attendances;
export const getOverallAttendance = (state) =>
  state.features.admin.home.overallAttendance;
export const getOverallBonuses = (state) =>
  state.features.admin.home.overallBonuses;
