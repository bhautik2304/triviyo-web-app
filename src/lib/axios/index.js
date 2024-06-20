"use client"
import { cookiesKey, localStorageKey } from "@/constant";
import axios from "axios";
import { getCookie } from "cookies-next";
import { isLocalStorageAvailable } from "../config";

const tokken = getCookie(cookiesKey.authToken) || null
const parseTokken = tokken ? JSON.parse(tokken) : null


export const appAxios = axios.create({
    headers: {
        "x-client-pannel": isLocalStorageAvailable() ? localStorage?.getItem(localStorageKey.deviceId) : null,
        "Authorization": parseTokken
    }
})