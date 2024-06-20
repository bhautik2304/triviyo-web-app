import React from "react";
import { useSelector } from "react-redux";

function ChangePassword() {
  const { authUser } = useSelector((state) => state.user);
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

          <div class="mb-3">
            <div className="col-md-6 col-sm-12">
              <label class="form-label"> Enter new password</label>
              <div class="input-group">
                <input
                  class="form-control fakepassword"
                  placeholder="Enter new password"
                  type="password"
                  id="psw-input"
                />
                <span class="input-group-text p-0 bg-transparent">
                  <i class="fakepasswordicon fas fa-eye-slash cursor-pointer p-2"></i>
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Confirm --> */}
          <div class="text-start">
            <a href="#" class="btn btn-primary btn-sm mb-0">
              Change Password
            </a>
          </div>
        </div>
        {/* <!-- Card body END --> */}
      </div>
    </>
  );
}

export default ChangePassword;
