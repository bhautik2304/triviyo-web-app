"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AirportGmapPlace,
  DateInput,
  GmapPlaceSearch,
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
import { addStopOver, changeTripData } from "@/redux/slice/cabBookingSlice";
import moment from "moment";
import { fetchCabs } from "@/redux/thunk/cab";

const defaultAddress = {
  label: "Surat, Gujarat, India",
  id: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  name: "Surat, Gujarat, India",
  placeId: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  lat: 21.1702401,
  lng: 72.83106070000001,
};

const oneWay = {
  tripType: "One Way",
  fromCity: {},
  toCity: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
  intlFlow: false,
};

function OneWay() {
  const [km, setKm] = useState(0);
  const [origin, setorigin] = useState({});
  const [destination, setdestination] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [error, setError] = useState({
    origin: false,
    destination: false,
    date: false,
    times: false,
  });

  const dispatch = useDispatch();
  const routes = useRouter();

  const { cabsSearch } = useSelector((state) => state.cab);

  const qry = useSearchParams();

  const qry_params = JSON.parse(qry.get("qry"));

  //   useEffect(() => {
  //     setData(qry_params);
  //   }, []);

  useEffect(() => {
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
    setData(cabsSearch);
  }, [cabsSearch]);

  const searchTrip = async () => {
    let hasError = false;

    if (!time) {
      setError((prevError) => ({
        ...prevError,
        times: "Please Select Pickup Time",
      }));
      hasError = true;
    }

    if (!date) {
      setError((prevError) => ({
        ...prevError,
        date: "Please Select Pickup Date",
      }));
      hasError = true;
    }

    if (!origin) {
      setError((prevError) => ({
        ...prevError,
        origin: "Please Select Pickup Location",
      }));
      hasError = true;
    }

    if (!destination) {
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
      const newOneWay = {
        ...data,
        stopOvers: [data?.fromCity, data?.toCity],
        pickupDate: moment(date).format("YYYY-MM-DD"),
        pickupTime: moment(time).format("HH:mm:ss"),
      };

      dispatch(changeTripData(newOneWay));
      // Ensure pathname and query are set correctly
      routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
      const params = {
        location: newOneWay?.stopOvers, // Example locations
        trip: newOneWay?.tripType,
        cabsType: "all",
      };
      dispatch(fetchCabs(params));
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  console.log(data);

  return (
    <>
      <div class="row g-4 align-items-center">
        <div class="col-xl-10">
          <div class="row g-4">
            {/* <!-- Pickup --> */}
            <div class="col-md-6 col-xl-4">
              <div class="form-size-lg">
                <label class="form-label">Pickup</label>
                <GmapPlaceSearch
                  label="Select Pickup Location"
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
                    setData({ ...data, fromCity: newLocationData });
                    // Update the state immutably
                  }}
                  value={qry_params.fromCity || null}
                />
              </div>
            </div>

            {/* <!-- Drop --> */}
            <div class="col-md-6 col-xl-4">
              <div class="form-size-lg">
                <label class="form-label">Drop</label>
                <GmapPlaceSearch
                  value={qry_params?.toCity || null}
                  label="Selct Pickup Location"
                  onSelectPlace={(place) => {
                    setError((prevError) => ({
                      ...prevError,
                      destination: false,
                    }));

                    const newLocationData = {
                      label: place.formatted_address,
                      name: place.formatted_address,
                      placeId: place.place_id,
                      id: place.place_id,
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };

                    // Update the state immutably
                    // setDestinationLatLong(newLocation);
                    setData({ ...data, toCity: newLocationData });
                  }}
                />
              </div>
            </div>

            {/* <!-- Date --> */}
            <div class="col-md-6 col-xl-2">
              <label class="form-label">Pickup Date</label>
              <DateInput value={date} onChange={(dates) => setDate(dates)} />
            </div>

            {/* <!-- Time --> */}
            <div class="col-md-6 col-xl-2">
              <label class="form-label">Pickup time</label>
              <TimeInput value={time} onChange={(times) => setTime(times)} />
            </div>
          </div>
        </div>

        <div class="col-xl-2 d-grid mt-xl-auto">
          <button onClick={searchTrip} class="btn btn-lg btn-primary mb-0">
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default OneWay;
