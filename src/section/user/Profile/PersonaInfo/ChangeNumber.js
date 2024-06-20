"use client";
import { PhoneInputContry } from "@/components";
import React from "react";
import { useSelector } from "react-redux";

function ChangeNumber() {
  const { authUser } = useSelector((state) => state.user);
  return (
    <>
      <div class="card border my-3" id="number">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Update Mobile Number</h4>
          <p class="mb-0">
            Your current email address is{" "}
            <span class="text-primary">{authUser?.number}</span>
          </p>
        </div>

        {/* <!-- Card body START --> */}
        <div class="card-body">
          <div>
            {/* <!-- Email --> */}
            <div className="col-md-6 col-sm-12">
              <PhoneInputContry focus={false} />
            </div>
            <div class="text-start mt-3">
              <a href="#" class="btn btn-primary btn-sm mb-0">
                Save Number
              </a>
            </div>
          </div>
        </div>
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default ChangeNumber;
