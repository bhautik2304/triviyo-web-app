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
import { apiRoutes, appRoutes, cabSearchSchima } from "@/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Flatpickr from "react-flatpickr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { addStopOver, changeTripData } from "@/redux/slice/CabBookingSlice";
import moment from "moment";

const tripOption = {
  pickupToAirport: "Pickup To Airport",
  dropToAirport: "Drop To Airport",
};

const airportTransfer = {
  tripType: "Airport Transfers",
  airport: false,
  toCity: false,
  fromCity: false,
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

function AirportTransfers() {
  const [origin, setOrigin] = useState(false);
  const [data, setData] = useState(airportTransfer);
  const [error, setError] = useState(errorMessage);
  const dispatch = useDispatch();
  const routes = useRouter();

  const searchTrip = async () => {
    let hasError = false;

    if (!data.pickupTime) {
      // console.log("Now first problem data.pickupTime");
      // return 0;
      setError((prevError) => ({
        ...prevError,
        times: "Please Select Pickup Time",
      }));
      hasError = true;
    }

    if (!data.pickupDate) {
      // console.log("Now first problem data.pickupDate", data);
      // return 0;
      setError((prevError) => ({
        ...prevError,
        date: "Please Select Pickup Date",
      }));
      hasError = true;
    }

    if (data.trip == tripOption.pickupToAirport) {
      if (!data.airport) {
        setError((prevError) => ({
          ...prevError,
          origin: "Please Select Pickup Airport",
        }));
        hasError = true;
      }
      if (!data.toCity) {
        setError((prevError) => ({
          ...prevError,
          destination: "Please Select Drop Location",
        }));
        hasError = true;
      }
    } else {
      console.log("run this", tripOption.pickupToAirport);
      if (!data.fromCity) {
        // console.log("Now first problem data.toPickup");
        // return 0;
        setError((prevError) => ({
          ...prevError,
          origin: "Please Select Pickup Location",
        }));
        hasError = true;
      }
      if (!data.airport) {
        // console.log("Now first problem data.airport");
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
      if (data.trip == tripOption.pickupToAirport) {
        newOneWay = {
          ...data,
          tripOption: data?.trip,
          toPickup: data.airport,
          toDestination: data.toCity,
          stopOvers: [data.airport, data.toCity],
        };
      } else {
        newOneWay = {
          ...data,
          toPickup: data.fromCity,
          toDestination: data.airport,
          tripOption: data?.trip,
          stopOvers: [data.fromCity, data.airport],
        };
      }
      console.log(newOneWay);
      let searchQry;
      if (data.trip == tripOption.pickupToAirport) {
        searchQry = {
          airport: data.airport,
          toCity: data.toCity,
        };
      } else {
        searchQry = {
          airport: data.airport,
          toCity: data.fromCity,
        };
      }
      const tripType = await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/check-trip-type`,
          searchQry
        )
        .then((e) => e.data);

      if (tripType.tripType == "instation") {
        dispatch(changeTripData(newOneWay));
        // console.log(newOneWay);
        routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
        return;
      } else {
        if (data.trip == tripOption.pickupToAirport) {
          newOneWay = {
            ...data,
            tripType: "One Way",
            fromCity: data.airport,
            stopOvers: [data.airport, data.toCity],
          };
        } else {
          newOneWay = {
            ...data,
            tripType: "One Way",
            toCity: data.airport,
            stopOvers: [data.fromCity, data.airport],
          };
        }
        dispatch(changeTripData(newOneWay));
        routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
        return;
      }
      // Ensure pathname and query are set correctly
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  return (
    <div
      div
      class="tab-pane fade"
      id="pills-Airport-Transfers-2"
      role="tabpanel"
      aria-labelledby="pills-Airport-Transfers-2-tab"
    >
      <div class="col-lg-6">
        <div class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <div
            class="form-check form-check-inline active"
            id="cab-one-way-tab"
            data-bs-toggle="pill"
            data-bs-target="#cab-one-way"
            role="tab"
            aria-controls="cab-one-way"
            aria-selected="true"
            onClick={() => {
              setError(errorMessage);
              setData({ ...data, trip: tripOption.pickupToAirport });
            }}
          >
            <input
              class="form-check-input "
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadiocab1"
              value={data.trip}
              checked={data.trip == tripOption.pickupToAirport}
            />
            <label class="form-check-label" for="inlineRadiocab1">
              {tripOption.pickupToAirport}
            </label>
          </div>
          <div
            class="form-check form-check-inline"
            id="cab-round-way-tab"
            data-bs-toggle="pill"
            data-bs-target="#cab-round-way"
            role="tab"
            aria-controls="cab-round-way"
            aria-selected="false"
            onClick={() => {
              setData({ ...data, trip: tripOption.dropToAirport });
              setError(errorMessage);
            }}
          >
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadiocab2"
              value={data.trip}
              checked={data.trip == tripOption.dropToAirport}
            />
            <label class="form-check-label" for="inlineRadiocab2">
              {tripOption.dropToAirport}
            </label>
          </div>
        </div>
      </div>
      <div class="row g-4">
        {/* <!-- Pickup --> */}
        <div class="col-md-6 position-relative">
          <div class="form-icon-input form-size-lg form-fs-lg">
            {data.trip == tripOption.pickupToAirport ? (
              <>
                <AirportGmapPlace
                  error={error.origin}
                  label="Selct Pickup Location"
                  onSelectAirport={(place) => {
                    console.log(place);
                    setError((prevError) => ({
                      ...prevError,
                      origin: false,
                    }));
                    const newLocationData = {
                      id: place.place_id,
                      label: place.address,
                      name: place.address,
                      placeId: place.place_id,
                      lat: place.latitude,
                      lng: place.longitude,
                    };
                    setData({ ...data, airport: newLocationData });
                    // Update the state immutably
                  }}
                />
              </>
            ) : (
              <>
                <GmapPlaceSearch
                  error={error.origin}
                  label="Select Pickup Location"
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
                    setData({ ...data, fromCity: newLocationData });
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
        <div class="col-md-6">
          <div class="form-icon-input form-size-lg form-fs-lg">
            {data.trip == tripOption.pickupToAirport ? (
              <>
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
                    setData({ ...data, toCity: newLocationData });
                  }}
                />
              </>
            ) : (
              <>
                <AirportGmapPlace
                  label="Select Drop Airport"
                  error={error.destination}
                  onSelectAirport={(place) => {
                    console.log(place);
                    setError((prevError) => ({
                      ...prevError,
                      origin: false,
                    }));
                    const newLocationData = {
                      id: place.place_id,
                      label: place.address,
                      name: place.address,
                      placeId: place.place_id,
                      lat: place.latitude,
                      lng: place.longitude,
                    };
                    console.log(place);

                    setData({ ...data, airport: newLocationData });
                    // Update the state immutably
                  }}
                />
              </>
            )}
            <span className="text-danger">{error?.destination}</span>
          </div>
        </div>
        {/* <!-- Pickup date --> */}
        <div class="col-md-6">
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
                  ...data,
                  pickupDate: moment(data).format("YYYY-MM-DD"),
                });
              }}
            />
            <span className="text-danger">{error?.date}</span>
          </div>
        </div>
        {/* <!-- Pickup time --> */}
        <div class="col-md-6">
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
                  ...data,
                  pickupTime: moment(date).format("HH:mm:ss"),
                });
              }}
            />
            <span className="text-danger">{error?.times}</span>
          </div>
        </div>
      </div>
      <div class="text-center pt-0">
        <button onClick={searchTrip} class="btn btn-lg btn-primary mb-n7">
          Search Cabs <i class="bi bi-arrow-right ps-3"></i>
        </button>
      </div>
    </div>
  );
}

export default AirportTransfers;
