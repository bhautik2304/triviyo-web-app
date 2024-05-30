export const appRoutes = {
    home: '/',
    login: 'sign-in',
    register: 'sign-up',
}

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN + 'api/'

export const apiRoutes = {
    auth: {
        signupLogin: `${apiDomain}auth/customer`
    }
}

export const errorCode = {
    serverError: {
        code: 500,
        msg: (msg) => `Server Error : ${msg}`
    },
    createRes: {
        code: 200,
        msg: (msg) => msg
    },
    updateRes: {
        code: 201,
        msg: (msg) => msg
    },
    deleteRes: {
        code: 202,
        msg: (msg) => msg
    },
    invalidReq: {
        code: 400,
        msg: (msg) => msg
    },
    invalidOtp: {
        code: 401,
        msg: (msg) => msg
    },
}