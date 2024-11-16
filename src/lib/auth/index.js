import { cookiesKey, localStorageKey } from "@/constant";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { isLocalStorageAvailable } from "../config";

export const checkSession = async () => {
  const authStatus = getCookie(cookiesKey.authToken);
  const authUser = getCookie(cookiesKey.user);
  if (authStatus && authUser) {
    return { token: JSON.parse(authStatus), user: JSON.parse(authUser) };
  } else {
    return { token: false, user: false };
  }
};

export const setSession = async (tokken, user) => {
  const users = { ...user, bookings: null };

  await setCookie(cookiesKey.authToken, JSON.stringify(tokken));
  await setCookie(cookiesKey.user, JSON.stringify(users));
  return true;
};

export const removeSesson = () => {
  deleteCookie(cookiesKey.authToken);
  deleteCookie(cookiesKey.user);
  return true;
};

export const logout = () => {
  removeSesson();
  isLocalStorageAvailable()
    ? localStorage.removeItem(localStorageKey.accessKey)
    : null;
};
