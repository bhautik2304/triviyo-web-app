"use client";
import React, { useEffect, useState } from "react";
import Upcoming from "./BookingTab/Upcoming";
import Canceled from "./BookingTab/Canceled";
import Completed from "./BookingTab/Completed";
import { appAxios } from "@/lib/axios";
import { useSelector } from "react-redux";
import { apiRoutes } from "@/constant";
import { ScaletonBooking } from "@/section/user";

const booking_status = {
  pending: "pending",
  upcomeing: "upcomeing",
  canceled: "canceled",
  completed: "completed",
};

const scaleteon = [{}, {}];

function MyBooking() {
  const { authStatus } = useSelector((state) => state.user);
  const { upcomeing, canceled, completed, loadingState } = useSelector(
    (state) => state.trip
  );

  return (
    <>
      <div class="card border bg-transparent">
        {/* <!-- Card header --> */}
        <div class="card-header bg-transparent border-bottom">
          <h4 class="card-header-title">My Bookings</h4>
        </div>

        {/* <!-- Card body START --> */}
        <div class="card-body p-0">
          {/* <!-- Tabs --> */}
          <ul class="nav nav-tabs nav-bottom-line nav-responsive nav-justified">
            <li class="nav-item">
              <a
                class="nav-link mb-0 active"
                data-bs-toggle="tab"
                href="#tab-1"
              >
                <i class="bi bi-briefcase-fill fa-fw me-1"></i>Upcoming Booking
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-2">
                <i class="bi bi-x-octagon fa-fw me-1"></i>Canceled Booking
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-3">
                <i class="bi bi-patch-check fa-fw me-1"></i>Completed Booking
              </a>
            </li>
          </ul>

          {/* <!-- Tabs content START --> */}
          <div class="tab-content p-2 p-sm-4" id="nav-tabContent">
            {!loadingState ? (
              <>
                {/* <!-- Tab content item START --> */}
                <Upcoming bookingData={upcomeing} />
                {/* <!-- Tabs content item END --> */}

                {/* <!-- Tab content item START --> */}
                <Canceled bookingData={canceled} />
                {/* <!-- Tabs content item END --> */}

                {/* <!-- Tab content item START --> */}
                <Completed bookingData={completed} />
                {/* <!-- Tabs content item END --> */}
              </>
            ) : (
              <>
                {scaleteon.map(() => (
                  <div className="my-3">
                    <ScaletonBooking />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default MyBooking;
