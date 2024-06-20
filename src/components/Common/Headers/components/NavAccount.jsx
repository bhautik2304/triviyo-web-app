import { appRoutes } from "@/constant";
import { checkSession, removeSesson } from "@/lib/auth";
import { serverUrl } from "@/util/server";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "@/redux/thunk/user";
function NavAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(false);
  const dispatch = useDispatch();

  const authStatus = async () => {
    const status = await checkSession();
    if (status.token) {
      dispatch(fetchAuthUser());
      // setAuthUser(status.user);
    } else {
      setAuth(false);
    }
  };

  useEffect(() => {
    authStatus();
  }, []);

  const { authUser } = useSelector((state) => state.user);

  useEffect(() => {
    setUserData(authUser);
  }, [authUser]);

  const logout = async () => {
    await removeSesson();
    window.location.reload();
  };

  return (
    <>
      {/* <!-- Profile dropdown START --> */}
      {userData ? (
        <>
          <li class="nav-item ms-3 dropdown">
            {/* <!-- Avatar --> */}
            <a
              class="avatar avatar-sm p-0"
              href="#"
              id="profileDropdown"
              role="button"
              data-bs-auto-close="outside"
              data-bs-display="static"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {isLoading && (
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              )}
              <Image
                height={100}
                width={100}
                priority
                className="avatar-img rounded-2"
                src={serverUrl(userData?.picture)}
                alt={userData?.name}
                onLoadingComplete={() => setIsLoading(false)}
                style={{ display: isLoading ? "none" : "block" }}
              />
            </a>

            <ul
              class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
              aria-labelledby="profileDropdown"
            >
              {/* <!-- Profile info --> */}
              <li class="px-3 mb-3">
                <div class="d-flex align-items-center">
                  {/* <!-- Avatar --> */}
                  <div class="avatar me-3">
                    <Image
                      height={100}
                      width={100}
                      priority
                      className="avatar-img rounded-2"
                      src={serverUrl(userData?.picture)}
                      alt={userData?.name}
                      onLoadingComplete={() => setIsLoading(false)}
                      style={{ display: isLoading ? "none" : "block" }}
                    />
                  </div>
                  <div>
                    <a class="h6 mt-2 mt-sm-0" href="#">
                      {userData?.name}
                    </a>
                    <p class="small m-0">
                      {userData?.email ?? userData?.number}
                    </p>
                  </div>
                </div>
              </li>

              {/* <!-- Links --> */}
              <li>
                {" "}
                <hr class="dropdown-divider" />
              </li>
              <li>
                <Link class="dropdown-item my-1" href={appRoutes.profile.home}>
                  <i class="bi bi-person fa-fw me-2"></i>My Profile
                </Link>
              </li>
              <li>
                <Link
                  class="dropdown-item my-1"
                  href={appRoutes.profile.booking}
                >
                  <i class="bi bi-bookmark-check fa-fw me-2"></i>My Bookings
                </Link>
              </li>
              <li>
                <Link
                  class="dropdown-item my-1"
                  href={appRoutes.profile.setting}
                >
                  <i class="bi bi-gear fa-fw me-2"></i>Settings
                </Link>
              </li>
              <li>
                <Link class="dropdown-item my-1" href={appRoutes.profile.help}>
                  <i class="bi bi-info-circle fa-fw me-2"></i>Help Center
                </Link>
              </li>
              <li>
                <button
                  class="dropdown-item bg-danger-soft-hover"
                  onClick={logout}
                >
                  <i class="bi bi-power fa-fw me-2"></i>Sign Out
                </button>
              </li>
              <li>
                {" "}
                <hr class="dropdown-divider" />
              </li>
            </ul>
          </li>
        </>
      ) : (
        <li class="nav-item ms-3 dropdown">
          <a
            class="avatar avatar-sm p-0"
            href="#"
            id="profileDropdown"
            role="button"
            data-bs-auto-close="outside"
            data-bs-display="static"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </a>
        </li>
      )}

      {/* <!-- Profile dropdown END --> */}
    </>
  );
}

export default NavAccount;
