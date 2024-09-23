import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickupAddress: {},
  dropAddress: {},
  cabDetaild: {},
  pickupTime: null,
  pickupDate: null,
  returnPickupTime: null,
  returnPickupDate: null,
  stopOver: [],
  stop: [],
  totleKm: 0,
  extraluggage: false,
  extraluggagePrice: 0,
  travellerInfo: {},
  userId: null,
  travellerDetaild: null,
  bookingState: {
    pickupLocation: false,
    dropLocation: false,
    validNumber: false,
  },
  payment: {
    paymentType: "HALF",
    paymentAmmount: 0,
    fare: {},
  },
};

const bookingSlice = createSlice({
  name: "Booking Slice",
  initialState,
  reducers: {
    completePickupLocation: (state, action) => {
      state.bookingState.pickupLocation = true;
    },
    completeDropLocation: (state, action) => {
      state.bookingState.dropLocation = true;
    },
    changeBookingDetaild: (state, action) => {
      state[action.payload.key] = action.payload.val;
    },
    changePaymentMode: (state, action) => {
      state.payment.paymentType = action.payload.paymentType;
      state.payment.paymentAmmount = action.payload.ammount;
      state.payment.fare = action.payload.fare;
    },
  },
});

export const {
  completePickupLocation,
  completeDropLocation,
  changeBookingDetaild,
  changePaymentMode,
} = bookingSlice.actions;

export default bookingSlice.reducer;
