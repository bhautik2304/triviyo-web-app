"use client"
import { api } from '@/lib/api'
import React, { useState, useEffect } from 'react'
import SignInInput from './SignInInput'
import Otp from './Otp'
import moment from 'moment';
import { loginWithType, authState } from './constants'
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constant'
import NewRegistration from './NewRegistration'
import { getCookie, setCookie } from 'cookies-next'
import PasswordLogin from './PasswordLogin'
import { setSession } from '@/lib/auth'

function Signin() {
    const [authProcessState, setAuthProcessState] = useState(authState.mobileOrEmail)
    const [value, setValue] = useState()
    const [loader, setLoader] = useState(false)
    const [loginWith, setLoginWith] = useState(loginWithType.num);
    const [customer, setCustomer] = useState();

    const [otp, setOtp] = useState()
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const router = useRouter();

    useEffect(() => {
        let intervalId;
        if (isTimerActive) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setIsTimerActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isTimerActive]);

    const submit = () => {
        console.log("hello");
        api.authApi.login({
            number: value,
            channel: loginWith
        },
            () => {
                setLoader(true)
            },
            (e) => {
                console.log(e);
                if (e.authtype == "password") {
                    console.log(authState.authType);
                    setAuthProcessState(authState.authType)
                } else {
                    startTimer()
                    setAuthProcessState(authState.checkOtp)
                    localStorage.setItem('otp_id', e.Token)
                }
                setLoader(false)
            }, () => {
                setLoader(false)
            })
    }
    const otpSubmit = () => {
        api.authApi.otpCheck({
            token: localStorage.getItem('otp_id'),
            otp: otp
        },
            () => {
                setLoader(true)
            },
            async (e) => {
                if (e.new_user) {
                    setAuthProcessState(authState.createAccount)
                    setCustomer(e.customer)
                } else {
                    const session = await setSession(e.token, e.customer)
                    if (session) {
                        localStorage.removeItem('otp_id')
                        setLoader(false)
                        router.push(appRoutes.home)
                    }
                }
            }, () => {
                setLoader(false)
            })
    }

    const passwordSubmit = (customerData) => {
        api.authApi.passwordCheck({ number: value, password: customerData?.password },
            () => {
                setLoader(true)
            },
            async (e) => {
                if (e.new_user) {
                    setAuthProcessState(authState.createAccount)
                    setCustomer(e.customer)
                } else {
                    const session = await setSession(e.token, e.customer)
                    if (session) {
                        localStorage.removeItem('otp_id')
                        setLoader(false)
                        router.push(appRoutes.home)
                    }
                }
            }, () => {
                setLoader(false)
            })
    }

    const startTimer = () => {
        setTimeLeft(60);
        setIsTimerActive(true);
    };

    const formatTime = (seconds) => {
        const duration = moment.duration(seconds, 'seconds');
        return moment.utc(duration.asMilliseconds()).format('mm:ss');
    };

    return (
        <>
            <div class="mt-4 text-start">

                {
                    authProcessState == authState.mobileOrEmail && (
                        <>
                            <h1 class="mb-2 h5">Sign up / Login now to</h1>
                            <SignInInput
                                submit={submit}
                                value={value}
                                onChange={(e) => setValue(e)}
                                loader={loader}
                                loginWith={loginWith}
                                setValue={setValue}
                                setLoginWith={setLoginWith}
                            />
                            {/* <Otp /> */}
                        </>
                    )
                }
                {authProcessState == authState.checkOtp && (
                    <>
                        <h1 class="mb-2 h5">OTP.</h1>
                        <p class="mb-sm-0">We have to send a code to <b>{ }</b></p>
                        <div className='w-100' >
                            <Otp value={otp} signInsubmit={submit} setOtp={setOtp} submit={otpSubmit} isTimerActive={isTimerActive} timer={formatTime(timeLeft)} />
                        </div>
                    </>
                )}
                {authProcessState == authState.createAccount && (
                    <>
                        <div className='w-100' >
                            <NewRegistration customerData={customer} />
                        </div>
                    </>
                )}
                {authProcessState == authState.authType && (
                    <>
                        <div className='w-100' >
                            <PasswordLogin customer={customer} setCustomer={setCustomer} submit={passwordSubmit} loader={loader} />
                        </div>
                    </>
                )}
                {/* <!-- Copyright --> */}
                <div class="text-primary-hover text-body mt-3 text-center"> © All rights reserved. by <a href="https://www.vttcabs.com/" class="text-body">VTT Cabs private limited</a>. </div>
            </div>
        </>
    )
}

export default Signin