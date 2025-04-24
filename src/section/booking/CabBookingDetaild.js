import { confirmation } from "@/assets";
import { serverUrl } from "@/util/server";
import moment from "moment";
import Image from "next/image";
import React from "react";

function CabBookingDetaild({
  data: { data, terms, included_charges, extra_charges },
}) {
  const {
    cab,
    pickup_location,
    drop_location,
    payment_brack_points,
    payment_status,
    customer,
    cabbookinghourlyrentalfares,
  } = data;
  console.log(confirmation.default);

  return (
    <>
      <div class="col-xl-12 mx-auto">
        {payment_status?.payment_status !== "payment_successfull" && (
          <>
            <div className="alert alert-sm alert-danger">
              <span>
                Your payment is pending. Your booking will be canceled after{" "}
                {moment(
                  `${data?.pickup_date} ${data?.pickup_time}`,
                  "YYYY-MM-DD HH:mm"
                ).format("MMMM DD, YYYY")}{" "}
                at{" "}
                {moment(
                  `${data?.pickup_date} ${data?.pickup_time}`,
                  "YYYY-MM-DD HH:mm"
                ).format("h:mm A")}
                .
              </span>
            </div>
          </>
        )}
        <div class="vstack gap-4">
          {/* <!-- Booking summary START --> */}
          <div class="card shadow">
            {/* <!-- Card header --> */}

            {/* <!-- Card body START --> */}
            <div class="card-header border-bottom p-4">
              <h1 class="mb-0 fs-5">Booking ID : {data?.booking_id} </h1>
            </div>
            <div class="card-body p-4">
              <div class="row g-md-4">
                {/* <!-- Image --> */}
                <div class="col-md-3">
                  <div class="bg-light rounded-3 px-4 py-5 mb-3 mb-md-0">
                    <img src={serverUrl(cab?.img)} alt="" />
                  </div>
                </div>

                {/* <!-- Card and address detail --> */}
                <div class="col-md-9">
                  {/* <!-- Title --> */}
                  <h5 class="card-title mb-2">{cab?.name}</h5>
                  <ul class="nav nav-divider h6 fw-normal mb-2">
                    {!cab?.iscategory && (
                      <li class="nav-item">{cab?.category?.name}</li>
                    )}
                    <li class="nav-item">AC</li>
                    <li class="nav-item">2 Seats</li>
                  </ul>

                  {/* <!-- Pick up and drop address --> */}
                  <div class="row">
                    <div class="col-md-6">
                      <small>Pickup address</small>
                      <p class="h6 fw-light mb-md-0">
                        {`${pickup_location?.h_no}, ${pickup_location?.street_name} ${pickup_location?.address}`}
                      </p>
                    </div>

                    {data?.trip_type != "Hourly Rentals" && (
                      <div class="col-md-6">
                        <small>Drop address</small>
                        <p class="h6 fw-light mb-0">
                          {`${drop_location?.h_no}, ${drop_location?.street_name} ${drop_location?.address}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div class="col-md-3 col-sm-12 col-lg-3">
                  <ul class="list-group list-group-borderless">
                    <li class="list-group-item">
                      Trip Type:
                      <span class="h6 fw-normal mb-0 ms-1">
                        {data?.trip_type}
                      </span>
                    </li>
                    <li class="list-group-item">
                      Distance:
                      <span class="h6 fw-normal mb-0 ms-1">
                        {payment_brack_points?.km} km
                      </span>
                    </li>
                  </ul>
                </div>

                <div class="col-md-4 col-sm-12 col-lg-4">
                  <ul class="list-group list-group-borderless">
                    <li class="list-group-item">
                      Pickup Date:
                      <span class="h6 fw-normal mb-0 ms-1">
                        {moment(data?.pickup_date).format("D MMM YYYY")}
                      </span>
                    </li>
                    <li class="list-group-item">
                      Pickup Time:
                      <span class="h6 fw-normal mb-0 ms-1">
                        {moment(
                          data?.pickup_date + " " + data?.pickup_time
                        ).format("H:mm A")}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <div class="col-md-3 col-sm-12 col-lg-3">
                  <ul class="list-group list-group-borderless">
                    <li class="list-group-item">
                      Distance:
                      <span class="h6 fw-normal mb-0 ms-1">230 km</span>
                    </li>
                    <li class="list-group-item">
                      Passengers:
                      <span class="h6 fw-normal mb-0 ms-1">1</span>
                    </li>
                    <li class="list-group-item">
                      Luggages:
                      <span class="h6 fw-normal mb-0 ms-1">2</span>
                    </li>
                  </ul>
                </div> */}
              </div>

              {/* <!-- Title --> */}
              <h6 class="mb-0 mt-3">Passenger Detail</h6>

              <div class="row">
                {/* <!-- List --> */}
                <div
                  class={`col-sm-${
                    payment_status?.payment_status == "payment_successfull"
                      ? "4"
                      : "8"
                  }`}
                >
                  <ul class="list-group list-group-borderless mb-0">
                    <li class="list-group-item">
                      Passenger Name:
                      <span class="h6 mb-0 fw-normal ms-1">
                        {customer?.name}
                      </span>
                    </li>
                    <li class="list-group-item">
                      Passenger Email:
                      <span class="h6 mb-0 fw-normal ms-1">
                        {customer?.email || "No Data Found"}
                      </span>
                    </li>
                    <li class="list-group-item">
                      Passenger Number:
                      <span class="h6 mb-0 fw-normal ms-1">
                        {customer?.number || "No Data Found"}
                      </span>
                    </li>
                  </ul>
                </div>
                {payment_status?.payment_status == "payment_successfull" && (
                  <div class="col-sm-4">
                    <center>
                      <Image
                        src={confirmation}
                        width={150}
                        height={150}
                        style={{
                          rotate: "30deg",
                        }}
                      />
                    </center>
                  </div>
                )}
                {/* <!-- Price --> */}
                {data?.trip_type == "Hourly Rentals" ? (
                  <div class="col-sm-4 text-sm-end mt-3 mt-sm-auto">
                    <div class="col-12 text-start">
                      <ul class="list-group list-group-borderless">
                        <li class="list-group-item d-flex justify-content-between">
                          <span class="h6 fw-light mb-0">Base Price</span>
                          <span class="h6 fw-light mb-0">
                            ₹ {cabbookinghourlyrentalfares?.fare}
                          </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          <span class="h6 fw-light mb-0">service & tax</span>
                          <span class="h6 fw-light mb-0">
                            ₹ {payment_brack_points?.service_and_tax}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <hr />
                    {payment_status?.payment_status == "payment_successfull" ? (
                      <>
                        <ul class="list-group list-group-borderless">
                          <li class="list-group-item d-flex justify-content-between">
                            <span class="h6 fw-light mb-0">
                              You Pay{" "}
                              {payment_status?.payment_type == "HALF"
                                ? "Half"
                                : "Full"}{" "}
                              Ammount
                            </span>
                            <span class="h6 fw-light mb-0 text-success">
                              ₹ {payment_status?.payment_ammount}
                            </span>
                          </li>
                          {payment_status?.payment_type == "HALF" && (
                            <li class="list-group-item d-flex justify-content-between">
                              <span class="h6 fw-light mb-0">
                                Rest To Pay Driver
                              </span>
                              <span class="h6 fw-light mb-0  text-danger">
                                ₹ {payment_brack_points?.fare}
                              </span>
                            </li>
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h6 class="mb-1 fw-normal">Total Amount</h6>
                        <h2 class="mb-0 text-success">
                          ₹ {payment_brack_points?.total_fare}
                        </h2>
                      </>
                    )}
                  </div>
                ) : (
                  <div class="col-sm-4 text-sm-end mt-3 mt-sm-auto">
                    <div class="col-12 text-start">
                      <ul class="list-group list-group-borderless">
                        <li class="list-group-item d-flex justify-content-between">
                          <span class="h6 fw-light mb-0">Base Price</span>
                          <span class="h6 fw-light mb-0">
                            ₹ {payment_brack_points?.fare}
                          </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                          <span class="h6 fw-light mb-0">service & tax</span>
                          <span class="h6 fw-light mb-0">
                            ₹ {payment_brack_points?.service_and_tax}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <hr />
                    {payment_status?.payment_status != "payment_faild" ? (
                      <>
                        <ul class="list-group list-group-borderless">
                          <li class="list-group-item d-flex justify-content-between">
                            <span class="h6 fw-light mb-0">
                              You Pay{" "}
                              {payment_status?.payment_type == "HALF"
                                ? "Half"
                                : "Full"}{" "}
                              Ammount
                            </span>
                            <span class="h6 fw-light mb-0 text-success">
                              ₹ {payment_status?.payment_ammount}
                            </span>
                          </li>
                          {payment_status?.payment_type == "HALF" && (
                            <li class="list-group-item d-flex justify-content-between">
                              <span class="h6 fw-light mb-0">
                                Rest To Pay Driver
                              </span>
                              <span class="h6 fw-light mb-0  text-danger">
                                ₹ {payment_brack_points?.fare}
                              </span>
                            </li>
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h6 class="mb-1 fw-normal">Total Amount</h6>
                        <h2 class="mb-0 text-success">
                          ₹ {payment_brack_points?.total_fare}
                        </h2>
                      </>
                    )}
                  </div>
                )}
              </div>
              <hr />
              <div class="row g-3">
                {/* <!-- List --> */}
                <div class="col-sm-6">
                  <h6>Included in your price</h6>
                  <ul class="list-group list-group-borderless mb-0">
                    {included_charges?.map((data) => (
                      <li class="list-group-item mb-0 pb-0">
                        <i class="fa-solid fa-check text-success me-1"></i>
                        {data?.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <!-- List --> */}
                <div class="col-sm-6">
                  <h6>Extra charge</h6>
                  <ul class="list-group list-group-borderless mb-0">
                    {extra_charges?.map((data) => (
                      <li class="list-group-item mb-0 pb-0">
                        <i class="fa-solid fa-x text-danger me-1"></i>
                        {data?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div class="card bg-transparent">
                {/* <!-- Card header --> */}
                <div class="card-header border-bottom bg-transparent px-0 pt-0">
                  <h5 class="mb-0 mt-5">Driver and Cab details</h5>
                </div>

                {/* <!-- Card body --> */}
                <div class="card-body pt-4 p-0">
                  {/* <!-- List --> */}
                  <ul>
                    <li class="mb-2">
                      Cab and driver details will be shared with you one hour
                      before the pickup time via your registered WhatsApp, My
                      Booking Page, and Email. (Scheduled for{" "}
                      {moment(
                        `${data?.pickup_date} ${data?.pickup_time}`,
                        "YYYY-MM-DD HH:mm"
                      )
                        .subtract(1, "hours")
                        .format("DD MMM YYYY HH:mm A")}
                      )
                    </li>
                    <li class="mb-2">
                      Due to traffic or any other unavoidable reason, the pickup
                      may be delayed for 30 minutes.
                    </li>
                    <li>
                      For nighttime driving (between 11:00 pm to 7:00 am) on any
                      of the nights, there will be a night driver charge of ₹
                      150.
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card bg-transparent">
                <div class="card-header border-bottom bg-transparent px-0 pt-4 mb-3">
                  <h5 class="mb-0">Safety Guidelines</h5>
                </div>
                <div class="card-body pt-4 p-0">
                  <div class="row g-2">
                    {terms
                      ?.filter(
                        (data) => data?.filter_option === "Global Guideleine"
                      )
                      .map((data, key) => (
                        <div class="col-md-6 col-sm-12 col-lg-6">
                          <h6>{data?.title}</h6>
                          <li class="list-group-item h6 fw-light d-flex mb-0">
                            <i class="bi bi-arrow-right me-2"></i>
                            {data?.desc}
                          </li>
                        </div>
                      ))}
                    {terms
                      ?.filter(
                        (data) =>
                          data?.filter_option == data?.data?.cab?.category?.name
                      )
                      .map((data, key) => (
                        <div class="col-md-6 col-sm-12 col-lg-6">
                          <h6>{data?.title}</h6>
                          <li class="list-group-item h6 fw-light d-flex mb-0">
                            <i class="bi bi-arrow-right me-2"></i>
                            {data?.desc}
                          </li>
                        </div>
                      ))}
                    {terms
                      ?.filter(
                        (data) => data?.filter_option == data?.data?.cab?.name
                      )
                      .map((data, key) => (
                        <div class="col-md-6 col-sm-12 col-lg-6">
                          <h6>{data?.title}</h6>
                          <li class="list-group-item h6 fw-light d-flex mb-0">
                            <i class="bi bi-arrow-right me-2"></i>
                            {data?.desc}
                          </li>
                        </div>
                      ))}
                    {terms
                      ?.filter(
                        (data) => data?.filter_option == data?.data?.trip_type
                      )
                      .map((data, key) => (
                        <div class="col-md-6 col-sm-12 col-lg-6">
                          <h6>{data?.title}</h6>
                          <li class="list-group-item h6 fw-light d-flex mb-0">
                            <i class="bi bi-arrow-right me-2"></i>
                            {data?.desc}
                          </li>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Card body END --> */}
          </div>
          {/* <!-- Booking summary END --> */}
        </div>
      </div>
    </>
  );
}

export default CabBookingDetaild;
