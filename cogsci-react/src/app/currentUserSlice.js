import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'currentUser',
    initialState: {
        id: 346
    },
    reducers: {}
});

export default slice.reducer
// Selectors
export const getCurrentUser = state => state.currentUser.id