import { changeBookingDetaild } from "@/redux/slice/bookingSlice";
import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TravellerInformation({ open, handelConfirm, handleClose }) {
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    email: "",
    number: "",
  });
  const [dropOpen, setDropOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    user: { authUser },
    booking: { pickupAddress, dropAddress },
  } = useSelector((state) => state);

  useEffect(() => {
    setUserData({
      name: authUser?.name,
      gender: authUser?.gender,
      email: authUser?.email,
      number: authUser?.number,
    });
    console.log("run :=", authUser?.id);
    dispatch(changeBookingDetaild({ key: "userId", val: authUser?.id }));
  }, []);

  const confirmTravelerInfo = () => {
    dispatch(changeBookingDetaild({ key: "travellerDetaild", val: userData }));
    dispatch(changeBookingDetaild({ key: "payNow", val: true }));
    handleClose();
  };

  return (
    <>
      <div className="row g-4">
        <h5 class="mb-0 mt-4">Traveler Information</h5>

        {/* <!-- Radio button --> */}
        <div class="col-md-4">
          <label class="form-label">Gender</label>
          <div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <button class="btn-check" name="btnradio" id="btnradio1"></button>
              <label
                class={`btn btn-lg btn-light btn-dark-bg-check mb-0 ${
                  userData?.gender == "male" && "active"
                }`}
                onClick={() => setUserData({ ...userData, gender: "male" })}
                for="btnradio1"
              >
                Male
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
              />
              <label
                class={`btn btn-lg btn-light btn-dark-bg-check mb-0 ${
                  userData?.gender == "female" && "active"
                }`}
                onClick={() => setUserData({ ...userData, gender: "female" })}
                for="btnradio2"
              >
                Female
              </label>
            </div>
          </div>
        </div>

        {/* <!-- Input --> */}
        <div class="col-md-8">
          <div class="form-control-bg-light">
            <label class="form-label">Name</label>
            <input
              type="text"
              class="form-control form-control-lg"
              value={userData?.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
        </div>

        {/* <!-- Input --> */}
        <div class="col-md-6">
          <div class="form-control-bg-light">
            <label class="form-label">Email id</label>
            <input
              type="email"
              class="form-control form-control-lg"
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* <!-- Input --> */}
        <div class="col-md-6">
          <div class="form-control-bg-light">
            <label class="form-label">Mobile number</label>
            <input
              type="text"
              class="form-control form-control-lg"
              value={userData?.number}
              onChange={(e) =>
                setUserData({ ...userData, number: e.target.value })
              }
              placeholder="Enter your mobile number"
            />
          </div>
        </div>
      </div>
      <Stack justifyContent="end" direction="row">
        <Button
          sx={{ mt: 2, width: { md: 300, lg: 300, xs: "100%" } }}
          onClick={confirmTravelerInfo}
        >
          Confirm Traveler Information
        </Button>
      </Stack>
    </>
  );
}

export default TravellerInformation;
