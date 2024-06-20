import { removeSesson } from "@/lib/auth";
import React, { useState } from "react";
import { ProfileDashboardLink } from "./config";
import { useSelector } from "react-redux";
import { serverUrl } from "@/util/server";
import { Skeleton } from "@mui/material";
import Image from "next/image";

function ProfileSidebar() {
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    removeSesson();
    window.location.reload();
  };
  const { authUser, authStatus, loadingState, progress } = useSelector(
    (state) => state.user
  );
  return (
    <>
      {/* <!-- Sidebar START --> */}
      <div class="col-lg-4 col-xl-3">
        {/* <!-- Responsive offcanvas body START --> */}
        <div
          class="offcanvas-lg offcanvas-end sticky-md-top"
          tabindex="-1"
          id="offcanvasSidebar"
        >
          {/* <!-- Offcanvas header --> */}
          <div class="offcanvas-header justify-content-end pb-2">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasSidebar"
              aria-label="Close"
            ></button>
          </div>

          {/* <!-- Offcanvas body --> */}
          <div class="offcanvas-body p-3 p-lg-0">
            <div class="card bg-light w-100">
              {/* <!-- Edit profile button --> */}
              <div class="position-absolute top-0 end-0 p-3">
                <a
                  href="#"
                  class="text-primary-hover"
                  data-bs-toggle="tooltip"
                  data-bs-title="Edit profile"
                >
                  <i class="bi bi-pencil-square"></i>
                </a>
              </div>

              {/* <!-- Card body START --> */}
              <div class="card-body p-3">
                {/* <!-- Avatar and content --> */}
                <div class="text-center mb-3">
                  {/* <!-- Avatar --> */}
                  <div class="avatar avatar-xl mb-2">
                    {loadingState ? (
                      <Skeleton
                        variant="circular"
                        className="avatar-img rounded-circle border border-2 border-white"
                        width={80}
                        height={80}
                        style={{ position: "absolute", top: 0, left: 0 }}
                      />
                    ) : (
                      <>
                        {isLoading && (
                          <Skeleton
                            variant="circular"
                            className="avatar-img rounded-circle border border-2 border-white"
                            width={80}
                            height={80}
                            style={{ position: "absolute", top: 0, left: 0 }}
                          />
                        )}
                        <Image
                          height={100}
                          width={100}
                          priority
                          className="avatar-img rounded-circle border border-2 border-white"
                          src={serverUrl(authUser?.picture)}
                          alt={authUser?.name}
                          onLoadingComplete={() => setIsLoading(false)}
                          style={{ display: isLoading ? "none" : "block" }}
                        />
                      </>
                    )}
                  </div>
                  <h6 class="mb-0">{authUser?.name}</h6>
                  <a href="#" class="text-reset text-primary-hover small">
                    {authUser?.email ?? authUser?.number}
                  </a>
                  <hr />
                </div>

                {/* <!-- Sidebar menu item START --> */}
                <ul class="nav nav-pills-primary-soft flex-column">
                  <ProfileDashboardLink />
                  <li class="nav-item">
                    <button
                      class="btn text-danger bg-danger-soft-hover w-100"
                      onClick={logout}
                    >
                      <i class="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out
                    </button>
                  </li>
                </ul>
                {/* <!-- Sidebar menu item END --> */}
              </div>
              {/* <!-- Card body END --> */}
            </div>
          </div>
        </div>
        {/* <!-- Responsive offcanvas body END -->	 */}
      </div>
      {/* <!-- Sidebar END --> */}
    </>
  );
}

export default ProfileSidebar;
