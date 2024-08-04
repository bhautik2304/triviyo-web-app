"use client";
import { configureStore } from "@reduxjs/toolkit";
import { cabBookingReducer, userReducer } from "./slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cab: cabBookingReducer,
  },
});
