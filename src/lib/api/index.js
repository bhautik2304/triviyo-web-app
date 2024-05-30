import { apiRoutes, errorCode } from "@/constant"
import axios from "axios"

export const api = {
    authApi: {
        login: (data, pending, success, error) => {
            pending()
            axios.post(apiRoutes.auth.signupLogin, data).then((e) => {
                console.log(e.data);
                if (e.data.code == errorCode.createRes.code) {
                    success()
                } else {
                    error()
                }
            }).catch(() => {
                error()
            })
        }
    }
}