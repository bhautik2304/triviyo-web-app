"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AirportGmapPlace,
  GmapPlaceSearch,
  DateInput,
  TimeInput,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Link from "next/link";
import { appRoutes, cabSearchSchima } from "@/constant";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Flatpickr from "react-flatpickr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import {
  addSerach,
  addStopOver,
  changeTripData,
} from "@/redux/slice/CabBookingSlice";
import moment from "moment";
import { TimeClock } from "@mui/x-date-pickers";
import { LockClockTwoTone } from "@mui/icons-material";

const oneWay = {
  tripType: "Hourly Rentals",
  fromCity: {},
  toCity: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
  intlFlow: false,
};

const hourlyOption = [
  // "1 hrs",
  // "2 hrs",
  // "3 hrs",
  "4 hrs",
  // "5 hrs",
  // "6 hrs",
  // "7 hrs",
  "8 hrs",
  // "9 hrs",
  // "10 hrs",
  // "11 hrs",
  "12 hrs",
];

function HourlyRental({ data }) {
  const [datas, setData] = useState();
  const [date, setDate] = useState(null);
  const [times, setTime] = useState(null);
  const [error, setError] = useState({
    origin: false,
    destination: false,
    date: false,
    times: false,
  });
  const dispatch = useDispatch();
  const routes = useRouter();
  const qry = useSearchParams();

  const qry_params = JSON.parse(qry.get("qry"));
  const { cabsSearch } = useSelector((state) => state.cab);
  useEffect(() => {
    setData({
      ...data,
    });
    const datesss = moment(qry_params.pickupDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const combinedDateTimeString = `${datesss}T${qry_params.pickupTime}`;

    // Parse the combined date and time using moment
    const formattedDateTime = moment(combinedDateTimeString).format(
      "YYYY-MM-DDTHH:mm"
    );
    console.log("64 bdcsdfsg", combinedDateTimeString);
    const pickupDate = cabsSearch?.pickupDate
      ? setDate(moment(cabsSearch.pickupDate))
      : null;
    const pickupTime = cabsSearch?.pickupTime
      ? setTime(moment(formattedDateTime))
      : null;
  }, []);

  const searchTrip = async () => {
    let hasError = false;

    if (!datas?.pickupDate) {
      setError((prevError) => ({
        ...prevError,
        times: "Please Select Pickup Time",
      }));
      hasError = true;
    }

    if (!datas?.pickupTime) {
      setError((prevError) => ({
        ...prevError,
        date: "Please Select Pickup Date",
      }));
      hasError = true;
    }

    if (!datas?.fromCity) {
      setError((prevError) => ({
        ...prevError,
        origin: "Please Select Pickup Location",
      }));
      hasError = true;
    }

    if (!datas?.pkg) {
      setError((prevError) => ({
        ...prevError,
        destination: "Please Select Drop Location",
      }));
      hasError = true;
    }

    // Exit early if there is an error
    if (hasError) {
      return;
    }

    try {
      dispatch(changeTripData(datas));
      // Ensure pathname and query are set correctly
      console.log(newOneWay);

      routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <>
      <div class="row g-4">
        {/* <!-- Pickup --> */}
        <div class="col-md-3 position-relative">
          <div class="form-icon-input form-size-lg form-fs-lg">
            <GmapPlaceSearch
              error={error.origin}
              label="Selct Pickup Location"
              value={qry_params?.fromCity}
              onSelectPlace={(place) => {
                console.log(place);
                setError((prevError) => ({
                  ...prevError,
                  origin: false,
                }));
                const newLocationData = {
                  label: place.formatted_address,
                  id: place.place_id,
                  name: place.formatted_address,
                  placeId: place.place_id,
                  lat: place.geometry.location.lat,
                  lng: place.geometry.location.lng,
                };
                setData({ ...datas, fromCity: newLocationData });
                // Update the state immutably
              }}
            />
          </div>
          <span className="text-danger">{error.origin && error.origin}</span>
          {/* <!-- Auto fill button --> */}
          <div class="btn-flip-icon z-index-9">
            <button class="btn btn-white shadow btn-round mb-0">
              <i class="fa-solid fa-right-left"></i>
            </button>
          </div>
        </div>
        {/* <!-- Drop --> */}
        <div class="col-md-3">
          <div class="form-icon-input form-size-lg form-fs-lg">
            <select
              label="Select Pkg"
              placeholder="Select Pkg"
              value={datas?.pkg}
              onChange={(e) => {
                setData({ ...datas, pkg: e.target.value });
                dispatch(addSerach({ key: "pkg", value: e.target.value }));
              }}
              style={{
                width: "100%",
                height: 55,
                borderRadius: 15,
                borderColor: "#c5c5c7",
                paddingLeft: 40,
                fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
                backgroundColor: "#f5f5f5",
              }}
            >
              <option>Selct Your Pakage</option>
              {hourlyOption.map((data) => (
                <option value={data}> {data}</option>
              ))}
            </select>
            <span class="form-icon">
              <i class="bi bi-clock fs-5"></i>
            </span>
          </div>
          <span className="text-danger">
            {error.destination && error.destination}
          </span>
        </div>
        {/* <!-- Pickup date --> */}
        <div class="col-md-2">
          <div class="form-icon-input form-fs-lg">
            <DateInput
              label="Pickup Date"
              error={error.date}
              onChange={(data) => {
                // const date = new Date(data);
                setError((prevError) => ({
                  ...prevError,
                  date: false,
                }));
                // setDate(moment(data).format("YYYY-MM-DD"));
                setData({
                  ...datas,
                  pickupDate: moment(data).format("YYYY-MM-DD"),
                });
              }}
              value={date}
            />
            <span className="text-danger">{error.date && error.date}</span>
          </div>
        </div>
        {/* <!-- Pickup time --> */}
        <div class="col-md-2">
          <div class="form-icon-input form-fs-lg">
            <TimeInput
              label="Pickup Time"
              error={error.times}
              value={times}
              date={date}
              onChange={(data) => {
                // const date = new Date(data);
                setError((prevError) => ({
                  ...prevError,
                  times: false,
                }));
                setData({
                  ...datas,
                  pickupDate: moment(data).format("HH:mm:ss"),
                });
              }}
            />
            <span className="text-danger">{error.times && error.times}</span>
          </div>
        </div>
        <div class="col-xl-2">
          <button
            onClick={searchTrip}
            class="btn btn-lg btn-primary w-100 mb-0"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default HourlyRental;
