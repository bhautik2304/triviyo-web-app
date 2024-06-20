"use client";
import React from "react";
import { useSelector } from "react-redux";

function ChangeEmail() {
  const { authUser } = useSelector((state) => state.user);
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
          <form>
            {/* <!-- Email --> */}
            <div className="col-md-6 col-sm-12">
              <label class="form-label">
                Enter your new email id<span class="text-danger">*</span>
              </label>
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Enter your email id"
              />
            </div>

            <div class="text-start mt-3">
              <a href="#" class="btn btn-primary btn-sm mb-0">
                Save Email
              </a>
            </div>
          </form>
        </div>
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default ChangeEmail;
