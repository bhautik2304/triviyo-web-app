"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AirportGmapPlace,
  DateInput,
  GmapPlaceSearch,
  TimeInput,
} from "@/components";
import { useDispatch } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Link from "next/link";
import { appRoutes, cabSearchSchima } from "@/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Flatpickr from "react-flatpickr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { addStopOver, changeTripData } from "@/redux/slice/CabBookingSlice";
import moment from "moment";

const roundTrip = {
  tripType: "Round Trip",
  fromCity: {},
  toCity: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  dropTime: "",
};

function RoundTrip() {
  const [origin, setOrigin] = useState(false);
  const [originLatLong, setOriginLatLong] = useState(false);
  const [destination, setDestination] = useState(false);
  const [destinationLatLong, setDestinationLatLong] = useState(false);
  const [date, setDate] = useState(false);
  const [times, setTime] = useState(false);
  const [stops, setStops] = useState([
    // Initial state with one stop
  ]);
  const [error, setError] = useState({
    origin: false,
    destination: false,
    date: false,
    times: false,
  });
  const dispatch = useDispatch();
  const routes = useRouter();

  const handleAddStop = () => {
    const newStop = {
      id: stops.length + 1, // Incremental ID
      location: null,
      lat: null,
      lng: null,
    };
    setStops([...stops, newStop]);
  };

  const handleRemoveStop = (stopId) => {
    const updatedStops = stops.filter((stop) => stop.id !== stopId);
    setStops(updatedStops);
  };

  const handleSelectPlace = (place, stopId) => {
    const newLocationData = {
      label: place.formatted_address,
      name: place.formatted_address,
      placeId: place.place_id,
      id: place.place_id,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };
    const updatedStops = stops.map((stop) =>
      stop.id === stopId ? { ...stop, ...newLocationData } : stop
    );

    setStops(updatedStops);
  };

  const searchTrip = async () => {
    let hasError = false;

    if (!times) {
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
        ...roundTrip,
        fromCity: origin,
        toCity: destination,
        stopOvers: [origin, ...stops, destination],
        pickupDate: date,
        pickupTime: times,
        stop: stops,
      };
      console.log(newOneWay);

      dispatch(changeTripData(newOneWay));
      // Ensure pathname and query are set correctly
      routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <div
      div
      class="tab-pane fade"
      id="pills-round-way-2"
      role="tabpanel"
      aria-labelledby="pills-round-way-2-tab"
    >
      <div class="row g-4">
        {/* <!-- Pickup --> */}
        <div class="col-md-6 position-relative">
          <div class="form-icon-input form-size-lg form-fs-lg">
            <GmapPlaceSearch
              error={error.origin}
              label="Selct Pickup Location"
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
                setOrigin(newLocationData);
                setOriginLatLong(newLocation);
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
        <div class="col-md-6">
          <div class="form-icon-input form-size-lg form-fs-lg">
            <GmapPlaceSearch
              label="Selct Drop Location"
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
                setDestinationLatLong(newLocation);
                setDestination(newLocationData);
              }}
            />
          </div>
          <span className="text-danger">
            {error.destination && error.destination}
          </span>
        </div>
        {/* <!-- Pickup date --> */}
        <div class="col-md-6">
          <div class="form-icon-input form-fs-lg">
            <DateInput
              error={error.date}
              onChange={(data) => {
                // const date = new Date(data);
                setError((prevError) => ({
                  ...prevError,
                  date: false,
                }));
                setDate(moment(data).format("YYYY-MM-DD"));
              }}
            />
            <span className="text-danger">{error.date && error.date}</span>
          </div>
        </div>
        {/* <!-- Pickup time --> */}
        <div class="col-md-6">
          <div class="form-icon-input form-fs-lg">
            <TimeInput
              error={error.times}
              onChange={(data) => {
                // const date = new Date(data);
                setError((prevError) => ({
                  ...prevError,
                  times: false,
                }));
                setTime(moment(data).format("HH:mm:ss"));
              }}
            />
            <span className="text-danger">{error.times && error.times}</span>
          </div>
        </div>
        <div className="col-12 row">
          {stops.map((stop, index) => (
            <>
              <div
                key={stop.id}
                className="col-md-4 mt-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="col-10 me-3">
                  <div className="form-icon-input form-size-lg form-fs-lg">
                    <GmapPlaceSearch
                      label={`Select Stop Location ${index + 1}`}
                      error={error[`stop${stop.id}`]}
                      value={stop?.label ? stop : null}
                      onSelectPlace={(place) => {
                        setError((prevError) => ({
                          ...prevError,
                          [`stop${stop.id}`]: false,
                        }));
                        console.log(place);

                        handleSelectPlace(place, stop.id);
                      }}
                    />
                  </div>
                  <span className="text-danger">
                    {error[`stop${stop.id}`] && error[`stop${stop.id}`]}
                  </span>
                </div>
                <div className="col-1 text-end">
                  <div className="">
                    <button
                      onClick={() => handleRemoveStop(stop.id)}
                      className="btn btn-danger shadow btn-round mb-0"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

                {/* Remove Stop Button */}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="col-md-12 text-start mt-3">
        <button onClick={handleAddStop} className="btn btn-sm btn-danger mb-3">
          Add Stop
        </button>
      </div>
      <div class="text-center pt-0">
        <button onClick={searchTrip} class="btn btn-lg btn-primary mb-n7">
          Search Cabs <i class="bi bi-arrow-right ps-3"></i>
        </button>
      </div>
    </div>
  );
}

export default RoundTrip;
