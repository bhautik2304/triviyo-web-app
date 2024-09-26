// Import Firebase SDKs and custom utilities
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { isBrowser, deviceRegister } from "@/lib/config";
import { localStorageKey } from "@/constant";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Variables to store Firebase app and messaging instances
let app;
let messaging;

// Function to initialize Firebase only on the client side
function initializeFirebase() {
  if (isBrowser() && !app) {
    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  }
}

// Function to request notification permissions and generate FCM token
export async function requestPermission() {
  try {
    if (!isBrowser()) return; // Prevent execution on server-side

    initializeFirebase(); // Ensure Firebase is initialized on the client-side

    const storedToken = localStorage.getItem(localStorageKey.fcmTokken);
    if (storedToken) {
      // Token already exists, register the device
      deviceRegister(storedToken);
      setupOnMessageListener();
    } else {
      // Request notification permissions
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // Generate FCM token
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_NEXT_VPI_KEY,
        });
        console.log("FCM Token:", token);
        // Register the device with the generated token
        deviceRegister(token);
        // Store the token for future use
        localStorage.setItem(localStorageKey.fcmTokken, token);
        setupOnMessageListener(); // Set up listener for incoming messages
      } else {
        console.error("Notification permission denied.");
      }
    }
  } catch (error) {
    console.error("Error requesting permission for notifications:", error);
  }
}

// Function to set up listener for incoming FCM messages
function setupOnMessageListener() {
  if (isBrowser() && messaging) {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
      };
      new Notification(notificationTitle, notificationOptions);
    });
  }
}
