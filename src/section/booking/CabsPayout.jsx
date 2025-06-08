import { apiRoutes, appRoutes } from '@/constant'
import { changePaymentMode } from '@/redux/slice/bookingSlice'
import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { appAxios } from '@/lib/axios'
import { setSession } from '@/lib/auth'
import { useRouter } from 'next/navigation'

function CabsPayout({ fareData, loading, bookingData, term, included_charges, extra_charges, bookingdata }) {
    const [error, setError] = useState()
    const [paymentType, setPayment] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)
    const dispatch = useDispatch()
    const { user: { authUser }, booking } = useSelector(state => state)

    const route = useRouter()

    // payment
    // const loadRazorpayScript = () => {
    //     return new Promise((resolve) => {
    //         const script = document.createElement("script");
    //         script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //         script.onload = () => resolve(true);
    //         script.onerror = () => resolve(false);
    //         document.body.appendChild(script);
    //     });
    // };

    // useEffect(() => {
    //     loadRazorpayScript()
    // }, [])
    useEffect(() => {
        setPayment({ paymentType: bookingData?.payment_type, ammount: bookingData?.payment_ammount })
    }, [bookingData])

    const handlePayment = async () => {
        setPaymentLoading(true)
        // Call the Laravel API to create an order
        try {
            // const { data } = await appAxios.post(`${apiRoutes.payment.updateOrder}`, { paymentId: bookingData?.id, payment: paymentType });

            // const options = {
            //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Your Razorpay key
            //     amount: data.amount, // Amount in currency subunits
            //     currency: data.currency,
            //     order_id: data.order_id, // Generated order ID from the backend
            //     name: "trivyo ",
            //     description: "Test Transaction",
            //     handler: async function (response) {
            //         // After payment, verify the payment via backend API
            //         const verifyRes = await appAxios.post(`${apiRoutes.payment.veryfyPayment}`, {
            //             razorpay_payment_id: response.razorpay_payment_id,
            //             razorpay_order_id: response.razorpay_order_id,
            //             razorpay_signature: response.razorpay_signature,
            //         });

            //         if (verifyRes.data.status === "success") {
            //             console.log("Payment successful");
            //             console.log(response);
            //             await appAxios.post(apiRoutes.payment.updateBookingStatus, {
            //                 razorpay_payment_id: response.razorpay_payment_id,
            //                 razorpay_order_id: response.razorpay_order_id,
            //                 razorpay_signature: response.razorpay_signature,
            //                 payment_status: "payment_successfull"
            //             }).then(e => {
            //                 console.log(e.data.msg);
            //             });
            //         } else {
            //             await appAxios.post(apiRoutes.payment.updateBookingStatus, {
            //                 razorpay_payment_id: response.razorpay_payment_id,
            //                 razorpay_order_id: response.razorpay_order_id,
            //                 razorpay_signature: response.razorpay_signature,
            //                 payment_status: "payment_faild"
            //             }).then(e => {
            //                 console.log(e.data.msg);
            //             });
            //             console.log("Payment verification failed");
            //         }
            //     },
            //     modal: {
            //         ondismiss: async function () {
            //             // User canceled the payment, now update your database
            //             await appAxios.post(apiRoutes.payment.updateBookingStatus, {
            //                 razorpay_order_id: data.order_id,
            //                 payment_status: "payment_faild"
            //             }).then(e => {
            //                 setPaymentLoading(false)
            //             });
            //         }
            //     },
            //     prefill: {
            //         name: booking?.travellerDetaild?.name,
            //         contact: booking?.travellerDetaild?.number,
            //         email: booking?.travellerDetaild?.email,
            //     },
            // };

            // const rzp = new window.Razorpay(options);
            // rzp.open();
            // setPaymentLoading(false)
        } catch (error) {
            setPaymentLoading(false)
        }
    };

    console.log(bookingData);

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
                            <span class="h6 fw-light mb-0">₹ {!loading ? fareData?.service_and_tax : 0}</span>
                        </li>
                        <li class="list-group-item py-0"><hr class="my-0" /></li>
                        {/* <!-- Divider --> */}
                        <li class="list-group-item d-flex justify-content-between pb-0">
                            <span class="h5 fw-normal mb-0">Total</span>
                            <span class="h5 fw-normal mb-0">₹ {!loading ? fareData?.total_fare : 0}</span>
                        </li>
                    </ul>

                    <div class="d-grid mt-4 gap-2">
                        <div class="form-check form-check-inline mb-0">
                            <input class={`form-check-input ${paymentType?.paymentType == "HALF" && "active"}`} type="radio" name="discountOptions3" id="discount3" onClick={() => setPayment({ paymentType: "HALF", ammount: fareData?.service_and_tax })} value="option2" checked={paymentType?.paymentType == "HALF"} />
                            <label class="form-check-label h6 fw-normal mb-0" for="discount3">Pay ₹{!loading ? fareData?.service_and_tax : 0} now (Half Payment)</label>
                        </div>

                        <div class="form-check form-check-inline mb-0">
                            <input class={`form-check-input ${paymentType?.paymentType == "FULL" && "active"}`} type="radio" onClick={() => setPayment({ paymentType: "FULL", ammount: fareData?.total_fare })} name="discountOptions3" id="discount4" value="option2" checked={paymentType?.paymentType == "FULL"} />
                            <label class="form-check-label h6 fw-normal mb-0" for="discount4">Pay ₹{!loading ? fareData?.total_fare : 0} now (Full payment)</label>
                        </div>

                        {/* <!-- Button --> */}
                        <button disabled={paymentLoading} class="btn btn-dark mb-0 mt-2" onClick={handlePayment} >
                            {
                                paymentLoading ? (
                                    <CircularProgress size="20px" color="inherit" thickness={5} />
                                ) : (
                                    "Pay Now"
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
            {
                isMobile && (
                    <>
                        <SwipeableEdgeDrawer
                            fareData={fareData}
                            loading={loading}
                            paymentType={paymentType}
                            setPayment={setPayment}
                            handlePayment={handlePayment}
                            term={term}
                            bookingdata={bookingdata}
                            included_charges={included_charges}
                            extra_charges={extra_charges}
                        />
                    </>
                )
            }
        </>
    )
}

export default CabsPayout


const drawerBleeding = 106;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: grey[100],
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.default,
    }),
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[800],
    }),
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    marginBottom: 20,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[900],
    }),
}));

function SwipeableEdgeDrawer(props) {
    const { window, fareData, loading, setPickupOpen, handlePayment, paymentType, setPayment, term, included_charges, extra_charges, bookingdata } = props;
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const dispatch = useDispatch();
    // const { paymentType, paymentAmmount } = useSelector((state) => state.booking.payment);
    const { user: { authUser }, booking } = useSelector((state) => state);

    // Load Razorpay when drawer is open
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        // if (newOpen) {
        //     loadRazorpayScript();
        // }
    };

    return (
        <>
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                // container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    {
                        open ? (
                            <>
                                <div className='my-5 mx-2' >
                                    <h5>Fare Breakup</h5>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='my-4 mx-2' >
                                    {
                                        paymentType?.paymentType == "HALF" && (
                                            <span>Pay rest to the driver ? <a className='link' onClick={() => toggleDrawer()}>Know More</a></span>
                                        )
                                    }
                                    <button disabled={paymentLoading} class="btn btn-dark mb-0 mt-2 w-100" onClick={handlePayment} >
                                        {
                                            paymentLoading ? (
                                                <CircularProgress size="20px" color="inherit" thickness={5} />
                                            ) : (
                                                `Pay Now ${paymentType?.ammount}`
                                            )
                                        }
                                    </button>
                                </div>
                            </>
                        )
                    }

                    {/* <div class="d-grid mt-4 gap-2">
                    </div> */}
                </StyledBox>
                <StyledBox sx={{ px: 2, pb: 2, mt: 3, height: '100%', overflow: 'auto' }}>
                    <ul class="list-group list-group-borderless mb-0">
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="h6 fw-light mb-0">Base Price</span>
                            <span class="h6 fw-light mb-0">₹ {!loading ? fareData?.fare : 0}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span class="h6 fw-light mb-0">Service & Tax</span>
                            <span class="h6 fw-light mb-0">₹ {!loading ? fareData?.service_and_tax : 0}</span>
                        </li>
                        <li class="list-group-item py-0"><hr class="my-0" /></li>
                        {/* <!-- Divider --> */}
                        <li class="list-group-item d-flex justify-content-between pb-0">
                            <span class="h5 fw-normal mb-0">Total</span>
                            <span class="h5 fw-normal mb-0">₹ {!loading ? fareData?.total_fare : 0}</span>
                        </li>
                    </ul>
                    <div class="d-grid mt-4 gap-2">

                        <div class="form-check form-check-inline mb-0">
                            <input class={`form-check-input ${paymentType?.paymentType == "HALF" && "active"}`} type="radio" name="discountOptions" id="discount1" onClick={() => setPayment({ paymentType: "HALF", ammount: fareData?.service_and_tax })} value="option1" checked={paymentType?.paymentType == "HALF"} />
                            <label class="form-check-label h6 fw-normal mb-0" for="discount1">Pay ₹{!loading ? fareData?.service_and_tax : 0} now (Half Payment)</label>
                        </div>

                        <div class="form-check form-check-inline mb-0">
                            <input class={`form-check-input ${paymentType?.paymentType == "FULL" && "active"}`} type="radio" onClick={() => setPayment({ paymentType: "FULL", ammount: fareData?.total_fare })} name="discountOptions" id="discount2" value="option2" checked={paymentType?.paymentType == "FULL"} />
                            <label class="form-check-label h6 fw-normal mb-0" for="discount2">Pay ₹{!loading ? fareData?.total_fare : 0} now (Full payment)</label>
                        </div>
                        <button disabled={paymentLoading} class="btn btn-dark mb-0 mt-2 w-100" onClick={handlePayment} >
                            {
                                paymentLoading ? (
                                    <CircularProgress size="20px" color="inherit" thickness={5} />
                                ) : (
                                    "Pay Now"
                                )
                            }
                        </button>
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

                    <div class="card-header border-bottom bg-transparent px-0 pt-4 mb-3">
                        <h5 class="mb-0">Safety Guidelines</h5>
                    </div>
                    <div class="row g-2">
                        {term
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
                        {term
                            ?.filter(
                                (data) =>
                                    data?.filter_option == bookingdata?.data?.cab?.category?.name
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
                        {term
                            ?.filter(
                                (data) => data?.filter_option == bookingdata?.data?.cab?.name
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
                        {term
                            ?.filter(
                                (data) => data?.filter_option == bookingdata?.data?.trip_type
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
                </StyledBox>
            </SwipeableDrawer>
        </>
    );
}