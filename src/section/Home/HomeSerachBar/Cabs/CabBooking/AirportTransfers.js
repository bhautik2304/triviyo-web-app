"use client";
import React, { useState } from "react";
import { GmapPlaceSearch } from "@/components";
import { useDispatch } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Link from "next/link";
import { appRoutes } from "@/constant";
function AirportTransfers() {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  const serachTrip = () => {
    console.log(value);
  };
  return (
    <div
      div
      class="tab-pane fade"
      id="pills-Airport-Transfers-2"
      role="tabpanel"
      aria-labelledby="pills-Airport-Transfers-2-tab"
    >
      <div class="row g-4">
        {/* <!-- Pickup --> */}
        <div class="col-md-6 position-relative">
          <div class="form-icon-input form-size-lg form-fs-lg">
            <GmapPlaceSearch
              placeholder="Selct Pickup Location"
              onSelectPlace={(place) => {
                setPickup({
                  name: place.formatted_address,
                  placeId: place.place_id,
                  geo: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                });
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
                setDrop({
                  name: place.formatted_address,
                  placeId: place.place_id,
                  geo: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                });
              }}
            />
          </div>
        </div>
        {/* <!-- Pickup date --> */}
        <div class="col-md-6">
          <div class="form-icon-input form-fs-lg">
            <input
              type="text"
              class="form-control form-control-lg flatpickr"
              data-date-format="d/M/Y"
              placeholder="Select pickup date"
            />
            <span class="form-icon">
              <i class="bi bi-calendar fs-5"></i>
            </span>
          </div>
        </div>
        {/* <!-- Pickup time --> */}
        <div class="col-md-6">
          <div class="form-icon-input form-fs-lg">
            <input
              type="text"
              class="form-control form-control-lg flatpickr"
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
        <Link href={appRoutes.app.cabs} class="btn btn-lg btn-primary mb-n7">
          Search Cabs <i class="bi bi-arrow-right ps-3"></i>
        </Link>
      </div>
    </div>
  );
}

export default AirportTransfers;
