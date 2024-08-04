import { serverUrl } from "@/util/server";
import React from "react";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

function CabCard({ data }) {
  return (
    <>
      {data ? (
        <>
          {/* <!-- Cab item START --> */}
          <div class="card border p-4">
            {/* <!-- Card body START --> */}
            <div class="card-body p-0">
              <div class="row g-2 g-sm-4 mb-4">
                {/* <!-- Card image --> */}
                <div class="col-md-4 col-xl-3">
                  <div class="bg-light rounded-3 px-4 py-5">
                    <img src={serverUrl(data?.img)} alt="" />
                  </div>
                </div>

                {/* <!-- Card title and rating --> */}
                <div
                  class={`col-sm-6 ${
                    data?.total_fare.length > 1
                      ? "col-md-6 col-xl-6"
                      : "col-md-3 col-xl-5"
                  }`}
                >
                  <h4 class="card-title mb-2">
                    <a href="cab-detail.html" class="stretched">
                      {data?.name}
                    </a>
                  </h4>
                  {/* <!-- Nav divider --> */}
                  <ul class="nav nav-divider h6 fw-normal mb-2">
                    <li class="nav-item">
                      {data?.category?.name?.toUpperCase()}
                    </li>
                    <li class="nav-item">AC</li>
                    <li class="nav-item">
                      {data?.total_fare.map((data, index) => (
                        <span class="nav-item" key={index}>
                          {data?.fule}
                        </span>
                      ))}
                      <ul className="nav nav-divider h6 fw-normal mb-2"></ul>
                    </li>
                  </ul>

                  {/* <!-- Rating Star --> */}
                </div>

                {data?.total_fare.length > 1 ? (
                  <>
                    <ul
                      class="nav nav-pills nav-responsive nav-pills-dark"
                      id="pills-tab-2"
                      role="tablist"
                    >
                      {data.total_fare.map((fare, key) => (
                        <li class="nav-item" key={key} role="presentation">
                          <button
                            class={`nav-link mb-0 rounded mx-1 ${
                              key == 0 ? "active" : ""
                            }`}
                            id={`pills-${fare.fule}-${data.id}-tab`}
                            data-bs-toggle="pill"
                            data-bs-target={`#pills-${fare.fule}-${data.id}`}
                            type="button"
                            role="tab"
                            aria-selected="true"
                          >
                            {fare.fule}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    {data.total_fare.map((data, key) => (
                      <div
                        key={key}
                        class="col-sm-6 col-md-4 col-xl-4 text-sm-end"
                      >
                        {/* <!-- Discount --> */}
                        {/* <p class="text-danger mb-0">4% Off</p> */}
                        {/* <!-- Price --> */}
                        <ul class="list-inline mb-1">
                          <li class="list-inline-item text-decoration-line-through me-1">
                            {/* $250 */}
                          </li>
                          <li class="list-inline-item h5 mb-0">
                            ₹ {data?.Fare}
                          </li>
                          <li class="list-inline-item p mb-0">
                            + ₹{data?.service_and_tax} (Taxes & Charges)
                          </li>
                        </ul>
                        <a href="#" class="btn btn-dark mb-0">
                          Book Now
                        </a>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* <!-- Row END --> */}
            </div>
            {/* <!-- Card body END --> */}

            {/* <!-- Card footer START --> */}
            <div class="tab-content" id="pills-tabContent3">
              {data.total_fare.map((fare, key) => (
                <>
                  <div
                    key={key}
                    class={`tab-pane fade ${key == 0 ? "show active" : ""}`}
                    id={`pills-${fare.fule}-${data.id}`}
                    role="tabpanel"
                    aria-labelledby={`pills-${fare.fule}-${data.id}-tab`}
                  >
                    <div class="card-footer border-top p-0 pt-3">
                      <div class="row">
                        {/* <!-- List --> */}
                        <div class="col-md-6">
                          <ul class="list-group list-group-borderless mb-0">
                            <li class="list-group-item d-flex pb-0 mb-0">
                              <span class="h6 fw-normal mb-0">
                                <i class="bi bi-check-circle me-2"></i>
                                {data?.total_km}Kms included. After that{" "}
                                {fare.extra_km_fare} ₹/Kms
                              </span>
                            </li>
                            <li class="list-group-item d-flex pb-0 mb-0">
                              <span class="h6 fw-normal mb-0">
                                <i class="bi bi-check-circle me-2"></i>2 luggage
                                bags{" "}
                              </span>
                            </li>
                            <li class="list-group-item d-flex pb-0 mb-0">
                              <span class="h6 fw-normal mb-0">
                                <i class="bi bi-check-circle me-2"></i>
                                {fare.fule.toUpperCase()} Car
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* <!-- Info --> */}
                        <div class="col-md-6 d-flex justify-content-end">
                          {/* <!-- Discount --> */}
                          {data?.total_fare.length > 1 ? (
                            <div>
                              {/* <p class="text-danger mb-0">4% Off</p> */}
                              {/* <!-- Price --> */}
                              <ul class="list-inline mb-1">
                                <li class="list-inline-item text-decoration-line-through me-1">
                                  {/* $250 */}
                                </li>
                                <li class="list-inline-item h5 mb-0">
                                  ₹ {fare?.Fare}
                                </li>
                                <li class=" p text-muted mb-0">
                                  + ₹{fare?.service_and_tax} (Taxes & Charges)
                                </li>
                              </ul>
                              <a href="#" class="btn btn-dark mb-0">
                                Book Now
                              </a>
                            </div>
                          ) : (
                            <span></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {/* <!-- card footer END --> */}
          </div>
          {/* <!-- Cab item END --> */}
        </>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: 250,
              borderRadius: 5,
              my: 0.1,
            }}
          />
        </>
      )}
    </>
  );
}

export default CabCard;
