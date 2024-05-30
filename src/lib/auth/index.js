"use server"
import { cookies } from "next/headers"

export const authtication = async () => {
    const cookiesStore = cookies()
    const authStatus = await cookiesStore.has('token')
    return authStatus
}