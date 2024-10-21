"use client";
import React, { useEffect } from "react";
import PrifileNavbar from "./components/Profile/PrifileNavbar";
import ProfileSidebar from "./components/Profile/ProfileSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "@/redux/thunk/user";
import LinearProgress from "@mui/material/LinearProgress";
import { fetchUserBooking } from "@/redux/thunk/userBooking";

function ProfileLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  const { authUser, authStatus, loadingState, progress } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(fetchUserBooking(authUser?.id));
  }, [authUser]);

  return (
    <>
      <PrifileNavbar />
      <main>
        <section class="pt-3">
          <div class="container">
            <div class="row">
              <ProfileSidebar />

              <div class="col-lg-8 col-xl-9">
                <div class="d-grid mb-0 d-lg-none w-100">
                  <button
                    class="btn btn-primary mb-4"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasSidebar"
                    aria-controls="offcanvasSidebar"
                  >
                    <i class="fas fa-sliders-h"></i> Menu
                  </button>
                </div>
                <div class="vstack gap-4">{children}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfileLayout;
