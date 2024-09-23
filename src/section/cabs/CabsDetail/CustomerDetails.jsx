import React, { useEffect, useState } from 'react'
import AddressModel from './Address/AddressModel'
import { useSelector } from 'react-redux'

function CustomerDetails() {

    const [userData, setUserData] = useState({
        name: "",
        gender: "",
        email: "",
        number: "",
    })
    const [pickupOpen, setPickupOpen] = useState(false)
    const [dropOpen, setDropOpen] = useState(false)

    const { user: { authUser }, booking: { pickupAddress, dropAddress } } = useSelector(state => state)

    useEffect(() => {
        setUserData(
            {
                name: authUser?.name,
                gender: authUser?.gender,
                email: authUser?.email,
                number: authUser?.number,
            }
        )
    }, [authUser])

    return (
        <>
            <div class="card border">
                {/* <!-- Card header --> */}
                <div class="card-header border-bottom bg-transparent">
                    <h5 class="mb-0">Trip Details</h5>
                </div>

                {/* <!-- Card body START --> */}
                <div class="card-body">
                    {/* <!-- Form START --> */}
                    <div class="row g-4">
                        {/* <!-- Input --> */}
                        <div class="col-md-6">
                            <div class="form-control-bg-light">
                                <label class="form-label">Pickup Address</label>
                                <input type="text" onClick={() => setPickupOpen(!pickupOpen)} class="form-control form-control-lg" placeholder="Enter exact pick up address" value={pickupAddress?.address} />
                                <div class="form-text">This will help our cab driver reach you on time.</div>
                            </div>
                        </div>

                        {/* <!-- Input --> */}
                        <div class="col-md-6">
                            <div class="form-control-bg-light">
                                <label class="form-label">Drop Address</label>
                                <input type="text" onClick={() => setDropOpen(!dropOpen)} class="form-control form-control-lg" placeholder="Enter drop address" value={dropAddress?.address} />
                            </div>
                        </div>
                        <h5 class="mb-0 mt-4">Traveler Information</h5>

                        {/* <!-- Radio button --> */}
                        <div class="col-md-4">
                            <label class="form-label">Gender</label>
                            <div>
                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <button class="btn-check" name="btnradio" id="btnradio1" ></button>
                                    <label class={`btn btn-lg btn-light btn-dark-bg-check mb-0 ${userData?.gender == "male" && "active"}`} for="btnradio1">Male</label>

                                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" />
                                    <label class={`btn btn-lg btn-light btn-dark-bg-check mb-0 ${userData?.gender == "female" && "active"}`} for="btnradio2">Female</label>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Input --> */}
                        <div class="col-md-8">
                            <div class="form-control-bg-light">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control form-control-lg" value={userData?.name} placeholder="Enter your name" />
                            </div>
                        </div>

                        {/* <!-- Input --> */}
                        <div class="col-md-6">
                            <div class="form-control-bg-light">
                                <label class="form-label">Email id</label>
                                <input type="email" class="form-control form-control-lg" value={userData?.email} placeholder="Enter your email" />
                            </div>
                        </div>

                        {/* <!-- Input --> */}
                        <div class="col-md-6">
                            <div class="form-control-bg-light">
                                <label class="form-label">Mobile number</label>
                                <input type="text" class="form-control form-control-lg" value={userData?.number} placeholder="Enter your mobile number" />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Form END --> */}
                </div>
                {/* <!-- Card body END --> */}
            </div>
            <AddressModel open={pickupOpen} handleClose={() => setPickupOpen(!pickupOpen)} />
        </>
    )
}

export default CustomerDetails