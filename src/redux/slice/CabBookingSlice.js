import { createSlice } from "@reduxjs/toolkit";
import { fetchCabs } from "../thunk/cab";

const oneWay = {
  tripType: "One Way",
  fromCity: {},
  toCity: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
  intlFlow: false,
  returnDate: "",
  dropTime: "",
};

const roundTrip = {
  tripType: "Round Trip",
  fromCity: {},
  toCity: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
  intlFlow: false,
  returnDate: "",
  dropTime: "",
};

const airportTransfer = {
  tripType: "Airport Trip",
  airport: {},
  toDestination: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
};

const hourlyRentals = {
  tripType: "Hourly Rentals",
  fromCity: {},
  package_id: null,
  pickupDate: "",
  pickupTime: "",
};

const initialState = {
  cabs: [],
  cabsSearch: {},
  totaleKm: 0,
  loading: false,
  error: false,
};

const cabBookingSlice = createSlice({
  name: "Cabs",
  initialState,
  reducers: {
    addSerach: (state, action) => {
      state.cabsSearch[action.payload.key] = action.payload.value;
    },
    changeTripData: (state, action) => {
      state.cabsSearch = action.payload;
    },
    emptyCabList: (state, action) => {
      state.cabs = [];
      state.totaleKm = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCabs.fulfilled, (state, action) => {
      state.cabs = action.payload.cabs_list;
      state.loading = true;
      state.totaleKm = Math.round(action.payload.km);
    });
    builder.addCase(fetchCabs.pending, (state, action) => {
      state.loading = false;
      state.progress = 40;
    });
    builder.addCase(fetchCabs.rejected, (state, action) => {
      state.loading = true;
      state.error = true;
      state.progress = 100;
    });
  },
});

export const { addSerach, changeTripData, emptyCabList } =
  CabBookingSlice.actions;

export default CabBookingSlice.reducer;
