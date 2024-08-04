import { fetchCabs } from "@/redux/thunk/cab";
import { Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CabFilter() {
  const { cabs, loading } = useSelector((state) => state.cab);
  return (
    <>
      <aside class="col-xl-4 col-xxl-3">
        <div data-sticky data-margin-top="80" data-sticky-for="1199">
          {/* <!-- Responsive offcanvas body START --> */}
          <div
            class="offcanvas-xl offcanvas-end"
            tabindex="-1"
            id="offcanvasSidebar"
            aria-labelledby="offcanvasSidebarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasSidebarLabel">
                Advance Filters
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-label="Close"
              ></button>
            </div>
            {/* <!-- Offcanvas body --> */}
            <div class="offcanvas-body flex-column p-3 p-xl-0">
              <div class="rounded-3 shadow">
                {/* <!-- Passenger capacity START --> */}
                <div class="card card-body rounded-0 rounded-top p-4">
                  {/* <!-- Title --> */}
                  <h6 class="mb-2">Passenger capacity</h6>
                  {/* <!-- Checkbox --> */}
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="popolarType1"
                    />
                    <label class="form-check-label" for="popolarType1">
                      4 passenger seats
                    </label>
                  </div>
                  {/* <!-- Checkbox --> */}
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="popolarType2"
                    />
                    <label class="form-check-label" for="popolarType2">
                      6 passenger seats
                    </label>
                  </div>
                </div>
                {/* <!-- Passenger capacity END --> */}

                <hr class="my-0" />
                {/* <!-- Divider --{">"} */}

                <hr class="my-0" />
                {/* <!-- Divider --> */}

                {/* <!-- Car model START --> */}
                <div class="card card-body rounded-0 rounded-bottom p-4">
                  {/* <!-- Title --> */}
                  <h6 class="mb-2">Car model</h6>
                  {loading ? (
                    cabs?.map((data, key) => (
                      <div class="form-check" key={key}>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="lauoverType1"
                        />
                        <label class="form-check-label" for="lauoverType1">
                          {data?.name} or similar
                        </label>
                      </div>
                    ))
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </div>
                {/* <!-- Car model END --> */}
              </div>
              {/* <!-- Form End --> */}
            </div>

            {/* <!-- Buttons --> */}
            <div class="d-flex justify-content-between p-2 p-xl-0 mt-xl-4">
              <button class="btn btn-link p-0 mb-0">Clear all</button>
              <button class="btn btn-primary mb-0">Filter Result</button>
            </div>
          </div>
          {/* <!-- Responsive offcanvas body END --> */}
        </div>
      </aside>
    </>
  );
}

export default CabFilter;
