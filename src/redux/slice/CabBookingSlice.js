import { createSlice } from "@reduxjs/toolkit";
import { fetchCabs } from "../thunk/cab";

const initialState = {
  cabs: [],
  cabsSearch: {},
  totaleKm: 0,
  loading: false,
  error: false,
};

const CabBookingSlice = createSlice({
  name: "Cabs",
  initialState,
  reducers: {
    addSerach: (state, payload) => {
      state.cabsSearch = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCabs.fulfilled, (state, action) => {
      state.cabs = action.payload.cabs_list;
      state.authStatus = true;
      state.loading = true;
      state.totaleKm = Math.round(action.payload.km);
    });
    builder.addCase(fetchCabs.pending, (state, action) => {
      state.authStatus = false;
      state.loading = true;
      state.progress = 40;
    });
    builder.addCase(fetchCabs.rejected, (state, action) => {
      state.authStatus = false;
      state.loading = true;
      state.progress = 100;
    });
  },
});

export const { addSerach } = CabBookingSlice.actions;

export default CabBookingSlice.reducer;
