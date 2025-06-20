"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CabFinder from "./CabFinder";
import CabFilter from "./CabFilter";
import CabList from "./CabList";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { fetchCabs } from "@/redux/thunk/cab";
import { changeTripData } from "@/redux/slice/CabBookingSlice";

function Cabs() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));

  useEffect(() => {
    setData(qry_params);
    console.log(qry_params);
    const params = {
      location: qry_params?.stopOvers, // Example locations
      trip: qry_params?.tripType,
      cabsType: "all",
    };
    dispatch(fetchCabs(params));
    dispatch(changeTripData(qry_params));
  }, []);

  const { cabs, totaleKm, loading, cabsSearch } = useSelector(
    (state) => state.cab
  );

  return (
    <>
      <CabFinder />
      <section class="pt-6">
        <div class="container position-relative">
          {/* <!-- Title and button START --> */}
          <div class="row">
            <div class="col-12">
              <div class="d-sm-flex justify-content-sm-between align-items-center">
                {/* <!-- Title --> */}
                <div class="mb-2 mb-sm-0">
                  <h1 class="fs-3 mb-2">{cabs?.length} Cabs Available</h1>
                  {/* <!-- Divider --> */}
                  <ul class="nav nav-divider h6 mb-0">
                    <li class="nav-item">
                      {loading ? `${cabsSearch?.tripType} trip` : "---"}
                    </li>
                    <li class="nav-item">
                      {loading
                        ? cabsSearch?.tripType == "Hourly Rentals"
                          ? cabsSearch?.pkg
                          : `${totaleKm} kms`
                        : "---"}
                    </li>
                  </ul>
                </div>

                {/* <!-- Offcanvas Button --> */}
                <button
                  class="btn btn-primary-soft btn-primary-check d-xl-none mb-0"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSidebar"
                  aria-controls="offcanvasSidebar"
                >
                  <i class="fa-solid fa-sliders-h me-1"></i> Show filters
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Title and button END --> */}
        </div>
      </section>
      <section class="pt-0">
        <div class="container" data-sticky-container>
          <div class="row">
            <CabFilter />
            <CabList />
          </div>
        </div>
      </section>
    </>
  );
}

export default Cabs;

const Suspense = ({ loading, data }) => {
  if (loading) {
    return <>{data}</>;
  } else {
    return <Skeleton variant="text" />;
  }
};
