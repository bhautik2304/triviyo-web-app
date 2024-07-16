// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  isBrowser,
  deviceRegister,
  isLocalStorageAvailable,
} from "@/lib/config";
import { localStorageKey } from "@/constant";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase

export const app = isBrowser() && initializeApp(firebaseConfig);
export const messaging = isBrowser() && getMessaging(app);

export async function requestPermission() {
  if (isBrowser()) {
    const token = localStorage.getItem(localStorageKey.fcmTokken);
    if (token) {
      deviceRegister(token);
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // ...
        // toast(payload.data.message);
        // Customize notification here
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.message,
          icon: payload.notification.image,
        };
        new Notification(notificationTitle, notificationOptions);
        // Show notification using FCM (if needed)
      });
    } else {
      // window.addEventListener("load", () => {
      //   navigator.serviceWorker
      //     .register("/firebase-messaging-sw.js")
      //     .then((registration) => {
      //       console.log(
      //         "Service Worker registered with scope:",
      //         registration.scope
      //       );
      //       // Initialize Firebase and request FCM token here
      //       initializeFirebaseMessaging(registration);
      //     })
      //     .catch((error) => {
      //       console.error("Service Worker registration failed:", error);
      //     });
      //   });
      Notification.requestPermission()
        .then(() => {
          console.log("Notification permission granted.");
          return getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_NEXT_VPI_KEY,
          });
        })
        .then((token) => {
          console.log("FCM Token:", token);
          deviceRegister(token);
          // Send the token to your server or save it for later use
        })
        .catch((error) => {
          console.error("Error getting FCM token:", error);
          deviceRegister(null);
        });
      // Further code to handle successful token generation
      // Send this token  to server ( db)
    }
  }
}
