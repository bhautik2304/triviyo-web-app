"use client";
import { api } from "@/lib/api";
import React, { useState, useEffect } from "react";
import SignInInput from "./SignInInput";
import Otp from "./Otp";
import moment from "moment";
import { loginWithType, authState } from "./constants";
import { useRouter } from "next/navigation";
import { appRoutes, statusCode } from "@/constant";
import NewRegistration from "./NewRegistration";
import PasswordLogin from "./PasswordLogin";
import { setSession } from "@/lib/auth";
import { isLocalStorageAvailable } from "@/lib/config";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function Signin() {
  const [authProcessState, setAuthProcessState] = useState(
    authState.mobileOrEmail
  );
  const [value, setValue] = useState();
  const [loader, setLoader] = useState(false);
  const [loginWith, setLoginWith] = useState(loginWithType.num);
  const [customer, setCustomer] = useState();

  const [otp, setOtp] = useState();
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();

  const startTimer = () => {
    setTimeLeft(120);
    setIsTimerActive(true);
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

  const validatePhoneNumber = (value) => {
    if (!value.startsWith("+")) {
      value = "+" + value;
    }

    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber && phoneNumber.isValid()) {
      return true;
    }
    console.log(phoneNumber);
    return false;
  };

  const submit = () => {
    setError(false);
    setLoader(true);
    if (loginWith == loginWithType.num) {
      if (validatePhoneNumber(value)) {
        api.authApi.login(
          {
            number: value,
            channel: loginWith,
          },
          () => {
            setLoader(true);
          },
          (e) => {
            setLoader(false);
            console.log(e);
            if (e.authtype == authState.authType) {
              console.log(authState.authType);
              setAuthProcessState(authState.authType);
            } else {
              if (e.code == 400) {
                setLoader(false);
                setError({ error: e.msg });
                setAuthProcessState(authState.checkOtp);
                // startTimer();
                return;
              }
              startTimer();
              setAuthProcessState(authState.checkOtp);
              localStorage.setItem("otp_id", e.Token);
            }
          },
          (error) => {
            console.log(error.response.data.message);
            setLoader(false);
            setError({ error: error.response.data.message });
            if (error.response.data.message == "Too Many Attempts.") {
              startTimer();
            }
          }
        );
        return 0;
      } else {
        setLoader(false);
        setError({ ...error, signInput: "Invalid phone number" });
        return 0;
      }
    } else {
      api.authApi.login(
        {
          number: value,
          channel: loginWith,
        },
        () => {
          setLoader(true);
        },
        (e) => {
          setLoader(false);
          console.log(e);
          if (e.authtype == authState.authType) {
            console.log(authState.authType);
            setAuthProcessState(authState.authType);
          } else {
            if (e.code == 400) {
              setLoader(false);
              setError({ error: e.msg });
              setAuthProcessState(authState.checkOtp);
              // startTimer();
              return;
            }
            startTimer();
            setAuthProcessState(authState.checkOtp);
            localStorage.setItem("otp_id", e.Token);
          }
        },
        (error) => {
          console.log(error.response.data.message);
          setLoader(false);
          setError({ error: error.response.data.message });
          if (error.response.data.message == "Too Many Attempts.") {
            startTimer();
          }
        }
      );
      return 0;
      // if () {
      // } else {
      //   setLoader(false);
      //   setError({ ...error, signInput: "Invalid phone number" });
      //   return 0;
      // }
    }
  };
  const otpSubmit = () => {
    setError(false);
    api.authApi.otpCheck(
      {
        token: localStorage.getItem("otp_id"),
        otp: otp,
      },
      () => {
        setLoader(true);
      },
      async (e) => {
        console.log();
        if (e.code === 401) {
          setError({ ...error, otp: "Invalid OTP." });
          setLoader(false);
          return 0;
        } else {
          if (e.new_user) {
            setLoader(false);
            setCustomer(e.customer);
            setAuthProcessState(authState.createAccount);
          } else {
            const session = await setSession(e.token, e.customer);
            if (session) {
              isLocalStorageAvailable() && localStorage.removeItem("otp_id");
              setLoader(false);
              router.push(appRoutes.home);
            }
          }
        }
      },
      (error) => {
        console.log(error);
        setLoader(false);
      }
    );
  };

  const passwordSubmit = (customerData) => {
    api.authApi.passwordCheck(
      { number: value, password: customerData?.password },
      () => {
        setLoader(true);
      },
      async (e) => {
        console.log(e);
        if (e.new_user) {
          setAuthProcessState(authState.createAccount);
          setCustomer(e.customer);
        } else {
          if (e.code === 404) {
            setError({ ...error, password: e.msg });
            setLoader(false);
            return 0;
          }
          const session = await setSession(e.token, e.customer);
          if (session) {
            localStorage.removeItem("otp_id");
            setLoader(false);

            router.push(appRoutes.home);
          }
        }
      },
      () => {
        setLoader(false);
      }
    );
  };

  const errorMessage = (key) => error[key] || error?.error;

  console.log();

  return (
    <>
      <div class="mt-4 text-start">
        {authProcessState == authState.mobileOrEmail && (
          <>
            <h1 class="mb-2 h5">Sign up / Login now to</h1>
            {error && (
              <div className="alert alert-danger w-100 my-2">
                <span className="text-danger">{`${errorMessage("signInput")} ${
                  isTimerActive
                    ? `Please wait for ${formatTime(timeLeft)}`
                    : `Please Retry.`
                }`}</span>
              </div>
            )}
            <SignInInput
              submit={submit}
              value={value}
              timer={formatTime(timeLeft)}
              onChange={(e) => {
                setError(false);
                setValue(e);
              }}
              loader={loader}
              loginWith={loginWith}
              isTimerActive={isTimerActive}
              setValue={setValue}
              setLoginWith={setLoginWith}
            />
            {/* <Otp /> */}
          </>
        )}
        {authProcessState == authState.checkOtp && (
          <>
            <h1 class="mb-2 h5">OTP</h1>
            <p class="mb-sm-0">
              We have to send a code to{" "}
              <b className="text-primary ">+{value}</b>{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAuthProcessState(authState.mobileOrEmail);
                  setError(false);
                  setLoader(false);
                  setOtp(null);
                }}
                className="text-primary text-decoration-underline"
              >
                Change
              </span>
            </p>
            {error && (
              <div className="alert alert-danger w-100 my-2">
                <span className="text-danger">{`${errorMessage("otp")}`}</span>
              </div>
            )}
            <div className="w-100">
              <Otp
                value={otp}
                loader={loader}
                signInsubmit={submit}
                setOtp={(value) => {
                  setError(false);
                  setOtp(value);
                }}
                error={error}
                submit={otpSubmit}
                isTimerActive={isTimerActive}
                timer={formatTime(timeLeft)}
              />
            </div>
          </>
        )}
        {authProcessState == authState.createAccount && (
          <>
            <div className="w-100">
              <NewRegistration customerData={customer} />
            </div>
          </>
        )}
        {authProcessState == authState.authType && (
          <>
            {error && (
              <div className="alert alert-danger w-100 my-2">
                <span className="text-danger">{`${errorMessage(
                  "password"
                )}`}</span>
              </div>
            )}
            <div className="w-100">
              <PasswordLogin
                customer={customer}
                setCustomer={setCustomer}
                submit={passwordSubmit}
                loader={loader}
              />
            </div>
          </>
        )}
        {/* <!-- Copyright --> */}
        <div class="text-primary-hover text-body mt-3 text-center">
          {" "}
          © All rights reserved. by{" "}
          <a href="https://www.vttcabs.com/" class="text-body">
            VTT Cabs private limited
          </a>
          .{" "}
        </div>
      </div>
    </>
  );
}

export default Signin;
