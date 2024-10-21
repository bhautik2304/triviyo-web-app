import { appRoutes } from "@/constant";
import moment from "moment";
import React, { useState } from "react";

function CabBookingCard({ data }) {
  console.log(data);
  const [showDetaild, setShowDetaild] = useState(false);
  const { booking_id, cab } = data;
  return (
    <>
      {/* <!-- Card item START --> */}
      <div class="card border my-3">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          {/* <!-- Icon and Title --> */}
          <div className="d-md-flex justify-content-md-between align-items-center">
            <div class="d-flex align-items-center">
              <div class="icon-lg bg-light rounded-circle flex-shrink-0">
                <i class="fa-solid fa-car"></i>
              </div>
              {/* <!-- Title --> */}
              <div class="ms-2">
                <h6 class="card-title mb-0">{}</h6>
                <ul class="nav nav-divider small">
                  <li class="nav-item">Booking ID: {booking_id}</li>
                  <li class="nav-item">{data?.trip_type}</li>
                  <li class="nav-item">{cab?.name}</li>
                </ul>
              </div>
            </div>
            {/* <!-- Button --> */}
            <div class="mt-2 mt-md-0">
              <a
                href={`${appRoutes.app.bookingConfirmation}?booking_id=${data?.booking_id}`}
                class="btn btn-primary-soft mb-0"
              >
                Show Booking
              </a>
            </div>
          </div>
          <div className="d-md-flex justify-content-md-between align-items-center mt-2">
            <div class="d-flex align-items-center">
              {/* <!-- Title --> */}
              <div class="ms-2">
                <h6 class="card-title mb-0">{}</h6>
                <ul class="nav nav-divider small">
                  <li class="nav-item">
                    Booking Status:{" "}
                    <span
                      className={`btn btn-${
                        data?.trip_status == "upcomeing"
                          ? "success"
                          : data?.trip_status == "pending"
                          ? "warning"
                          : "denger"
                      }-soft btn-sm`}
                    >
                      {`${
                        data?.trip_status == "upcomeing"
                          ? "confirm"
                          : data?.trip_status == "pending"
                          ? "payment pending"
                          : "canceled"
                      }`?.toUpperCase()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="d-md-flex justify-content-md-between align-items-center">
            <div>
              {data?.trip_type == "Round Trip" ||
              data?.trip_type == "One Way" ? (
                <>
                  <span className="fw-bold">
                    {data?.pickup_location?.city_name}
                  </span>{" "}
                  to{" "}
                  <span className="fw-bold">
                    {data?.drop_location?.city_name}
                  </span>
                </>
              ) : data?.trip_type == "Airport Transfers" ? (
                <>
                  <span className="fw-bold">
                    {data?.pickup_location?.city_name}
                  </span>{" "}
                  to{" "}
                  <span className="fw-bold">
                    {data?.drop_location?.address}
                  </span>
                </>
              ) : (
                <span className="fw-bold">
                  {data?.pickup_location?.address}
                </span>
              )}
            </div>

            <span
              // href="#"
              style={{ cursor: "pointer", width: 120 }}
              onClick={() => setShowDetaild(!showDetaild)}
              className="link link-primary"
            >
              Know more....
            </span>
          </div>
        </div>

        {showDetaild && (
          <>
            {/* <!-- Card body --> */}
            <ul class="nav nav-tabs nav-bottom-line nav-responsive nav-justified">
              <li class="nav-item">
                <a
                  class="nav-link mb-0 active"
                  data-bs-toggle="tab"
                  href={`#tab-4-${data?.booking_id}`}
                >
                  <i class="bi bi-geo-alt-fill fa-fw me-1"></i>Pickup & Drop
                  Address
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link mb-0"
                  data-bs-toggle="tab"
                  href={`#tab-5-${data?.booking_id}`}
                >
                  <i class="bi bi-person fa-fw me-1"></i>Panseger Detaild
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link mb-0"
                  data-bs-toggle="tab"
                  href={`#tab-6-${data?.booking_id}`}
                >
                  <i class="fa-solid fa-car fa-fw me-1"></i>Cab Detail
                </a>
              </li>
            </ul>
            <div class="card-body">
              <div class="tab-content p-2 p-sm-4" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id={`tab-4-${data?.booking_id}`}
                >
                  <div class="row g-3">
                    <div class="col-sm-6 col-md-4">
                      <span>Pickup address</span>
                      <h6 class="mb-0">
                        {`${data?.pickup_location?.h_no} ${data?.pickup_location?.street_name} ${data?.pickup_location?.address}`}
                      </h6>
                    </div>
                    {data?.trip_status != "Hourly Rentals" && (
                      <div class="col-sm-6 col-md-4">
                        <span>Drop address</span>
                        <h6 class="mb-0">
                          {`${data?.drop_location?.h_no} ${data?.drop_location?.street_name} ${data?.drop_location?.address}`}
                        </h6>
                      </div>
                    )}
                  </div>
                  <div class="row g-3 mt-3">
                    <div class="col-sm-6 col-md-4">
                      <span>Pickup Time</span>
                      <h6 class="mb-0">
                        {moment(
                          `${data?.pickup_date} ${data?.pickup_time}`,
                          "YYYY-MM-DD HH:mm"
                        ).format("DD MMM YYYY hh:mm A")}
                      </h6>
                    </div>
                    {data?.trip_type == "Round Trip" && (
                      <div class="col-sm-6 col-md-4">
                        <span>Drop Time & Date</span>
                        <h6 class="mb-0">
                          {moment(
                            `${data?.drop_date} ${data?.drop_time}`,
                            "YYYY-MM-DD HH:mm"
                          ).format("DD MMM YYYY hh:mm A")}
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
                <div class="tab-pane fade" id={`tab-5-${data?.booking_id}`}>
                  <div class="row g-3">
                    <div class="col-sm-6 col-md-4">
                      <span>Contact Person Name</span>
                      <h6 class="mb-0">{data?.customer?.name}</h6>
                    </div>

                    <div class="col-sm-6 col-md-4">
                      <span>Contact Person Number</span>
                      <h6 class="mb-0">{data?.customer?.number}</h6>
                    </div>

                    <div class="col-md-4">
                      <span>Contact Person Email</span>
                      <h6 class="mb-0">{data?.customer?.email}</h6>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id={`tab-6-${data?.booking_id}`}>
                  <div className="col-12">
                    <div className="alert alert-warning">
                      <span>
                        {data?.trip_status == "pending" &&
                          "After Payment Confirmation, "}
                        Cab and driver details will be shared with you one hour
                        before the pickup time via your registered WhatsApp, My
                        Booking Page, and Email. (Scheduled for{" "}
                        {moment(
                          `${data?.pickup_date} ${data?.pickup_time}`,
                          "YYYY-MM-DD HH:mm"
                        )
                          .subtract(1, "hours")
                          .format("DD MMM YYYY hh:mm A")}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="" className="btn me-2 btn-sm btn-primary-soft">
                Download Invoice
              </a>
              <a href="" className="btn me-2 btn-sm btn-primary-soft">
                Show Trip Detaild
              </a>
              {data?.trip_status == "upcomeing" && (
                <>
                  <a href="" className="btn me-2 btn-sm btn-warning-soft">
                    Help
                  </a>
                  <a href="" className="btn me-2 btn-sm btn-danger-soft">
                    Cancele Trip
                  </a>
                </>
              )}
            </div>
          </>
        )}
        <div className="px-4">
          {data?.payment_status?.payment_status != "payment_successfull" && (
            <>
              <div className="alert alert-sm alert-danger">
                <span>
                  Your payment is pending. Your booking will be canceled after{" "}
                  {moment(
                    `${data?.pickup_date} ${data?.pickup_time}`,
                    "YYYY-MM-DD HH:mm"
                  ).format("MMMM DD, YYYY,")}{" "}
                  at{" "}
                  {moment(
                    `${data?.pickup_date} ${data?.pickup_time}`,
                    "YYYY-MM-DD HH:mm"
                  ).format("hh:mm A")}
                  . <br />
                  To confirm your booking, please make the{" "}
                  <a
                    className="btn btn-sm btn-primary-soft"
                    href={`${appRoutes.app.bookingConfirmation}?booking_id=${data?.booking_id}`}
                  >
                    Pay now
                  </a>{" "}
                </span>
              </div>
            </>
          )}
        </div>

        {!showDetaild && data?.trip_status == "upcomeing" && (
          <div class="card-body">
            <div className="col-12 mt-3">
              <div className="alert alert-warning">
                <span>
                  {data?.trip_status == "pending" &&
                    "After Payment Confirmation, "}
                  Cab and driver details will be shared with you one hour before
                  the pickup time via your registered WhatsApp, My Booking Page,
                  and Email. (Scheduled for{" "}
                  {moment(
                    `${data?.pickup_date} ${data?.pickup_time}`,
                    "YYYY-MM-DD HH:mm"
                  )
                    .subtract(1, "hours")
                    .format("DD MMM YYYY hh:mm A")}
                  )
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <!-- Card item END --> */}
    </>
  );
}

export default CabBookingCard;
