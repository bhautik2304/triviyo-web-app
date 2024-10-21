"use client";
import React, { useEffect, useState } from "react";
import { authtication, checkSession } from "@/lib/auth";
import Link from "next/link";
import { appRoutes, cookiesKey } from "@/constant";
import { getCookie, setCookie } from "cookies-next";
import NavAccount from "./components/NavAccount";
import { deviceRegister, themeMood } from "@/lib/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "@/redux/thunk/user";
import { requestPermission } from "@/lib/firebase/firebase";
import { fetchUserBooking } from "@/redux/thunk/userBooking";

function HomeHeader() {
  const [auth, setAuth] = useState();
  const [theme, setTheme] = useState();
  const [authsUser, setAuthUser] = useState();

  const dispatch = useDispatch();

  const authStatus = async () => {
    const status = await checkSession();
    if (status.token) {
      setAuth(status.token);
      setAuthUser(status.user);
    } else {
      setAuth(false);
    }
  };

  useEffect(() => {
    requestPermission();
    setTheme(localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    authStatus().then(() => {
      dispatch(fetchAuthUser());
    });
  }, []);
  const { authUser } = useSelector((state) => state.user);
  // console.log(authUser);

  useEffect(() => {
    dispatch(fetchUserBooking(authUser?.id))
  }, [authUser]);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = (newtheme) => {
    localStorage.setItem("theme", newtheme);
    setTheme(newtheme);
  };

  return (
    <>
      {/* <!-- Header START --> */}
      <header className="navbar-light header-sticky">
        {/* <!-- Logo Nav START --> */}
        <nav className="navbar navbar-expand-xl">
          <div className="container">
            {/* <!-- Logo START --> */}
            <a className="navbar-brand" href={appRoutes.home}>
              <img
                className="light-mode-item navbar-brand-item"
                src="/img/logo-light.svg"
                alt="logo"
                // width={50}
                height={50}
                style={{ height: 60 }}
              />
              <img
                className="dark-mode-item navbar-brand-item"
                src="/img/logo-dark.svg"
                alt="logo"
                height={50}
                style={{ height: 60 }}
              />
            </a>
            {/* <!-- Logo END --> */}

            {/* <!-- Buttons START --> */}
            <ul className="nav flex-row align-items-center list-unstyled ms-xl-auto">
              {/* <!-- Download app --> */}
              <li className="nav-item align-items-center d-none d-sm-flex position-relative me-sm-3">
                {/* <!-- Icon --> */}
                <a
                  href="#"
                  className="icon-md btn btn-light mb-0 p-0 flex-shrink-0"
                >
                  <i className="bi bi-cloud-download-fill"></i>
                </a>
                <div className="ms-2 d-none d-md-block">
                  <h6 className="mb-0">
                    <a href="#" className="stretched-link">
                      Download the app
                    </a>
                  </h6>
                  <p className="small mb-0 text-body">
                    Get exciting welcome offers
                  </p>
                </div>
              </li>
              {/* <!-- Login button START --> */}
              {auth ? (
                <NavAccount />
              ) : (
                <>
                  <li className="nav-item ms-3">
                    <Link
                      href={appRoutes.login}
                      className="btn btn-sm btn-primary mb-0"
                    >
                      <i className="fa-solid fa-right-to-bracket me-2"></i>Sign
                      up
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item ms-3">
                <div className="nav-item dropdown">
                  <button
                    className="nav-notification btn btn-white lh-0 p-0 mb-0"
                    id="bd-theme"
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-circle-half fa-fw theme-icon-active"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                      <use href="#"></use>
                    </svg>
                  </button>

                  <ul
                    className="dropdown-menu min-w-auto dropdown-menu-end"
                    aria-labelledby="bd-theme"
                  >
                    <li className="mb-1">
                      <button
                        type="button"
                        className={`dropdown-item d-flex align-items-center ${themeMood("light") ? "active" : ""
                          }`}
                        data-bs-theme-value="light"
                        onClick={() => toggleTheme("light")}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-brightness-high-fill fa-fw mode-switch me-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                          <use href="#"></use>
                        </svg>
                        light
                      </button>
                    </li>
                    <li className="mb-1">
                      <button
                        type="button"
                        className={`dropdown-item d-flex align-items-center ${themeMood("dark") ? "active" : ""
                          }`}
                        data-bs-theme-value="dark"
                        onClick={() => toggleTheme("dark")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-moon-stars-fill fa-fw mode-switch me-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                          <use href="#"></use>
                        </svg>
                        dark
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => toggleTheme("auto")}
                        className={`dropdown-item d-flex align-items-center ${themeMood("auto") ? "active" : ""
                          }`}
                        data-bs-theme-value="auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-circle-half fa-fw mode-switch"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                          <use href="#"></use>
                        </svg>
                        auto
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <!-- Login button END --> */}
            </ul>
            {/* <!-- Buttons START --> */}
          </div>
        </nav>
        {/* <!-- Logo Nav END --> */}
      </header>
      {/* <!-- Header END --> */}
    </>
  );
}

export default HomeHeader;
