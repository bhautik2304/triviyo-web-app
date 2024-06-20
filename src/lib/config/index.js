"use client"
import { apiRoutes, localStorageKey } from "@/constant"
import axios from "axios"
import { deviceDetect, isDesktop, getUA } from 'react-device-detect';

let isRegistered = false;

export const isLocalStorageAvailable = () => {
    try {
        const testKey = '__test_key__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};

export function deviceRegister() {
    if (isRegistered) return;

    const deviceId = isLocalStorageAvailable() ? localStorage.getItem(localStorageKey.deviceId) : null;
    const deviceData = deviceDetect(getUA);
    const data = {
        platform: "web", // Assuming platform is the OS
        browser_types: deviceData.browserName, // Assuming browser_types is the browser name
        os: deviceData.osName, // Using OS as an example
    };
    axios.post(apiRoutes.config.deviceRegister, { ...data, deviceId: deviceId }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
            localStorage.setItem(localStorageKey.deviceId, res.data.device_id);
        }
    }).catch(e => console.log(e));
    isRegistered = true;
}