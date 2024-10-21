import { appRoutes } from "@/constant";
import { siteUrl } from "@/util/server";
import React from "react";

function NoBooking() {
  return (
    <>
      {/* <!-- Content --> */}
      <div class="bg-mode shadow p-4 rounded overflow-hidden">
        <div class="row g-4 align-items-center">
          <div class="col-md-8">
            <h6>Looks like you have never booked with BOOKING</h6>
            <h4 class="mb-2">When you book your trip will be shown here.</h4>
            {/* <div className="row g-4"></div> */}
            <a
              href={appRoutes.home}
              class="btn mb-sm-3 mb-md-0 mb-lg-0 btn-primary-soft mb-0"
            >
              Start booking now
            </a>
          </div>
          {/* <!-- Image --> */}
          <div class="col-md-4 text-center">
            {/* <!-- Download app --> */}
            <div class="col-lg-12 col-xl-12 col-xxl-12 ms-xxl-auto">
              <img
                src={siteUrl("/assets/images/element/17.svg")}
                class=""
                style={{
                  height: 210,
                  width: 210,
                }}
                alt=""
              />
              <div class="row mb-4 g-3">
                {/* <!-- Google play store button --> */}
                <div class="col-6 col-sm-4 col-md-3 col-lg-6">
                  <a href="#">
                    {" "}
                    <img
                      src={siteUrl("/assets/images/element/google-play.svg")}
                      alt=""
                    />{" "}
                  </a>
                </div>
                {/* <!-- App store button --> */}
                <div class="col-6 col-sm-4 col-md-3 col-lg-6">
                  <a href="#">
                    {" "}
                    <img
                      src={siteUrl("/assets/images/element/app-store.svg")}
                      alt=""
                    />{" "}
                  </a>
                </div>
              </div>
              <h5 class="mb-4">Download app</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoBooking;
