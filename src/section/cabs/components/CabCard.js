import { serverUrl } from "@/util/server";
import React from "react";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSerach } from "@/redux/slice/CabBookingSlice";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constant";

function CabCard({ data }) {
  const {
    cab: { cabsSearch },
    booking,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const router = useRouter();

  const onClickBookNow = (cabfare) => {
    console.log(cabfare);
    const cabDetaildParams = {
      ...cabsSearch,
      bookinInfo: booking,
      total_km: data?.total_km,
      cabDetaild: {
        id: data?.id,
        cabName: data?.name,
        cabCategory: data?.category?.name,
        ac: data?.ac,
        fule: cabfare?.fule || cabfare?.pkg?.fules,
        img: data?.img,
        fareId: cabfare.fuleID || cabfare?.pkg?.id,
      },
    };
    console.log(cabDetaildParams);
    // return;
    router.push(
      `${appRoutes.app.cabsDetails}?qry=${JSON.stringify(cabDetaildParams)}`
    );
    // console.log(cabDetaildParams);
  };
  if (data?.total_fare?.length < 1 || data?.hourly_pkg?.length < 1) {
    return null;
  }

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
                <div class={`col-sm-6 col-md-8 col-xl-9`}>
                  <h4 class="card-title mb-2">
                    <a href="cab-detail.html" class="stretched">
                      {data?.name}
                    </a>
                  </h4>
                  {/* <!-- Nav divider --> */}
                  <ul class="nav nav-divider h6 fw-normal mb-2">
                    {
                      Number(data?.is_categorie) && (
                        <></>
                      ) : (<>
                        <li class="nav-item">
                      {data?.category?.name?.toUpperCase()}
                    </li>
                      </>
                      )
                    }
                    
                    <li class="nav-item">AC</li>
                    {cabsSearch?.tripType == "Hourly Rentals" ? (
                      <li class="nav-item">
                        {data?.hourly_pkg?.map((data, index) => (
                          <span class="nav-item" key={index}>
                            {data?.fule}
                          </span>
                        ))}
                        <ul className="nav nav-divider h6 fw-normal mb-2"></ul>
                      </li>
                    ) : (
                      <li class="nav-item">
                        {data?.total_fare?.map((data, index) => (
                          <span class="nav-item" key={index}>
                            {data?.fule}
                          </span>
                        ))}
                        <ul className="nav nav-divider h6 fw-normal mb-2"></ul>
                      </li>
                    )}
                  </ul>

                  {/* <!-- Rating Star --> */}
                  {cabsSearch?.tripType == "Hourly Rentals" ? (
                    <>
                      <ul
                        class="nav nav-pills nav-responsive nav-pills-dark"
                        id="pills-tab-2"
                        role="tablist"
                      >
                        {data?.hourly_pkg?.map((fare, key) => (
                          <li class="nav-item" key={key} role="presentation">
                            <button
                              class={`nav-link mb-0 rounded mx-1 ${
                                key == 0 ? "active" : ""
                              }`}
                              id={`pills-${fare.fule}-${key}-tab`}
                              data-bs-toggle="pill"
                              data-bs-target={`#pills-${fare.fule}-${key}`}
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
                      {data?.total_fare?.length > 1 ? (
                        <>
                          <ul
                            class="nav nav-pills nav-responsive nav-pills-dark"
                            id="pills-tab-2"
                            role="tablist"
                          >
                            {data.total_fare.map((fare, key) => (
                              <li
                                class="nav-item"
                                key={key}
                                role="presentation"
                              >
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
                          {data?.total_fare?.map((data, key) => (
                            <div
                              key={key}
                              class="col-sm-6 col-md-12 col-xl-12 text-sm-end"
                            >
                              {/* <!-- Discount --> */}
                              {/* <p class="text-danger mb-0">4% Off</p> */}
                              {/* <!-- Price --> */}
                              <p class="list-item h5 mb-0">₹ {data?.Fare}</p>
                              <p class="list-item p mb-0">
                                + ₹{data?.service_and_tax} (Taxes & Charges)
                              </p>
                              <button
                                onClick={() => onClickBookNow(data)}
                                class="btn btn-dark mb-0 w-sm-100"
                              >
                                Book Now
                              </button>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/* <!-- Row END --> */}
            </div>
            {/* <!-- Card body END --> */}

            {/* <!-- Card footer START --> */}
            <div class="tab-content" id="pills-tabContent3">
              {cabsSearch?.tripType == "Hourly Rentals" ? (
                <>
                  {data?.hourly_pkg?.map((data, key) => (
                    <div
                      key={key}
                      class={`tab-pane fade ${key == 0 ? "show active" : ""}`}
                      id={`pills-${data.fule}-${key}`}
                      role="tabpanel"
                      aria-labelledby={`pills-${data.fule}-${key}-tab`}
                    >
                      <ul
                        style={{ overflowX: "scroll", flexWrap: "nowrap" }}
                        className="nav nav-pills nav-responsive nav-pills-dark"
                        id="pills-tab-2"
                        role="tablist"
                      >
                        {data?.pkg?.map((packageData, key) => (
                          <li
                            className="nav-item"
                            key={key}
                            role="presentation"
                          >
                            <button
                              className={`nav-link mb-0 rounded mx-1 ${
                                cabsSearch?.pkg === packageData.pkg.hours
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                dispatch(
                                  addSerach({
                                    key: "pkg",
                                    value: packageData?.pkg?.hours,
                                  })
                                )
                              }
                              id={`pills-${packageData?.pkg.id}-tab`}
                              data-bs-toggle="pill"
                              data-bs-target={`#pills-${packageData?.pkg.id}`}
                              type="button"
                              role="tab"
                              aria-controls={`pills-${packageData?.pkg?.id}`}
                              aria-selected={key === 0 ? "true" : "false"}
                            >
                              {`${packageData?.pkg?.hours} ( ${packageData?.pkg?.range} km )`}
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="tab-content" id="pills-tabContent-2">
                        {data?.pkg?.map((packageData, key) => (
                          <div
                            key={key}
                            className={`tab-pane fade ${
                              cabsSearch?.pkg === packageData?.pkg?.hours
                                ? "show active"
                                : ""
                            }`}
                            id={`pills-${packageData.pkg.id}`}
                            role="tabpanel"
                            aria-labelledby={`pills-${packageData.pkg.id}-tab`}
                          >
                            <div className="card-footer border-top p-0 pt-3">
                              <div className="row">
                                {/* List */}
                                <div className="col-md-6">
                                  <ul className="list-group list-group-borderless mb-0">
                                    <li className="list-group-item d-flex pb-0 mb-0">
                                      <span className="h6 fw-normal mb-0">
                                        <i className="bi bi-check-circle me-2"></i>
                                        {packageData?.pkg?.range} Kms included.
                                        After that{" "}
                                        {packageData?.pkg?.extra_km_fare} ₹/Kms
                                      </span>
                                    </li>
                                    <li className="list-group-item d-flex pb-0 mb-0">
                                      <span className="h6 fw-normal mb-0">
                                        <i className="bi bi-check-circle me-2"></i>
                                        {packageData?.pkg?.hours} included.
                                        After that{" "}
                                        {
                                          packageData?.pkg
                                            ?.pkg_price_per_extra_hours
                                        }{" "}
                                        ₹/ Per Hour
                                      </span>
                                    </li>
                                    <li className="list-group-item d-flex pb-0 mb-0">
                                      <span className="h6 fw-normal mb-0">
                                        <i className="bi bi-check-circle me-2"></i>
                                        2 luggage bags
                                      </span>
                                    </li>
                                    <li className="list-group-item d-flex pb-0 mb-0">
                                      <span className="h6 fw-normal mb-0">
                                        <i className="bi bi-check-circle me-2"></i>
                                        {packageData?.pkg?.fules?.toUpperCase()}{" "}
                                        Car
                                      </span>
                                    </li>
                                  </ul>
                                </div>

                                {/* Info */}
                                <div className="col-md-6 text-end mt-5">
                                  {/* Discount */}
                                  <div>
                                    <ul className="list-inline mb-1">
                                      <li className="list-inline-item text-decoration-line-through me-1">
                                        {/* Original Price */}
                                      </li>
                                      <li className="list-inline-item h5 mb-0">
                                        ₹ {packageData?.pkg.pkg_price}
                                      </li>
                                      <li className="p text-muted mb-0">
                                        + ₹{packageData?.tax_fees.taxandfees}{" "}
                                        (Taxes & Charges)
                                      </li>
                                    </ul>
                                    <button
                                      onClick={() =>
                                        onClickBookNow(packageData)
                                      }
                                      className="btn btn-dark mb-0 w-sm-100"
                                    >
                                      Book Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {data?.total_fare?.map((fare, key) => (
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
                                    <i class="bi bi-check-circle me-2"></i>2
                                    luggage bags{" "}
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
                            <div class="col-md-6 text-end mt-5">
                              {/* <!-- Discount --> */}
                              {data?.total_fare?.length > 1 ? (
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
                                      + ₹{fare?.service_and_tax} (Taxes &
                                      Charges)
                                    </li>
                                  </ul>
                                  <button
                                    onClick={() => onClickBookNow(fare)}
                                    class="btn btn-dark mb-0 w-sm-100"
                                  >
                                    Book Now
                                  </button>
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
                </>
              )}
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
