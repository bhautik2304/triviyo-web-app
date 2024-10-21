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
import { addStopOver, changeTripData } from "@/redux/slice/CabBookingSlice";
import moment from "moment";
import { fetchCabs } from "@/redux/thunk/cab";

const tripOption = {
  pickupToAirport: "Pickup To Airport",
  dropToAirport: "Drop To Airport",
};

const airportTransfer = {
  tripType: "Airport Transfers",
  airport: null,
  toDestination: false,
  toPickup: false,
  trip: tripOption.pickupToAirport,
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
};

const errorMessage = {
  origin: false,
  destination: false,
  date: false,
  times: false,
};

const defaultAddress = {
  label: "Surat, Gujarat, India",
  id: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  name: "Surat, Gujarat, India",
  placeId: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  lat: 21.1702401,
  lng: 72.83106070000001,
};

function AirportTransfer({ data }) {
  const [origin, setOrigin] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [datas, setData] = useState();
  const [error, setError] = useState(errorMessage);

  const dispatch = useDispatch();
  const routes = useRouter();
  const qry = useSearchParams();

  const qry_params = JSON.parse(qry.get("qry"));
  const { cabsSearch } = useSelector((state) => state.cab);
  useEffect(() => {
    setData({
      ...data,
      toDestination: null,
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

  console.log(datas);

  const searchTrip = async () => {
    let hasError = false;

    if (!datas.pickupTime) {
      // console.log("Now first problem datas.pickupTime");
      // return 0;
      setError((prevError) => ({
        ...prevError,
        times: "Please Select Pickup Time",
      }));
      hasError = true;
    }

    if (!datas.pickupDate) {
      // console.log("Now first problem datas.pickupDate", datas);
      // return 0;
      setError((prevError) => ({
        ...prevError,
        date: "Please Select Pickup Date",
      }));
      hasError = true;
    }

    if (datas.trip == tripOption.pickupToAirport) {
      if (!datas.airport) {
        setError((prevError) => ({
          ...prevError,
          origin: "Please Select Pickup Airport",
        }));
        hasError = true;
      }
      if (!datas.toCity) {
        setError((prevError) => ({
          ...prevError,
          destination: "Please Select Drop Location",
        }));
        hasError = true;
      }
    } else {
      console.log("run this", tripOption.pickupToAirport);
      if (!datas.cc) {
        // console.log("Now first problem datas.toPickup");
        // return 0;
        setError((prevError) => ({
          ...prevError,
          origin: "Please Select Pickup Location",
        }));
        hasError = true;
      }
      if (!datas.airport) {
        // console.log("Now first problem datas.airport");
        // return 0;
        setError((prevError) => ({
          ...prevError,
          destination: "Please Select Drop Airport",
        }));
        hasError = true;
      }
    }

    // Exit early if there is an error
    if (hasError) {
      console.log("Now End");

      return;
    }

    try {
      let newOneWay;
      if (datas.trip == tripOption.pickupToAirport) {
        newOneWay = {
          ...datas,
          tripOption: datas?.trip,
          stopOvers: [datas.airport, datas.toDestination],
        };
      } else {
        newOneWay = {
          ...datas,
          tripOption: datas?.trip,
          stopOvers: [datas.toPickup, datas.airport],
        };
      }
      console.log(newOneWay);

      dispatch(changeTripData(newOneWay));
      const params = {
        location: newOneWay?.stopOvers, // Example locations
        trip: newOneWay?.tripType,
        cabsType: "all",
      };

      dispatch(fetchCabs(params));
      routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
      // Ensure pathname and query are set correctly
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  return (
    <>
      <div class="row g-4 align-items-center">
        <div class="col-lg-6 mb-4">
          <div class="nav nav-pills" id="pills-tab" role="tablist">
            <div
              class={`form-check form-check-inline ${
                datas?.trip == tripOption.pickupToAirport && "active"
              }`}
              id="cab-one-way-tab"
              data-bs-toggle="pill"
              data-bs-target="#cab-one-way"
              role="tab"
              aria-controls="cab-one-way"
              aria-selected={datas?.trip == tripOption.pickupToAirport}
              onClick={() => {
                setError(errorMessage);
                setData({ ...datas, trip: tripOption.pickupToAirport });
              }}
            >
              <input
                class="form-check-input "
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadiocab5"
                onChange={() => {}}
                value={datas?.trip}
                checked={datas?.trip == tripOption.pickupToAirport}
              />
              <label class="form-check-label" for="inlineRadiocab5">
                {tripOption.pickupToAirport}
              </label>
            </div>
            <div
              class={`form-check form-check-inline ${
                datas?.trip == tripOption.pickupToAirport && "active"
              }`}
              id="cab-round-way-tab"
              data-bs-toggle="pill"
              data-bs-target="#cab-round-way"
              role="tab"
              aria-controls="cab-round-way"
              aria-selected={datas?.trip == tripOption.pickupToAirport}
              onClick={() => {
                setData({ ...datas, trip: tripOption.dropToAirport });
                setError(errorMessage);
              }}
            >
              <input
                class="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadiocab6"
                onChange={() => {}}
                value={data?.trip}
                checked={data?.trip == tripOption.dropToAirport}
              />
              <label class="form-check-label" for="inlineRadiocab6">
                {tripOption.dropToAirport}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-4">
        {/* <!-- Pickup --> */}
        <div class="col-md-3 position-relative">
          <div class="form-icon-input form-size-lg form-fs-lg">
            {datas?.trip == tripOption.pickupToAirport ? (
              <>
                <AirportGmapPlace
                  error={error.origin}
                  label="Select Pickup Airport"
                  onSelectAirport={(place) => {
                    console.log(place);
                    setError((prevError) => ({
                      ...prevError,
                      origin: false,
                    }));
                    const newLocationData = {
                      id: place.id,
                      label: place.address,
                      name: place.address,
                      placeId: place.id,
                      lat: place.latitude,
                      lng: place.longitude,
                    };
                    setData({ ...datas, airport: newLocationData });
                    // Update the state immutably
                  }}
                  defaultValue={datas?.airport}
                />
              </>
            ) : (
              <>
                <GmapPlaceSearch
                  error={error.origin}
                  label="Select Pickup Location"
                  value={data?.toPickup}
                  onSelectPlace={(place) => {
                    console.log(place);
                    setError((prevError) => ({
                      ...prevError,
                      origin: false,
                    }));
                    const newLocation = {
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };
                    const newLocationData = {
                      label: place.formatted_address,
                      id: place.place_id,
                      name: place.formatted_address,
                      placeId: place.place_id,
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };
                    setData({ ...datas, toPickup: newLocationData });
                    // Update the state immutably
                  }}
                />
              </>
            )}
            <span className="text-danger">{error?.origin}</span>
          </div>
          {/* <!-- Auto fill button --> */}
          <div class="btn-flip-icon z-index-9">
            <button class="btn btn-white shadow btn-round mb-0">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
        {/* <!-- Drop --> */}
        <div class="col-md-3">
          <div class="form-icon-input form-size-lg form-fs-lg">
            {datas?.trip == tripOption.pickupToAirport ? (
              <>
                <GmapPlaceSearch
                  label="Select Drop Location"
                  error={error.destination}
                  onSelectPlace={(place) => {
                    setError((prevError) => ({
                      ...prevError,
                      destination: false,
                    }));
                    const newLocation = {
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };

                    const newLocationData = {
                      label: place.formatted_address,
                      name: place.formatted_address,
                      placeId: place.place_id,
                      id: place.place_id,
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };

                    // Update the state immutably
                    setData({ ...datas, toCity: newLocationData });
                  }}
                  value={datas?.toCity || null}
                />
              </>
            ) : (
              <>
                <AirportGmapPlace
                  label="Select Drop Airport"
                  error={error.destination}
                  defaultValue={datas?.airport}
                  onSelectAirport={(place) => {
                    console.log(place);
                    setError((prevError) => ({
                      ...prevError,
                      origin: false,
                    }));
                    const newLocationData = {
                      id: place.id,
                      label: place.address,
                      name: place.address,
                      placeId: place.id,
                      lat: place.latitude,
                      lng: place.longitude,
                    };
                    setData({ ...datas, airport: newLocationData });
                    // Update the state immutably
                  }}
                />
              </>
            )}
            <span className="text-danger">{error?.destination}</span>
          </div>
        </div>
        {/* <!-- Pickup date --> */}
        <div class="col-md-2">
          <div class="form-icon-input form-fs-lg">
            <DateInput
              error={error.date}
              onChange={(date) => {
                // const date = new Date(data);
                setError((prevError) => ({
                  ...prevError,
                  date: false,
                }));
                setData({
                  ...datas,
                  pickupDate: moment(data).format("YYYY-MM-DD"),
                });
              }}
              value={date}
            />
            <span className="text-danger">{error?.date}</span>
          </div>
        </div>
        {/* <!-- Pickup time --> */}
        <div class="col-md-2">
          <div class="form-icon-input form-fs-lg">
            <TimeInput
              error={error.times}
              onChange={(date) => {
                // const date = new Date(data);
                setError((prevError) => ({
                  ...prevError,
                  times: false,
                }));
                setData({
                  ...datas,
                  pickupTime: moment(date).format("HH:mm:ss"),
                });
              }}
              value={time}
            />
            <span className="text-danger">{error?.times}</span>
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

export default AirportTransfer;
