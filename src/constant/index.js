const userProfilePrefix = "/user";

export const appRoutes = {
  home: "/",
  app: {
    cabs: "cabs",
  },
  login: "sign-in",
  register: "sign-up",
  profile: {
    home: "/user",
    booking: `${userProfilePrefix}/mybooking`,
    traveller: `${userProfilePrefix}/travelers`,
    money: `${userProfilePrefix}/vttmoney`,
    help: `${userProfilePrefix}/bookinghelp`,
    coupons: `${userProfilePrefix}/collectedcoupons`,
    setting: `${userProfilePrefix}/setting`,
    deleteprofile: `${userProfilePrefix}/deleteprofile`,
    reviews: `${userProfilePrefix}/reviews`,
    notification: `${userProfilePrefix}/notification`,
  },
};

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN + "/api/";

const apiUrl = (routes) => `${apiDomain}${routes}`;

export const apiRoutes = {
  auth: {
    signupLogin: apiUrl("auth/customer"),
    optCheck: apiUrl("auth/otp"),
    userRegister: apiUrl("auth/customer/create"),
    checkpassword: apiUrl("auth/customer/checkpassword"),
    userFetch: apiUrl("auth/customer/session"),
  },
  config: {
    deviceRegister: apiUrl("config/clientregister"),
  },
  user: {
    profileUpload: apiUrl("customer/profile"),
    customer: (id = null) => apiUrl(`customer${id ? "/" + id : ""}`),
    contactinfogenotp: apiUrl("customer/contactinfogenotp"),
    contactinfogenotpverify: apiUrl("customer/contactinfogenotpverify"),
    changepassword: apiUrl("customer/changepassword"),
  },
  cabList: {
    list: apiUrl("cab/list"),
  },
};

export const statusCode = {
  serverError: {
    code: 500,
    msg: (msg) => `Server Error : ${msg}`,
  },
  createRes: {
    code: 200,
    msg: (msg) => msg,
  },
  updateRes: {
    code: 201,
    msg: (msg) => msg,
  },
  deleteRes: {
    code: 202,
    msg: (msg) => msg,
  },
  invalidReq: {
    code: 400,
    msg: (msg) => msg,
  },
  invalidOtp: {
    code: 401,
    msg: (msg) => msg,
  },
};

export const cookiesKey = {
  authToken: "authToken",
  user: "user",
};

export const localStorageKey = {
  otpToken: "otp_id",
  deviceId: "c4JBSx73Ch0julmbispVeClxmesMFqk6",
  accessKey: "33z44;mCii6wOaV7y/Z6xom>/1n4s",
  fcmTokken: "fcm_token",
};

export const cabSearchSchima = {
  tripType: "",
  origin: {},
  originLatLong: {},
  destination: {},
  destinationLatLong: {},
  location: [],
  locationData: [],
  pickupDate: "",
  pickupTime: "",
};
