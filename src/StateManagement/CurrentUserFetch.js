import { createSlice } from "@reduxjs/toolkit";

const CurrentUserSlice = createSlice({
    name: "UserDetails",
    initialState: {
        // VARIABLE(STATE) THAT WOULD BE AVAILABLE ACROSS ALL COMPONENT
        isFetching: false,
        UserDetails: null,
        fetchErr: ""
    },
    // FUNCTION THAT WILL CHANGE THE VARIABLE
    reducers: {
        fetchStart : (state) => {
            state.isFetching = true;
            state.UserDetails = null;
            state.fetchErr = ""
        },
        fetchSuccess : (state, action) => {
            state.isFetching = false;
            state.UserDetails = action.payload;
            state.fetchErr = ""
        },
        fetchFailed : (state, action) => {
            state.isFetching = false;
            state.UserDetails = null;
            state.fetchErr = action.payload
        }
    }
})

export const {fetchStart, fetchSuccess, fetchFailed} = CurrentUserSlice.actions
export default CurrentUserSlice.reducer