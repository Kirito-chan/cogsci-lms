import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from "../../app/apiConstants"
import {TIME_TO_WAIT_FOR_FETCHING} from '../../constants'
import moment from 'moment'

export const slice = createSlice({
  name: 'homeStudent',
  initialState: {
    attendances: [],
    homeworks: [],
    teacherPres: [],
    studentPres: [],
    myPres: {},
    grade: {},
    loading: false,
    lastFetch: null
  },
  reducers: {
    allDataRequested: state => {
      state.loading = true
    },
    allDataReceived: (state, action) => {
      state.attendances = action.payload
      state.loading = false
      state.lastFetch = Date.now()
    },
    allDataRequestFailed: state => {
        state.loading = false
    },
    
  },
});

export const { allDataRequested, allDataReceived, allDataRequestFailed } = slice.actions;

export default slice.reducer;

// Action Creators
const urlAttendance = "/attendance"

export const loadAttendance = userId => (dispatch, getState) => {
    const { lastFetch } = getState().features.homeStudent

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
    if (diffInMinutes < TIME_TO_WAIT_FOR_FETCHING) return;
    
        return dispatch(
            apiCallBegan({
                url: urlAttendance + "/" + userId,
                onStart: allDataRequested.type,
                onSuccess: allDataReceived.type,
                onError: allDataRequestFailed.type
            })
        )
}

// Selectors
export const selectAttendance = state => state.features.homeStudent.attendances
export const getLoading = state => state.features.homeStudent.loading
