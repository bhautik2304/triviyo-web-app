import { createSlice } from "@reduxjs/toolkit";
import { fetchUserBooking } from "../thunk/userBooking";

const initialState = {
  upcomeing: [],
  canceled: [],
  completed: [],
  loadingState: true,
  progress: 20,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserBooking.fulfilled, (state, action) => {
      state.upcomeing = action.payload.upcomeing;
      state.canceled = action.payload.canceled;
      state.completed = action.payload.completed;
      state.loadingState = false;
      state.progress = 100;
    });
    builder.addCase(fetchUserBooking.pending, (state, action) => {
      state.loadingState = true;
      state.progress = 40;
    });
    builder.addCase(fetchUserBooking.rejected, (state, action) => {
      state.loadingState = true;
      state.progress = 100;
    });
  },
});

export const {} = UserSlice.actions;

export default UserSlice.reducer;
