"use client";
/* Core */
import { Provider } from "react-redux";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

/* Instruments */
import { store } from "./store";
export const Providers = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
      </Provider>
    </>
  );
};
