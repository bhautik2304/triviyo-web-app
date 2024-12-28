import { apiRoutes, appRoutes } from "@/constant";
import { changePaymentMode } from "@/redux/slice/bookingSlice";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { appAxios } from "@/lib/axios";
import { setSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

function CabsPayout({ fareData, loading, setPickupOpen }) {
  const [error, setError] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const dispatch = useDispatch();
  const { paymentType, paymentAmmount } = useSelector(
    (state) => state.booking.payment
  );
  const {
    user: { authUser, authStatus },
    booking,
  } = useSelector((state) => state);

  const route = useRouter();

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

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    setPaymentLoading(true);
    if (!booking.payNow) {
      setPickupOpen(true);
      setPaymentLoading(false);
      setError("Complete Traveler Information");
      return;
    }

    if (!paymentAmmount) {
      setError("Select Payment Mode");
      setPaymentLoading(false);
      return;
    }

    if (!window.Razorpay) {
      alert("Some Thing Is wrong!!");
      setPaymentLoading(false);
      return;
    }

    // Call the Laravel API to create an order
    try {
      let userId;
      console.log(authUser);
      if (authUser) {
        userId = authUser.id;
      } else {
        userId = null;
      }

      const keyData = await appAxios
        .post(apiRoutes.rozerPayKey(userId))
        .catch((er) => {
          console.log(er);
        });
      if (keyData.data.code == 400) {
        setPaymentLoading(false);
        return;
      }
      const { data } = await appAxios.post(`${apiRoutes.payment.createOrder}`, {
        booking: { ...booking, userId: userId },
      });
    //   return
      await setSession(data?.customer?.token, data?.customer?.customer_data);
      const options = {
        key: keyData.headers["x-rozerpay-key"], // Your Razorpay key
        amount: data.amount, // Amount in currency subunits
        currency: data.currency,
        order_id: data.order_id, // Generated order ID from the backend
        name: "VTT Cabs private limited",
        description: "Test Transaction",
        handler: async function (response) {
          // After payment, verify the payment via backend API
          const verifyRes = await appAxios.post(
            `${apiRoutes.payment.veryfyPayment}`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (verifyRes.data.status === "success") {
            console.log("Payment successful");
            console.log(response);
            await appAxios
              .post(apiRoutes.payment.updateBookingStatus, {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                payment_status: "payment_successfull",
              })
              .then((e) => {
                console.log(e.data.msg);
                route.replace(
                  `${appRoutes.app.bookingConfirmation}?booking_id=${data?.booking_id}`
                );
              });
          } else {
            await appAxios
              .post(apiRoutes.payment.updateBookingStatus, {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                payment_status: "payment_faild",
              })
              .then((e) => {
                console.log(e.data.msg);
                route.replace(
                  `${appRoutes.app.bookingConfirmation}?booking_id=${data?.booking_id}`
                );
              });
            console.log("Payment verification failed");
          }
        },
        modal: {
          ondismiss: async function () {
            // User canceled the payment, now update your database
            await appAxios
              .post(apiRoutes.payment.updateBookingStatus, {
                razorpay_order_id: data.order_id,
                payment_status: "payment_faild",
              })
              .then((e) => {
                setPaymentLoading(false);
              });
            window.location.replace(
              `${appRoutes.app.bookingConfirmation}?booking_id=${data?.booking_id}`
            );
          },
        },
        prefill: {
          name: booking?.travellerDetaild?.name,
          contact: booking?.travellerDetaild?.number,
          email: booking?.travellerDetaild?.email,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setPaymentLoading(false);
    } catch (error) {
      console.log(error);
      setPaymentLoading(false);
    } finally {
      setPaymentLoading(false);
    }
  };

  console.log(booking);

  return (
    <>
      <div data-sticky data-margin-top="100" data-sticky-for="1199">
        <div class="card card-body bg-light p-4">
          {/* <!-- Title --> */}
          <h6 class="text-danger fw-normal">Hurry! Limited cars left</h6>
          <span className="text-danger">{error}</span>
          {/* <!-- List --> */}
          <ul class="list-group list-group-borderless mb-0">
            <li class="list-group-item d-flex justify-content-between">
              <span class="h6 fw-light mb-0">Base Price</span>
              <span class="h6 fw-light mb-0">
                ₹ {!loading ? fareData?.fare : 0}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span class="h6 fw-light mb-0">Service & Tax</span>
              <span class="h6 fw-light mb-0">
                ₹ {!loading ? fareData?.serviceAndTax : 0}
              </span>
            </li>
            <li class="list-group-item py-0">
              <hr class="my-0" />
            </li>
            {/* <!-- Divider --> */}
            <li class="list-group-item d-flex justify-content-between pb-0">
              <span class="h5 fw-normal mb-0">Total</span>
              <span class="h5 fw-normal mb-0">
                ₹ {!loading ? fareData?.totalFare : 0}
              </span>
            </li>
          </ul>

          <div class="d-grid mt-4 gap-2">
            <div class="form-check form-check-inline mb-0">
              <input
                class={`form-check-input ${paymentType == "HALF" && "active"}`}
                type="radio"
                name="discountOptions"
                id="discount1"
                onClick={() =>
                  dispatch(
                    changePaymentMode({
                      paymentType: "HALF",
                      ammount: fareData?.serviceAndTax,
                      fare: fareData,
                    })
                  )
                }
                value="option1"
                checked={paymentType == "HALF"}
              />
              <label class="form-check-label h6 fw-normal mb-0" for="discount1">
                Pay ₹{!loading ? fareData?.serviceAndTax : 0} now (Half Payment)
              </label>
            </div>

            <div class="form-check form-check-inline mb-0">
              <input
                class={`form-check-input ${paymentType == "FULL" && "active"}`}
                type="radio"
                onClick={() =>
                  dispatch(
                    changePaymentMode({
                      paymentType: "FULL",
                      ammount: fareData?.totalFare,
                      fare: fareData,
                    })
                  )
                }
                name="discountOptions"
                id="discount2"
                value="option2"
                checked={paymentType == "FULL"}
              />
              <label class="form-check-label h6 fw-normal mb-0" for="discount2">
                Pay ₹{!loading ? fareData?.totalFare : 0} now (Full payment)
              </label>
            </div>

            {/* <!-- Button --> */}
            <button
              disabled={paymentLoading}
              class="btn btn-dark mb-0 mt-2"
              onClick={handlePayment}
            >
              {paymentLoading ? (
                <CircularProgress size="20px" color="inherit" thickness={5} />
              ) : booking.payNow ? (
                "Pay Now"
              ) : (
                "Complete Trip Details"
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobile && (
        <>
          <SwipeableEdgeDrawer
            fareData={fareData}
            loading={loading}
            setPickupOpen={setPickupOpen}
            handlePayment={handlePayment}
          />
        </>
      )}
    </>
  );
}

export default CabsPayout;

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

function SwipeableEdgeDrawer(props) {
  const { window, fareData, loading, setPickupOpen, handlePayment } = props;
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const dispatch = useDispatch();
  const { paymentType, paymentAmmount } = useSelector(
    (state) => state.booking.payment
  );
  const {
    user: { authUser },
    booking,
  } = useSelector((state) => state);

  // Load Razorpay when drawer is open
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (newOpen) {
      loadRazorpayScript();
    }
  };

  // Razorpay Script Loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  return (
    <>
      {/* <CssBaseline /> */}
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
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
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            51 results
          </Typography>
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: "100%", overflow: "auto" }}>
          <ul class="list-group list-group-borderless mb-0">
            <li class="list-group-item d-flex justify-content-between">
              <span class="h6 fw-light mb-0">Base Price</span>
              <span class="h6 fw-light mb-0">
                ₹ {!loading ? fareData?.fare : 0}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span class="h6 fw-light mb-0">Service & Tax</span>
              <span class="h6 fw-light mb-0">
                ₹ {!loading ? fareData?.serviceAndTax : 0}
              </span>
            </li>
            <li class="list-group-item py-0">
              <hr class="my-0" />
            </li>
            {/* <!-- Divider --> */}
            <li class="list-group-item d-flex justify-content-between pb-0">
              <span class="h5 fw-normal mb-0">Total</span>
              <span class="h5 fw-normal mb-0">
                ₹ {!loading ? fareData?.totalFare : 0}
              </span>
            </li>
          </ul>
          <button
            disabled={paymentLoading}
            class="btn btn-dark mb-0 mt-2 w-100"
            onClick={handlePayment}
          >
            {paymentLoading ? (
              <CircularProgress size="20px" color="inherit" thickness={5} />
            ) : booking.payNow ? (
              "Pay Now"
            ) : (
              "Complete Trip Details"
            )}
          </button>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}
