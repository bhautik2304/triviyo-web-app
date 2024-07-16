import { PhoneInputContry } from "@/components";
import { api } from "@/lib/api";
import { authState, loginWithType } from "@/section/auth/signin/constants";
import React, { useCallback, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { statusCode } from "@/constant";
import { fetchAuthUser } from "@/redux/thunk/user";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [validations, setValidations] = useState({
    minLength: false,
    maxLength: false,
    specialChar: false,
    upperCase: false,
    lowerCase: false,
  });
  const { authUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const minLength = password.length >= 6;
    const maxLength = password.length <= 15;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);

    setValidations({
      minLength,
      maxLength,
      specialChar,
      upperCase,
      lowerCase,
    });
  }, [password]);

  const onPasswordChange = () => {
    setError(false);
    if (
      !(
        validations.lowerCase &&
        validations.maxLength &&
        validations.minLength &&
        validations.specialChar &&
        validations.upperCase
      )
    ) {
      if (!(password.length <= 15)) {
        setError({ error: "Password Maximum Length 15 Charectors Only" });
        return 0;
      }
      setError({ error: "Required All Filled Possiable" });
      return 0;
    }
    api.customer.changepassword(
      { password: password },
      () => {
        setLoader(true);
      },
      (e) => {
        if (e.code == statusCode.createRes.code) {
          dispatch(fetchAuthUser());
          setPassword("");
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
      <div class="card border">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Update Password</h4>
          <p class="mb-0">
            Your current login info is{" "}
            <span class="text-primary">
              {authUser?.number} , {authUser?.email}
            </span>
          </p>
        </div>

        {/* <!-- Card body START --> */}
        <div class="card-body">
          {/* <!-- Current password --> */}
          {/* <!-- New password --> */}

          <div className="col-6">
            {error && (
              <>
                <div className="alert alert-danger w-100 my-2">
                  <span className="text-danger">
                    {error?.numberError
                      ? error?.numberError
                      : `${error?.error}`}
                  </span>
                </div>
              </>
            )}
          </div>
          <div class="mb-3">
            <div className="col-md-6 col-sm-12">
              <label class="form-label"> Enter new password</label>
              <div class="input-group">
                <input
                  class="form-control fakepassword"
                  placeholder="Enter new password"
                  type={show ? "text" : "password"}
                  id="psw-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  class="input-group-text p-0 bg-transparent"
                  onClick={() => setShow(!show)}
                >
                  <i
                    class={`fakepasswordicon fas fa-eye${
                      show ? "" : "-slash"
                    } cursor-pointer p-2`}
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex">
            {password != "" && (
              <>
                <ul className="">
                  <li
                    className={
                      validations.minLength ? "text-success" : "text-danger"
                    }
                  >
                    Minimum 6 characters
                  </li>
                  <li
                    className={
                      validations.maxLength ? "text-success" : "text-danger"
                    }
                  >
                    Maximum 15 characters
                  </li>
                  <li
                    className={
                      validations.specialChar ? "text-success" : "text-danger"
                    }
                  >
                    Contains special character
                  </li>
                </ul>
                <ul>
                  <li
                    className={
                      validations.upperCase ? "text-success" : "text-danger"
                    }
                  >
                    Contains uppercase letter
                  </li>
                  <li
                    className={
                      validations.lowerCase ? "text-success" : "text-danger"
                    }
                  >
                    Contains lowercase letter
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* <!-- Confirm --> */}
          <div className="text-start">
            <button
              disabled={loader}
              onClick={onPasswordChange}
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
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default ChangePassword;
