import { apiRoutes, statusCode } from "@/constant";
// import axios from "axios"
import { appAxios, appAxios as axios } from "../axios";

export const api = {
  authApi: {
    login: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.auth.signupLogin, data)
        .then((e) => {
          success(e.data);
        })
        .catch((err) => {
          error(err);
        });
    },
    otpCheck: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.auth.optCheck, data)
        .then((e) => {
          success(e.data);
        })
        .catch((error) => {
          error(error);
        });
    },
    newUserRegister: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.auth.userRegister, data)
        .then((e) => {
          if (e.data.code == statusCode.createRes.code) {
            success(e.data);
          } else {
            error();
          }
        })
        .catch(() => {
          error();
        });
    },
    passwordCheck: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.auth.checkpassword, data)
        .then((e) => {
          if (e.data.code == statusCode.createRes.code) {
            success(e.data);
          } else {
            error();
          }
        })
        .catch(() => {
          error();
        });
    },
  },
  customer: {
    update: (id, data, success, pending, error) => {
      pending();
      appAxios
        .put(apiRoutes.user.customer(id), data)
        .then((e) => {
          if (e.data.code == statusCode.updateRes.code) {
            success(e.data);
          } else {
            error(e.data);
          }
        })
        .catch((err) => {
          console.log(err);
          error();
        });
    },
    contactinfogenotp: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.user.contactinfogenotp, data)
        .then((e) => {
          success(e.data);
        })
        .catch((err) => {
          error(err);
        });
    },
    contactinfogenotpverify: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.user.contactinfogenotpverify, data)
        .then((e) => {
          success(e.data);
        })
        .catch((err) => {
          error(err);
        });
    },
    changepassword: (data, pending, success, error) => {
      pending();
      axios
        .post(apiRoutes.user.changepassword, data)
        .then((e) => {
          success(e.data);
        })
        .catch((err) => {
          error(err);
        });
    },
  },
};
