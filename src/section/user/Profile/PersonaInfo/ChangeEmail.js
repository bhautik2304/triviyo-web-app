"use client";
import { PhoneInputContry } from "@/components";
import { api } from "@/lib/api";
import { authState, loginWithType } from "@/section/auth/signin/constants";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { statusCode } from "@/constant";
import { fetchAuthUser } from "@/redux/thunk/user";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function ChangeEmail() {
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState();
  const [authStatus, setAuthStatus] = useState(authState.mobileOrEmail);
  const [loader, setLoader] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [error, setError] = useState("");
  const [tokken, setTokken] = useState("");

  const { authUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const startTimer = () => {
    setTimeLeft(120);
    setIsTimerActive(true);
  };

  const validatePhoneNumber = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const formatTime = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    return moment.utc(duration.asMilliseconds()).format("mm:ss");
  };

  useEffect(() => {
    let intervalId;
    if (isTimerActive) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerActive]);

  const onSubmit = () => {
    if (!validatePhoneNumber(number)) {
      setError({ numberError: "Invalid Email" });
      setIsTimerActive(false);
      return 0;
    }
    setError(false);
    api.customer.contactinfogenotp(
      { number: number, channel: loginWithType.email },
      () => {
        setLoader(true);
      },
      (e) => {
        console.log(e);
        if (e.code == statusCode.createRes.code) {
          setAuthStatus(authState.checkOtp);
          setTokken(e.Token);
          startTimer();
          setLoader(false);
        }
        if (e.code === 400) {
          setError({ error: e.msg });
        }
        setLoader(false);
      },
      (error) => {
        setLoader(false);
        console.log(error);
      }
    );
  };

  const onVerifyOTP = () => {
    if (!otp) {
      setError({ numberError: "Please Provide OTP." });
      return 0;
    }
    api.customer.contactinfogenotpverify(
      { token: tokken, otp: otp },
      () => {
        setLoader(true);
      },
      (e) => {
        if (e.code == statusCode.createRes.code) {
          dispatch(fetchAuthUser());
          setNumber(null);
          setAuthStatus(authState.mobileOrEmail);
        }
        if (e.code == 400) {
          setError({ error: e.msg });
        }
        if (e.code == 401) {
          setError({ error: e.msg });
        }
        setLoader(false);
      },
      () => {
        setLoader(false);
      }
    );
  };

  return (
    <>
      <div class="card border my-3" id="email">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Update email</h4>
          <p class="mb-0">
            Your current email address is{" "}
            <span class="text-primary">
              {authUser?.email ?? "No data available"}
            </span>
          </p>
        </div>

        {/* <!-- Card body START --> */}
        <div class="card-body">
          <div>
            {/* <!-- Email --> */}
            <div className="col-md-6 col-sm-12 mb-3">
              {error && (
                <>
                  <div className="alert alert-danger w-100 my-2">
                    <span className="text-danger">
                      {error?.numberError
                        ? error?.numberError
                        : `${error?.error} ${
                            isTimerActive
                              ? `Please wait for ${formatTime(timeLeft)}`
                              : `Please Retry.`
                          }`}
                    </span>
                  </div>
                </>
              )}
            </div>

            {authStatus == authState.mobileOrEmail ? (
              <>
                <div className="col-md-6 col-sm-12 mb-3">
                  <label class="form-label">
                    Enter your new email id<span class="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    value={number}
                    onChange={(e) => {
                      setError(false);
                      setNumber(e.target.value);
                    }}
                    class="form-control"
                    placeholder="Enter your email id"
                  />
                </div>
                <div className="text-start">
                  <button
                    disabled={loader}
                    onClick={onSubmit}
                    class="btn btn-primary btn-sm mb-0"
                  >
                    {loader ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      "contiinue"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 col-sm-12">
                  <p class="mb-sm-0">
                    We have to send a code to{" "}
                    <b className="text-primary ">+{number}</b>{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAuthStatus(authState.mobileOrEmail);
                        setError(false);
                        setLoader(false);
                        setOtp(null);
                      }}
                      className="text-primary text-decoration-underline"
                    >
                      Change
                    </span>
                  </p>
                  <OTPInput
                    value={otp}
                    onChange={(otpValue) => {
                      setError(false);
                      setOtp(otpValue);
                    }}
                    onPaste={(otpPestValue) => {
                      const data = otpPestValue.clipboardData.getData("text");
                      setError(false);
                      setOtp(data);
                    }}
                    numInputs={4}
                    containerStyle={{
                      width: "100%",
                      // backgroundColor: 'red',
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                    inputStyle={{
                      width: "100%",
                      margin: 5,
                      borderColor: error && "red",
                    }}
                    renderInput={(props) => (
                      <input
                        maxlength="1"
                        class="form-control text-center p-3"
                        {...props}
                      />
                    )}
                  />
                  {isTimerActive ? (
                    <>
                      <div class="d-sm-flex justify-content-between small mb-4">
                        <span></span>
                        <span>
                          Resend OTP After
                          <span className="text-success">{` ${formatTime(
                            timeLeft
                          )}`}</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="d-sm-flex justify-content-between small mb-4">
                        <span>Don't get a code?</span>
                        <span
                          onClick={onSubmit}
                          class="btn btn-sm btn-link p-0 text-decoration-underline mb-0"
                        >
                          Click to resend
                        </span>
                      </div>
                    </>
                  )}
                  <div className="text-start">
                    <button
                      disabled={loader}
                      onClick={onVerifyOTP}
                      class="btn btn-primary btn-sm mb-0"
                    >
                      {loader ? (
                        <CircularProgress size={15} color="inherit" />
                      ) : (
                        "contiinue"
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default ChangeEmail;
