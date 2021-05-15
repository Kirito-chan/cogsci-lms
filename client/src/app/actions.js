import { createAction } from "@reduxjs/toolkit";
import { RESET_STATE } from "../constants";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

export const resetState = createAction(RESET_STATE);
