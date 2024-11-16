"use client";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CabsPayout from "./CabsPayout";
import CabDetails from "./CabDetails";
import CustomerDetails from "./CustomerDetails";
import { getCityFromAddress } from "@/util";
import { appAxios } from "@/lib/axios";
import { api } from "@/lib/api";
import CabInclusiveOrExclusive from "./CabInclusiveOrExclusive";
import CabTermsAndCondition from "./CabTermsAndCondition";
import Signin from "@/section/auth/signin/Signin";
import {
  changeBookingDetaild,
  changePaymentMode,
} from "@/redux/slice/bookingSlice";

async function getAirportByLatLng(lat, lng) {
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/geo-place-details?lat=${lat}&lng=${lng}`;

  try {
    const response = await appAxios.get(url);
    const addressComponents = response.data.results[0].address_components;
    // Find city information
    const city = addressComponents.find((component) =>
      component.types.includes("airport")
    );
    return city ? city.long_name : null;
  } catch (error) {
    // console.error("Error fetching city:", error);
    return null;
  }
}

function CabsDetail() {
  const [km, setKm] = useState(0);
  const [origin, setorigin] = useState({});
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);

  const dispatch = useDispatch();

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));

  const { authUser } = useSelector((state) => state.user);

  const setPickupAndDrop = async () => {
    if (qry_params?.tripType == "Airport Transfers") {
      const airportAddressData = await getAirportByLatLng(
        qry_params?.airport?.lat,
        qry_params?.airport?.lng
      );
      const airportAddress = {
        houseNo: qry_params?.airport?.label,
        streetName: qry_params?.airport?.label,
        address: qry_params?.airport?.label,
        lat: qry_params?.airport?.lat,
        lng: qry_params?.airport?.lng,
        cityName: airportAddressData,
        airportName: airportAddressData,
        isAirport: true,
      };

      if (qry_params?.tripOption == "Pickup To Airport") {
        dispatch(
          changeBookingDetaild({ key: "pickupAddress", val: airportAddress })
        );
      } else {
        dispatch(
          changeBookingDetaild({ key: "dropAddress", val: airportAddress })
        );
      }
    }
  };

  useEffect(() => {
    api.cabs.getCabFare(
      qry_params,
      (data) => {
        console.log(data);
        setData(data.fare);
        console.log({
          paymentType: "HALF",
          ammount: data?.fare?.serviceAndTax,
          fare: data.fare,
        });
        dispatch(
          changePaymentMode({
            paymentType: "HALF",
            ammount: data?.fare?.serviceAndTax,
            fare: data.fare,
          })
        );
        dispatch(
          changeBookingDetaild({
            key: "totleKm",
            val: data.fare?.km,
          })
        );

        setLoading(false);
      },
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      }
    );
    console.log("qry_params?.stop", qry_params?.stop);
    dispatch(
      changeBookingDetaild({
        key: "stop",
        val: qry_params?.stop,
      })
    );
    dispatch(
      changeBookingDetaild({
        key: "stopOver",
        val: qry_params?.stopOvers,
      })
    );
    console.log();

    dispatch(
      changeBookingDetaild({ key: "cabDetaild", val: qry_params?.cabDetaild })
    );
    dispatch(
      changeBookingDetaild({ key: "pickupTime", val: qry_params?.pickupTime })
    );
    dispatch(
      changeBookingDetaild({ key: "pickupDate", val: qry_params?.pickupDate })
    );
    dispatch(
      changeBookingDetaild({ key: "returnTime", val: qry_params?.returnTime })
    );
    dispatch(
      changeBookingDetaild({ key: "returnDate", val: qry_params?.returnDate })
    );
    dispatch(
      changeBookingDetaild({ key: "tripType", val: qry_params?.tripType })
    );
    if (qry_params?.tripType == "Airport Transfers") {
      dispatch(
        changeBookingDetaild({
          key: "airportTripType",
          val: qry_params?.tripOption,
        })
      );
    }
    setPickupAndDrop();
  }, []);

  console.log(qry_params);

  return (
    <>
      <main>
        <section class="pt-4">
          <div class="container position-relative">
            {/* <!-- Title and button START --> */}
            <div class="row">
              <div class="col-12">
                {/* <!-- Meta --> */}
                <div class="d-flex justify-content-between align-items-lg-center">
                  {/* <!-- Title --> */}
                  <ul class="nav nav-divider align-items-center mb-0">
                    <li class="nav-item h6 ">
                      {qry_params?.tripType != "Airport Transfers"
                        ? `${getCityFromAddress(qry_params?.fromCity?.name)} ${
                            qry_params?.tripType != "Hourly Rentals"
                              ? `to ${getCityFromAddress(
                                  qry_params?.toCity?.name
                                )}`
                              : ""
                          }`
                        : ``}
                    </li>
                    <li class="nav-item h6 ">{qry_params?.tripType}</li>
                    <li class="nav-item h6 ">
                      Pickup Time{" "}
                      {moment(qry_params?.pickupDate).format("D MMM YYYY")} -{" "}
                      {moment(
                        `${qry_params?.pickupDate}T${qry_params?.pickupTime}`
                      ).format("HH:mm A")}
                    </li>
                    {qry_params?.tripType == "Round Trip" && (
                      <li class="nav-item h6 ">
                        Return Time{" "}
                        {moment(qry_params?.returnDate).format("D MMM YYYY")} -{" "}
                        {moment(
                          `${qry_params?.returnDate}T${qry_params?.returnTime}`
                        ).format("HH:mm A")}
                      </li>
                    )}
                  </ul>

                  {/* <!-- Buttons --> */}
                  <div class="ms-3">
                    {/* <!-- Share button --> */}
                    <a
                      href="#"
                      class="btn btn-sm btn-light px-2 mb-0"
                      role="button"
                      id="dropdownShare"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-fw fa-share-alt"></i>
                    </a>
                    {/* <!-- dropdown button --> */}
                    <ul
                      class="dropdown-menu dropdown-menu-end min-w-auto shadow rounded"
                      aria-labelledby="dropdownShare"
                    >
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fab fa-twitter-square me-2"></i>Twitter
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fab fa-facebook-square me-2"></i>Facebook
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fab fa-linkedin me-2"></i>LinkedIn
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fa-solid fa-copy me-2"></i>Copy link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Title and button END --> */}
          </div>
        </section>
        <section class="pt-0">
          <div class="container" data-sticky-container>
            <div class="row g-4">
              <div class="col-xl-8">
                <div class="vstack gap-5">
                  <CabDetails
                    data={qry_params?.cabDetaild}
                    faredata={datas}
                    loading={loading}
                  />
                  {!authUser && (
                    <div class="card border">
                      {/* <!-- Card header --> */}
                      <div class="card-header border-bottom bg-transparent">
                        <h6 class="mb-0">
                          Login Or Signup for View your traveller information &
                          unlock deals!{" "}
                        </h6>
                      </div>

                      {/* <!-- Card body START --> */}
                      <div class="card-body">
                        <Signin onlyrefresh={true} noCredite />
                      </div>
                    </div>
                  )}
                  <CustomerDetails
                    data={qry_params}
                    setPickupOpen={setPickupOpen}
                    pickupOpen={pickupOpen}
                  />
                  <CabInclusiveOrExclusive
                    data={qry_params?.cabDetaild}
                    faredata={datas}
                    loading={loading}
                  />
                  <CabTermsAndCondition
                    terms={datas?.terms}
                    cab={qry_params?.cabDetaild}
                  />
                </div>
              </div>
              <aside class="col-xl-4">
                <CabsPayout
                  fareData={datas}
                  setPickupOpen={setPickupOpen}
                  loading={loading}
                />
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CabsDetail;
