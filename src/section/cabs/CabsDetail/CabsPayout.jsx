import { apiRoutes } from '@/constant'
import { changePaymentMode } from '@/redux/slice/bookingSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CabsPayout({ fareData, loading }) {
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const { paymentType, paymentAmmount } = useSelector(state => state.booking.payment)
    const { authUser } = useSelector(state => state.user)

    // payment
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {

        if (!paymentAmmount) {
            setError("Select Payment Mode")
            return
        }

        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // Call the Laravel API to create an order
        const { data } = await axios.post(`${apiRoutes.payment.createOrder}`, { amount: paymentAmmount });

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Your Razorpay key
            amount: data.amount, // Amount in currency subunits
            currency: data.currency,
            order_id: data.order_id, // Generated order ID from the backend
            name: "VTT Cabs private limited",
            description: "Test Transaction",
            handler: async function (response) {
                // After payment, verify the payment via backend API
                // const verifyRes = await axios.post(`${apiRoutes.payment.createOrder}`'http://your-laravel-api-url/api/payment/verify', {
                //     razorpay_payment_id: response.razorpay_payment_id,
                //     razorpay_order_id: response.razorpay_order_id,
                //     razorpay_signature: response.razorpay_signature,
                // });

                // if (verifyRes.data.status === "Payment Verified") {
                //     alert("Payment successful");
                // } else {
                //     alert("Payment verification failed");
                // }
                console.log(response);
            },
            prefill: {
                name: authUser?.name,
                contact: authUser?.number,
                email: authUser?.email,
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <>
            <div data-sticky data-margin-top="100" data-sticky-for="1199"  >
                <div class="card card-body bg-light p-4">
                    {/* <!-- Title --> */}
                    <h6 class="text-danger fw-normal">Hurry! Limited cars left</h6>
                    <span className='text-danger' >{error}</span>
                    {/* <!-- List --> */}
                    <ul class="list-group list-group-borderless mb-0">
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="h6 fw-light mb-0">Base Price</span>
                            <span class="h6 fw-light mb-0">₹ {!loading ? fareData?.fare : 0}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="h6 fw-light mb-0">Service & Tax</span>
                            <span class="h6 fw-light mb-0">₹ {!loading ? fareData?.serviceAndTax : 0}</span>
                        </li>
                        <li class="list-group-item py-0"><hr class="my-0" /></li>
                        {/* <!-- Divider --> */}
                        <li class="list-group-item d-flex justify-content-between pb-0">
                            <span class="h5 fw-normal mb-0">Total</span>
                            <span class="h5 fw-normal mb-0">₹ {!loading ? fareData?.totalFare : 0}</span>
                        </li>
                    </ul>

                    <div class="d-grid mt-4 gap-2">
                        <div class="form-check form-check-inline mb-0">
                            <input class={`form-check-input ${paymentType == "HALF" && "active"}`} type="radio" name="discountOptions" id="discount1" onClick={() => dispatch(changePaymentMode({ paymentType: "HALF", ammount: fareData?.serviceAndTax, fare: fareData }))} value="option1" checked={paymentType == "HALF"} />
                            <label class="form-check-label h6 fw-normal mb-0" for="discount1">Pay ₹{!loading ? fareData?.serviceAndTax : 0} now (Half Payment)</label>
                        </div>

                        <div class="form-check form-check-inline mb-0">
                            <input class={`form-check-input ${paymentType == "FULL" && "active"}`} type="radio" onClick={() => dispatch(changePaymentMode({ paymentType: "FULL", ammount: fareData?.totalFare, fare: fareData }))} name="discountOptions" id="discount2" value="option2" checked={paymentType == "FULL"} />
                            <label class="form-check-label h6 fw-normal mb-0" for="discount2">Pay ₹{!loading ? fareData?.totalFare : 0} now (Full payment)</label>
                        </div>

                        {/* <!-- Button --> */}
                        <button class="btn btn-dark mb-0 mt-2" onClick={handlePayment} >Pay Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CabsPayout