import React, { useEffect, useState } from "react";
import { DateInput, GmapPlaceSearch, TimeInput } from "@/components";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { OneWay, RoundTrip, AirportTransfer, HourlyRental } from "./cabfinder/";
import { useDispatch, useSelector } from "react-redux";
import {
  addStopOver,
  changeTripData,
  emptyCabList,
} from "@/redux/slice/cabBookingSlice";
import { Radio, FormControlLabel } from "@mui/material";
import { fetchCabs } from "@/redux/thunk/cab";

const defaultAddress = {
  label: "Surat, Gujarat, India",
  id: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  name: "Surat, Gujarat, India",
  placeId: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  lat: 21.1702401,
  lng: 72.83106070000001,
};

const tripTypeOption = {
  ow: "One Way",
  rt: "Round Trip",
  at: "Airport Transfers",
  hr: "Hourly Rentals",
};

const airportTripOption = {
  pickupToAirport: "Pickup To Airport",
  dropToAirport: "Drop To Airport",
};

const tripData = {
  tripType: "Round Trip",
  fromCity: {},
  toCity: defaultAddress,
  stopOvers: [],
  pkg: "",
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  dropTime: "",
  stop: "",
  airport: null,
};

function CabFinder() {
  const [data, setData] = useState({});

  const qry = useSearchParams();
  const dispatch = useDispatch();

  const qry_params = JSON.parse(qry.get("qry"));
  const { cabsSearch } = useSelector((state) => state.cab);
  useEffect(() => {
    setData(cabsSearch);
  }, [cabsSearch]);

  return (
    <>
      <section class="bg-primary">
        <div class="container">
          <div class="row">
            <div class="col-12">
              {/* <!-- Booking from START --> */}
              <div class="form-control-bg-light bg-mode border p-4 rounded-3">
                <div class="row g-4">
                  {/* <!-- Nav tabs START --> */}
                  <div class="col-lg-8">
                    <div
                      class="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <FormControlLabel
                        value="One Way"
                        control={
                          <Radio
                            sx={{
                              color: "#5143d9",
                              "&.Mui-checked": {
                                color: "#5143d9",
                              },
                            }}
                          />
                        }
                        label="One Way"
                        onChange={() => {
                          const newOneWay = {
                            ...cabsSearch,
                            tripType: tripTypeOption.ow,
                            fromCity: data?.fromCity,
                            toCity: data?.toCity || defaultAddress,
                            stopOvers: [
                              data?.fromCity || null,
                              data?.toCity || defaultAddress,
                            ],
                          };
                          console.log("one way", newOneWay);

                          setData(newOneWay);
                          dispatch(changeTripData(newOneWay));
                          if (data?.fromCity && data?.fromCity) {
                            const params = {
                              location: qry_params?.stopOvers, // Example locations
                              trip: tripTypeOption.ow,
                              cabsType: "all",
                            };
                            dispatch(fetchCabs(params));
                          } else {
                            dispatch(emptyCabList());
                          }
                        }}
                        checked={data?.tripType == tripTypeOption.ow}
                      />
                      <FormControlLabel
                        value={tripTypeOption.rt}
                        control={
                          <Radio
                            sx={{
                              color: "#5143d9",
                              "&.Mui-checked": {
                                color: "#5143d9",
                              },
                            }}
                          />
                        }
                        label={tripTypeOption.rt}
                        onChange={() => {
                          const newroundTrip = {
                            ...cabsSearch,
                            tripType: tripTypeOption.rt,
                            fromCity: data?.fromCity || null,
                            toCity: data?.toCity || defaultAddress,
                          };
                          setData(newroundTrip);
                          dispatch(changeTripData(newroundTrip));
                          if (data?.fromCity && data?.fromCity) {
                            const params = {
                              location: qry_params?.stopOvers, // Example locations
                              trip: tripTypeOption.ow,
                              cabsType: "all",
                            };
                            dispatch(fetchCabs(params));
                          } else {
                            dispatch(emptyCabList());
                          }
                        }}
                        checked={data?.tripType == tripTypeOption.rt}
                      />
                      <FormControlLabel
                        value={tripTypeOption.at}
                        control={
                          <Radio
                            sx={{
                              color: "#5143d9",
                              "&.Mui-checked": {
                                color: "#5143d9",
                              },
                            }}
                          />
                        }
                        label={tripTypeOption.at}
                        onChange={() => {
                          const newairportTransfer = {
                            ...cabsSearch,
                            tripType: tripTypeOption.at,
                            tripType: "Airport Transfers",
                            trip: airportTripOption.pickupToAirport,
                          };
                          console.log("newairportTransfer", newairportTransfer);
                          setData(newairportTransfer);
                          dispatch(changeTripData(newairportTransfer));
                          dispatch(emptyCabList());
                        }}
                        checked={data?.tripType === tripTypeOption.at}
                      />
                      <FormControlLabel
                        value={tripTypeOption.hr}
                        control={
                          <Radio
                            sx={{
                              color: "#5143d9",
                              "&.Mui-checked": {
                                color: "#5143d9",
                              },
                            }}
                          />
                        }
                        label={tripTypeOption.hr}
                        onChange={() => {
                          const newhorlyRentals = {
                            ...cabsSearch,
                            tripType: tripTypeOption.hr,
                            fromCity: data?.fromCity || null,
                            pkg: "1 hrs",
                            pickupDate: data?.pickupDate,
                            pickupTime: data?.pickupTime,
                          };
                          console.log("newhorlyRentals", newhorlyRentals);
                          setData(newhorlyRentals);
                          dispatch(changeTripData(newhorlyRentals));
                          const params = {
                            location: qry_params?.stopOvers, // Example locations
                            trip: tripTypeOption.hr,
                            cabsType: "all",
                          };
                          dispatch(fetchCabs(params));
                        }}
                        checked={data?.tripType === tripTypeOption.hr}
                      />
                    </div>
                  </div>
                  {/* <!-- Nav tabs END --> */}
                </div>

                {/* <!-- Tab content START --> */}
                <div class="tab-content mt-0" id="pills-tabContent">
                  {/* <!-- One way tab START --> */}
                  <div
                    class={`tab-pane fade ${
                      data?.tripType == tripTypeOption.ow && "active show"
                    }`}
                    id="cab-one-way"
                    role="tabpanel"
                    aria-labelledby="cab-one-way-tab"
                  >
                    {data?.tripType == tripTypeOption.ow && (
                      <OneWay data={data} />
                    )}
                  </div>
                  {/* <!-- One way tab END --> */}
                  {/* <!-- Round way tab END --> */}
                  <div
                    class={`tab-pane fade ${
                      data?.tripType == tripTypeOption.rt && "active show"
                    }`}
                    id="cab-Round-Trip"
                    role="tabpanel"
                    aria-labelledby="cab-Round-Trip-tab"
                  >
                    {data?.tripType == tripTypeOption.rt && (
                      <RoundTrip data={data} />
                    )}
                  </div>
                  <div
                    class={`tab-pane fade ${
                      data?.tripType == tripTypeOption.at && "active show"
                    }`}
                    id="cab-Airport-Transfers"
                    role="tabpanel"
                    aria-labelledby="cab-Airport-Transfers-tab"
                  >
                    {data?.tripType == tripTypeOption.at && (
                      <AirportTransfer data={data} />
                    )}
                  </div>
                  <div
                    class={`tab-pane fade ${
                      data?.tripType == tripTypeOption.hr && "active show"
                    }`}
                    id="cab-Hourly-Rentals"
                    role="tabpanel"
                    aria-labelledby="cab-Hourly-Rentals-tab"
                  >
                    {data?.tripType == tripTypeOption.hr && (
                      <HourlyRental data={data} />
                    )}
                  </div>
                  {/* <!-- Round way tab END --> */}
                </div>
                {/* <!-- Tab content END --> */}
              </div>
              {/* <!-- Booking from END --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CabFinder;
