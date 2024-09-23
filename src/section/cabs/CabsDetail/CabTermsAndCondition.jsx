import React from 'react'

function CabTermsAndCondition({ terms = [], cab }) {
    console.log(cab?.cabCategory);
    console.log(terms.filter(data => data?.filter_option === "Global Guideleine"));

    return (
        <div class="card bg-transparent">
            {/* <!-- Card header --> */}
            <div class="card-header border-bottom bg-transparent px-0 pt-0">
                <h4 class="mb-0">Safety Guidelines</h4>
            </div>

            {/* <!-- Card body START --> */}
            <div class="card-body pt-4 p-0">
                <div
                    class="row g-2"
                >
                    {
                        terms.filter(data => data?.filter_option === "Global Guideleine").map((data, key) => (
                            <div class="col-md-6 col-sm-12 col-lg-6">
                                <h6>{data?.title}</h6>
                                <li class="list-group-item h6 fw-light d-flex mb-0">
                                    <i class="bi bi-arrow-right me-2"></i>{data?.desc}
                                </li>
                            </div>
                        ))
                    }
                    {
                        terms.filter(data => data?.filter_option == cab?.cabCategory).map((data, key) => (
                            <div class="col-md-6 col-sm-12 col-lg-6">
                                <h6>{data?.title}</h6>
                                <li class="list-group-item h6 fw-light d-flex mb-0">
                                    <i class="bi bi-arrow-right me-2"></i>{data?.desc}
                                </li>
                            </div>
                        ))
                    }
                </div>

            </div>
            {/* <!-- Card body END --> */}
        </div>
    )
}

export default CabTermsAndCondition