"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProfileInfoStatus() {
  const [percent, setPercent] = useState(0);
  const { authUser } = useSelector((state) => state.user);

  const setPercentage = useCallback(() => {
    console.log("im run");
    let count = 0;
    if (authUser?.email_verifi) {
      count = 30;
    }
    if (authUser?.number_verifi) {
      count = count + 30;
    }
    if (
      authUser?.birthday &&
      authUser?.address &&
      authUser?.city &&
      authUser?.state &&
      authUser?.marital_status
    ) {
      count = count + 40;
    }
    setPercent(count);
  }, [authUser]);

  useEffect(() => {
    setPercentage();
  }, [authUser]);
  return (
    <>
      <div class="bg-light rounded p-3">
        {/* <!-- Progress bar --> */}
        <div class="overflow-hidden">
          <h6>Complete Your Profile</h6>
          <div class="progress progress-sm bg-success mt-4 bg-opacity-10">
            <div
              class="progress-bar bg-success aos"
              role="progressbar"
              data-aos="slide-right"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span class="progress-percent-simple h6 fw-light ms-auto">
                {percent}%
              </span>
            </div>
          </div>
          <p class="mb-0">
            Get the best out of booking by adding the remaining details!
          </p>
        </div>
        {/* <!-- Content --> */}
        <div class="bg-body rounded p-3 mt-3">
          <ul class="list-inline hstack flex-wrap gap-2 justify-content-between mb-0">
            <li class="list-inline-item h6 fw-normal mb-0">
              <a
                href="#email"
                className={`${!authUser?.email_verifi && "text-primary"}`}
              >
                <i
                  class={`bi ${
                    authUser?.email_verifi
                      ? "bi-check-circle-fill"
                      : "bi-plus-circle-fill"
                  }  ${authUser?.email_verifi && "text-success"} me-2`}
                ></i>
                Verified Email
              </a>
            </li>
            <li class="list-inline-item h6 fw-normal mb-0">
              <a
                href="#number"
                className={`${!authUser?.number_verifi && "text-primary"}`}
              >
                <i
                  class={`bi ${
                    authUser?.number_verifi
                      ? "bi-check-circle-fill"
                      : "bi-plus-circle-fill"
                  }  ${authUser?.number_verifi && "text-success"} me-2`}
                ></i>
                Verified Mobile Number
              </a>
            </li>
            <li class="list-inline-item h6 fw-normal mb-0">
              <a
                href="#info"
                className={`${!(percent >= 70) && "text-primary"}`}
              >
                <i
                  class={`bi ${
                    percent >= 70
                      ? "bi-check-circle-fill"
                      : "bi-plus-circle-fill"
                  }  ${percent >= 70 && "text-success"} me-2`}
                ></i>
                Complete Basic Info
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileInfoStatus;
