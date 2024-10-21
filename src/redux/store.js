"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  cabBookingReducer,
  userReducer,
  bookingReducer,
  userBookingReducer,
} from "./slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cab: cabBookingReducer,
    booking: bookingReducer,
    trip: userBookingReducer,
  },
});
