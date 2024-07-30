"use client";
import React, { useState, useEffect, useRef } from "react";
import { GmapPlaceSearch } from "@/components";
import { useDispatch } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Link from "next/link";
import { appRoutes, cabSearchSchima } from "@/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Flatpickr from "react-flatpickr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "flatpickr/dist/themes/material_green.css";

function OneWay() {
  const [origin, setOrigin] = useState({});
  const [calenderClose, setCalenderClose] = useState(false);
  const [originLatLong, setOriginLatLong] = useState({});
  const [destination, setDestination] = useState({});
  const [destinationLatLong, setDestinationLatLong] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [date, setDate] = useState({});

  // const dispatch = useDispatch()
  const routes = useRouter();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalenderClose(false); // Close the picker after selection
  };

  const getFormattedDate = () => {
    return selectedDate ? selectedDate.toISOString().split("T")[0] : null;
  };

  const searchTrip = async () => {
    try {
      const newCabsSearchSchema = {
        ...cabSearchSchima,
        tripType: "One Way",
        origin: origin,
        originLatLong: originLatLong,
        destination: destination,
        destinationLatLong: destinationLatLong,
        location: [originLatLong, destinationLatLong],
        pickupDate: getFormattedDate(),
        pickupTime: [originLatLong, destinationLatLong],
      };
      // Ensure pathname and query are set correctly
      routes.push(
        `${appRoutes.app.cabs}?qry=${JSON.stringify(newCabsSearchSchema)}`
      );
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  return (
    <>
      <div
        class="tab-pane fade show active"
        id="pills-one-way-2"
        role="tabpanel"
        aria-labelledby="pills-one-way-2-tab"
      >
        <div class="row g-4">
          {/* <!-- Pickup --> */}
          <div class="col-md-6 position-relative">
            <div class="form-icon-input form-size-lg form-fs-lg">
              <GmapPlaceSearch
                placeholder="Selct Pickup Location"
                onSelectPlace={(place) => {
                  console.log(place);
                  const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  };

                  const newLocationData = {
                    name: place.formatted_address,
                    placeId: place.place_id,
                    geo: {
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    },
                  };
                  // Update the state immutably
                  setOrigin(newLocationData);
                  setOriginLatLong(newLocation);
                }}
              />
            </div>
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
                placeholder="Selct Drop Location"
                onSelectPlace={(place) => {
                  const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  };

                  const newLocationData = {
                    name: place.formatted_address,
                    placeId: place.place_id,
                    geo: {
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    },
                  };

                  // Update the state immutably
                  setDestinationLatLong(newLocation);
                  setDestination(newLocationData);
                }}
              />
            </div>
          </div>
          {/* <!-- Pickup date --> */}
          <div class="col-md-6">
            <div class="form-icon-input form-fs-lg">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
                open={calenderClose}
                onOpen={() => setCalenderClose(true)}
                onClose={() => setCalenderClose(false)}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <input class="form-control form-control-lg" {...params} />
                )}
              />
            </div>
          </div>
          {/* <!-- Pickup time --> */}
          <div class="col-md-6">
            <div class="form-icon-input form-fs-lg">
              <Flatpickr
                type="text"
                class="form-control form-control-lg"
                placeholder="Select pickup time"
                data-noCalendar="true"
                data-enableTime="true"
              />
              <span class="form-icon">
                <i class="bi bi-calendar fs-5"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="text-center pt-0">
          <button
            onClick={searchTrip}
            // href={`${appRoutes.app.cabs}?qry=${JSON.stringify({
            //   to: "vadodora",
            //   from: "Amereka",
            // })}`}
            class="btn btn-lg btn-primary mb-n7"
          >
            Search Cabs <i class="bi bi-arrow-right ps-3"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default OneWay;
