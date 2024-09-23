import React from 'react'

function CabInclusiveOrExclusive({ data, faredata, loading }) {
    return (
        <>
            <div class="card bg-transparent">
                {/* <!-- Card header --> */}
                <div class="card-header border-bottom bg-transparent px-0 pt-0">
                    <h4 class="mb-0">Inclusion & Exclusion</h4>
                </div>

                {/* <!-- Card body START --> */}
                <div class="card-body pt-4 p-0">
                    {/* <!-- Detail START --> */}
                    <div class="row g-3">
                        {/* <!-- List --> */}
                        <div class="col-sm-6">
                            <h5>Included in your price</h5>
                            <ul class="list-group list-group-borderless mb-0">
                                {
                                    faredata?.included_charges?.map((data) => (
                                        <li class="list-group-item mb-0 pb-0"><i class="fa-solid fa-check text-success me-1"></i>
                                            {data?.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* <!-- List --> */}
                        <div class="col-sm-6">
                            <h5>Extra charge</h5>
                            <ul class="list-group list-group-borderless mb-0">
                                {
                                    faredata?.extra_charges?.map((data) => (
                                        <li class="list-group-item mb-0 pb-0"><i class="fa-solid fa-x text-danger me-1"></i>
                                            {data?.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Detail END --> */}
                </div>
                {/* <!-- Card body END --> */}
            </div>
        </>
    )
}

export default CabInclusiveOrExclusive