import { Logo } from "@/components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "@/redux/thunk/user";
import LinearProgress from "@mui/material/LinearProgress";

function PrifileNavbar() {
  const { loadingState, progress } = useSelector((state) => state.user);
  return (
    <>
      <header class="navbar-light header-sticky">
        {/* <!-- Logo Nav START --> */}
        <nav class="navbar navbar-expand-xl">
          <div class="container">
            {/* <!-- Logo START --> */}
            <div class="navbar-brand">
              <Logo width={100} />
            </div>
            {/* <!-- Logo END --> */}

            {/* <!-- Responsive navbar toggler --> */}
            <button
              class="navbar-toggler ms-auto mx-3 me-md-0 p-0 p-sm-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-animation">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* <!-- Main navbar START --> */}
            <div class="navbar-collapse collapse" id="navbarCollapse">
              <ul class="navbar-nav navbar-nav-scroll">
                {/* <!-- Nav item Listing --> */}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Cab Booking
                  </a>
                </li>

                {/* <!-- Nav item Pages --> */}
                <li class="nav-item ">
                  <a class="nav-link" href="#">
                    Hotel Booking
                  </a>
                </li>

                {/* <!-- Nav item Account --> */}
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="accounntMenu"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Link
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="accounntMenu">
                    {/* <!-- Dropdown submenu --> */}
                    <li>
                      <a class="dropdown-item" href="#">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Terms
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Cokkies
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Support
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="page"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Page
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="page">
                    {/* <!-- Dropdown submenu --> */}
                    <li>
                      <a class="dropdown-item" href="#">
                        About us
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Contact us
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        News & Blog
                      </a>
                    </li>
                  </ul>
                </li>

                {/* <!-- Nav item Contact --> */}
                <li class="nav-item">
                  {" "}
                  <a class="nav-link" href="#">
                    Help
                  </a>{" "}
                </li>
              </ul>
            </div>
            {/* <!-- Main navbar END --> */}

            {/* <!-- Profile and Notification START --> */}
            <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
              {/* <!-- Notification dropdown START --> */}
              <li class="nav-item ms-0 ms-md-3 dropdown">
                {/* <!-- Notification button --> */}
                <a
                  class="nav-link p-0"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                >
                  <i class="bi bi-bell fa-fw fs-5"></i>
                </a>
                {/* <!-- Notification dote --> */}
                <span class="notif-badge animation-blink"></span>

                {/* <!-- Notification dropdown menu START --> */}
                <div class="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg">
                  <div class="card bg-transparent">
                    {/* <!-- Card header --> */}
                    <div class="card-header bg-transparent d-flex justify-content-between align-items-center border-bottom">
                      <h6 class="m-0">
                        Notifications{" "}
                        <span class="badge bg-danger bg-opacity-10 text-danger ms-2">
                          4 new
                        </span>
                      </h6>
                      <a class="small" href="#">
                        Clear all
                      </a>
                    </div>

                    {/* <!-- Card body START --> */}
                    <div class="card-body p-0">
                      <ul class="list-group list-group-flush list-unstyled p-2">
                        {/* <!-- Notification item --> */}
                        <li>
                          <a
                            href="#"
                            class="list-group-item list-group-item-action rounded notif-unread border-0 mb-1 p-3"
                          >
                            <h6 class="mb-2">
                              New! Booking flights from New York ✈️
                            </h6>
                            <p class="mb-0 small">
                              Find the flexible ticket on flights around the
                              world. Start searching today
                            </p>
                            <span>Wednesday</span>
                          </a>
                        </li>
                        {/* <!-- Notification item --> */}
                        <li>
                          <a
                            href="#"
                            class="list-group-item list-group-item-action rounded border-0 mb-1 p-3"
                          >
                            <h6 class="mb-2">
                              Sunshine saving are here 🌞 save 30% or more on a
                              stay
                            </h6>
                            <span>15 Nov 2022</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- Card body END --> */}

                    {/* <!-- Card footer --> */}
                    <div class="card-footer bg-transparent text-center border-top">
                      <a href="#" class="btn btn-sm btn-link mb-0 p-0">
                        See all incoming activity
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Notification dropdown menu END --> */}
              </li>
              {/* <!-- Notification dropdown END --> */}
            </ul>
            {/* <!-- Profile and Notification START --> */}
          </div>
        </nav>
        {/* <!-- Logo Nav END --> */}
        {loadingState && (
          <LinearProgress variant={"determinate"} value={progress} />
        )}
      </header>
    </>
  );
}

export default PrifileNavbar;
