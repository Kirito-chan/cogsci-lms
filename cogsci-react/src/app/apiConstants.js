import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
export const studentDetailCleared = createAction("studentsCleared");
export const resetState = createAction("USER_LOGOUT");
