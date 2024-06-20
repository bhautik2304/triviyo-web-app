import { cookiesKey } from "@/constant"
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export const checkSession = async () => {
    const authStatus = getCookie(cookiesKey.authToken)
    const authUser = getCookie(cookiesKey.user)
    if (authStatus && authUser) {
        return { token: JSON.parse(authStatus), user: JSON.parse(authUser) }
    } else {
        return { token: false, user: false }
    }
}

export const setSession = async (tokken, user) => {
    await setCookie(cookiesKey.authToken, JSON.stringify(tokken))
    await setCookie(cookiesKey.user, JSON.stringify(user))
    return true
}

export const removeSesson = () => {
    deleteCookie(cookiesKey.authToken)
    deleteCookie(cookiesKey.user)
    return true
}
