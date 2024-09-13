import { serverUrl } from '@/util/server'
import React from 'react'

function CabDetails({ data, faredata, loading }) {
    return (
        <>
            <div class="card border p-4">
                {/* <!-- Card body START --> */}
                <div class="card-body p-0">
                    <div class="row g-4 align-items-center">
                        {/* <!-- Image --> */}
                        <div class="col-md-4">
                            <div class="bg-light rounded-3 px-4 py-5">
                                <img src={serverUrl(data?.img)} alt="" />
                            </div>
                        </div>

                        {/* <!-- card body --> */}
                        <div class="col-md-8">
                            {/* <!-- Title and rating --> */}
                            <div class="d-sm-flex justify-content-sm-between">
                                {/* <!-- Card title --> */}
                                <div>
                                    <h4 class="card-title mb-2">{data?.cabName}</h4>
                                    <ul class="nav nav-divider h6 fw-normal mb-2">
                                        <li class="nav-item">{data?.cabCategory}</li>
                                        {data?.ac && (<li class="nav-item">AC</li>)}
                                        <li class="nav-item">4 Seats</li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- List --> */}
                            <ul class="list-group list-group-borderless mt-2 mb-0">
                                <li class="list-group-item d-flex pb-0 mb-0">
                                    <span class="h6 fw-normal mb-0"><i class="bi bi-check-circle me-2"></i>{`${!loading ? faredata?.km : 0} Kms`} included. After that ₹ {!loading ? faredata?.extra_km_fare : 0}/Kms</span>
                                </li>
                                <li class="list-group-item d-flex pb-0 mb-0">
                                    <span class="h6 fw-normal mb-0"><i class="bi bi-check-circle me-2"></i>2 luggage bags </span>
                                </li>
                                <li class="list-group-item d-flex pb-0 mb-0">
                                    <span class="h6 fw-normal mb-0"><i class="bi bi-check-circle me-2"></i>{!loading ? faredata?.fule : ""}  Car</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!-- Card body END --> */}

                {/* <!-- Card footer --> */}
                <div class="card-footer p-0 pt-4">
                    <div class="hstack gap-3 flex-wrap">
                        {/* <!-- Item --> */}
                        <h6 class="bg-success bg-opacity-10 text-success fw-light rounded-2 d-inline-block mb-0 py-2 px-4">
                            Free Cancellation, till 1 hour of Pick up
                        </h6>

                        {/* <!-- Item --> */}
                        <h6 class="bg-success bg-opacity-10 text-success fw-light rounded-2 d-inline-block mb-0 py-2 px-4">
                            Free waiting up to 45 minutes
                        </h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CabDetails