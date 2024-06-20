import { createSlice } from '@reduxjs/toolkit'
import { fetchAuthUser } from '../thunk/user';

const initialState = {
    authUser: null,
    authStatus: false,
    loadingState: true,
    progress: 20
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
            state.authUser = action.payload
            state.authStatus = true
            state.loadingState = false
            state.progress = 100
        })
        builder.addCase(fetchAuthUser.pending, (state, action) => {
            state.authStatus = false
            state.loadingState = true
            state.progress = 40
        })
        builder.addCase(fetchAuthUser.rejected, (state, action) => {
            state.authStatus = false
            state.loadingState = true
            state.progress = 100
        })
    }
});

export const { } = UserSlice.actions

export default UserSlice.reducer