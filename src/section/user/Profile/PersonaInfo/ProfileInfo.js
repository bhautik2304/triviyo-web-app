"use client";
import React, { useEffect, useState } from "react";
import { serverUrl } from "@/util/server";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { appAxios } from "@/lib/axios";
import { apiRoutes } from "@/constant";
import { fetchAuthUser } from "@/redux/thunk/user";
import Image from "next/image";
import { CircularProgress, Skeleton } from "@mui/material";
import moment from "moment";
import { Country, State, City } from "country-state-city";
import { api } from "@/lib/api";

function ProfileInfo() {
  const [userData, setuserData] = useState({});
  const [apiCallLoading, setApiCallLoading] = useState(false);
  const [selectedStateCity, setSelectedStateCity] = useState([]);
  const [fileError, setFileError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { authUser, loadingState } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setuserData(authUser);
  }, [authUser]);

  const updateProfile = (file) => {
    try {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Invalid file type. Please upload a PNG or JPEG image.");
        return 0;
      }

      const formData = new FormData();
      formData.append("picure", file);

      appAxios
        .post(apiRoutes.user.profileUpload, formData)
        .then((e) => {
          if (e.data.code == 200) {
            dispatch(fetchAuthUser());
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectState = (value) => {
    try {
      const stateObj = JSON.parse(value);
      setuserData({ ...userData, state: stateObj.name });
      const city = City.getCitiesOfState(
        stateObj.countryCode,
        stateObj.isoCode
      );
      setSelectedStateCity(city);
    } catch (error) {
      setuserData({ ...userData, state: userData.state });
    }
  };

  const saveChange = () => {
    api.customer.update(
      userData.id,
      userData,
      (res) => {
        setApiCallLoading(false);
        dispatch(fetchAuthUser());
      },
      (res) => {
        setApiCallLoading(true);
      },
      (res) => {
        setApiCallLoading(false);
      }
    );
  };

  return (
    <>
      <div class="card border my-3">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Personal Information</h4>
        </div>

        {/* <!-- Card body START --> */}
        <div class="card-body">
          {/* <!-- Form START --> */}
          <div class="row g-3">
            {/* <!-- Profile photo --> */}
            <div class="col-12">
              <label class="form-label">
                Upload your profile photo<span class="text-danger">*</span>
              </label>
              <span className="text-danger"> .jpg, .png, .jpeg only</span>
              <div class="d-flex align-items-center">
                <label
                  class="position-relative me-4"
                  for="uploadfile-1"
                  title="Replace this pic"
                >
                  {/* <!-- Avatar place holder --> */}
                  <span class="avatar avatar-xl">
                    {loadingState ? (
                      <Skeleton
                        variant="circular"
                        width={80}
                        height={80}
                        className="avatar-img rounded-circle border border-white border-3 shadows"
                        style={{ position: "absolute", top: 0, left: 0 }}
                      />
                    ) : (
                      <>
                        {isLoading && (
                          <Skeleton
                            variant="circular"
                            width={80}
                            height={80}
                            className="avatar-img rounded-circle border border-white border-3 shadows"
                            style={{ position: "absolute", top: 0, left: 0 }}
                          />
                        )}
                        <Image
                          height={100}
                          width={100}
                          priority
                          className="avatar-img rounded-circle border border-white border-3 shadow"
                          src={serverUrl(authUser?.picture)}
                          alt={userData?.name}
                          onLoadingComplete={() => setIsLoading(false)}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                      </>
                    )}
                  </span>
                </label>
                {/* <!-- Upload button --> */}
                <label
                  class="btn btn-sm btn-primary btn-sm-soft mb-0"
                  for="uploadfile-1"
                >
                  Change
                </label>
                <input
                  id="uploadfile-1"
                  class="form-control d-none"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => updateProfile(e.target.files[0])}
                />
              </div>
              <span className="text-danger">{fileError}</span>
            </div>

            {/* <!-- Email --> */}
            <div class="col-md-6">
              <label class="form-label">
                Email address<span class="text-danger">*</span>
                <Link href="#email"> Change </Link>{" "}
              </label>
              <input
                type="email"
                class="form-control"
                value={userData?.email}
                disabled
                placeholder="Enter your email id"
              />
            </div>

            {/* <!-- Mobile --> */}
            <div class="col-md-6">
              <label class="form-label">
                Mobile number<span class="text-danger">*</span>{" "}
                <Link href="#number">Change</Link>{" "}
              </label>
              <input
                type="text"
                class="form-control"
                value={userData?.number}
                disabled
                placeholder="Enter your mobile number"
              />
            </div>

            {/* <!-- Name --> */}
            <div class="col-md-6">
              <label class="form-label">
                Full Name<span class="text-danger">*</span>
              </label>
              <input
                onChange={(e) =>
                  setuserData({ ...userData, name: e.target.value })
                }
                type="text"
                class="form-control"
                value={userData?.name}
                placeholder="Enter your full name"
              />
            </div>

            {/* <!-- Date of birth --> */}
            <div class="col-md-6">
              <label class="form-label">
                Date of Birth
                <span class="text-danger">* you can add only one time</span>
              </label>
              <input
                type="date"
                value={
                  userData?.birthday &&
                  moment(userData?.birthday).format("YYYY-MM-DD")
                }
                onChange={(e) =>
                  setuserData({ ...userData, birthday: e.target.value })
                }
                max="2099-12-31"
                disabled={authUser?.birthday}
                class="form-control"
                placeholder="Enter date of birth"
              />
            </div>

            {/* <!-- Gender --> */}
            <div class="col-md-6">
              <label class="form-label">
                Select Gender<span class="text-danger">*</span>
              </label>
              <div class="d-flex gap-4">
                <div class="form-check radio-bg-light">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="gender1"
                    onChange={(e) =>
                      setuserData({ ...userData, gender: "male" })
                    }
                    checked={userData?.gender == "male"}
                  />
                  <label class="form-check-label" for="gender1">
                    Male
                  </label>
                </div>
                <div class="form-check radio-bg-light">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="gender2"
                    onChange={(e) =>
                      setuserData({ ...userData, gender: "female" })
                    }
                    checked={userData?.gender == "female"}
                  />
                  <label class="form-check-label" for="gender2">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">
                Select Your Marital <span class="text-danger">*</span>
              </label>
              <div class="d-flex gap-4">
                <div class="form-check radio-bg-light">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="Marital"
                    id="Marital1"
                    onChange={(e) =>
                      setuserData({ ...userData, marital_status: "married" })
                    }
                    value={true}
                    checked={userData?.marital_status == "married"}
                  />
                  <label class="form-check-label" for="Marital1">
                    Married
                  </label>
                </div>
                <div class="form-check radio-bg-light">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="Marital"
                    id="Marital2"
                    onChange={(e) =>
                      setuserData({ ...userData, marital_status: "single" })
                    }
                    checked={userData?.marital_status == "single"}
                  />
                  <label class="form-check-label" for="Marital2">
                    unmarried
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">
                state<span class="text-danger">*</span>
              </label>
              <select
                onChange={(e) => onSelectState(e.target.value)}
                class="form-select"
              >
                {authUser?.state ? (
                  <option value={authUser?.state}>{authUser?.state}</option>
                ) : (
                  <option value="">Select your state</option>
                )}
                {State.getStatesOfCountry("IN").map((data) => (
                  <option key={data.isoCode} value={JSON.stringify(data)}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">
                city<span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                onChange={(e) => {
                  try {
                    setuserData({
                      ...userData,
                      city: JSON.parse(e.target.value).name,
                    });
                  } catch (error) {
                    setuserData({
                      ...userData,
                      city: userData,
                    });
                  }
                }}
                // defaultValue={authUser?.city}
                // value={userData?.city}
              >
                {authUser?.city ? (
                  <option value={authUser?.city}>{authUser?.city}</option>
                ) : (
                  <option value="">Select your city</option>
                )}

                {selectedStateCity.map((data, key) => (
                  <option key={key} value={JSON.stringify(data)}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Address --> */}
            <div class="col-12">
              <label class="form-label">Address</label>
              <textarea
                onChange={(e) =>
                  setuserData({
                    ...userData,
                    address: e.target.value,
                  })
                }
                class="form-control"
                rows="3"
                spellcheck="false"
                value={userData?.address}
              ></textarea>
            </div>

            {/* <!-- Button --> */}
            <div class="col-12 text-start">
              <button onClick={saveChange} class="btn btn-primary btn-sm mb-0">
                {apiCallLoading ? (
                  <CircularProgress size={15} color="inherit" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
          {/* <!-- Form END --> */}
        </div>
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default ProfileInfo;
