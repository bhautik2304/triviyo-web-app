importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBZ8R8i7IKt0sm_my3nZc0BB6PCUq0_mlo",
  authDomain: "vtt-client.firebaseapp.com",
  projectId: "vtt-client",
  storageBucket: "vtt-client.appspot.com",
  messagingSenderId: "281548319236",
  appId: "1:281548319236:web:0d69680ad48a3ead992351",
  measurementId: "G-2DKDDB0DW5",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (event) {
  console.log("Push event received:", event);
});
