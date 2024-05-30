import React from 'react'
import OneWay from './OneWay'
import RoundTrip from './RoundTrip'
import HourlyRentals from './HourlyRentals'
import AirportTransfers from './AirportTransfers'

function CabBooking() {
    return (
        <>
            <div class="tab-pane fade active show" id="cab">
                <div class="card shadow p-0">
                    {/* <!-- Card header --> */}
                    <div class="card-header d-sm-flex justify-content-between align-items-center p-4">
                        {/* <!-- Title --> */}
                        <h5 class="mb-3 mb-sm-0"><i class="fa-solid fa-car fa-fw me-2"></i>Cab Booking</h5>

                        {/* <!-- Tabs --> */}
                        <ul class="nav nav-pills nav-pills-dark" id="pills-tab-2" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link mb-0 rounded-start rounded-0 active" id="pills-one-way-2-tab" data-bs-toggle="pill" data-bs-target="#pills-one-way-2" type="button" role="tab" aria-selected="true">One Way</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link mb-0 rounded-0" id="pills-round-way-2-tab" data-bs-toggle="pill" data-bs-target="#pills-round-way-2" type="button" role="tab" aria-selected="false">Road Trip</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link mb-0  rounded-0" id="pills-Airport-Transfers-2-tab" data-bs-toggle="pill" data-bs-target="#pills-Airport-Transfers-2" type="button" role="tab" aria-selected="false">Airport Transfers</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link mb-0 rounded-end rounded-0" id="pills-Hourly-Rentals-2-tab" data-bs-toggle="pill" data-bs-target="#pills-Hourly-Rentals-2" type="button" role="tab" aria-selected="false">Hourly Rentals</button>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Card body --> */}
                    <div class="card-body p-4 pt-0">
                        <div class="tab-content" id="pills-tabContent3">
                            <OneWay />
                            <RoundTrip />
                            <HourlyRentals />
                            <AirportTransfers />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CabBooking