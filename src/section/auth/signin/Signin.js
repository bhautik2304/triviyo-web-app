"use client"
import { api } from '@/lib/api'
import React, { useState, useEffect } from 'react'
import SignInInput from './SignInInput'
import Otp from './Otp'
import { loginWithType, authState } from './constants'

function Signin() {
    const [authProcessState, setAuthProcessState] = useState(authState.checkOtp)
    const [value, setValue] = useState()
    const [loader, setLoader] = useState(false)
    const [loginWith, setLoginWith] = useState(loginWithType.num);

    const [otp, setOtp] = useState()
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);

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
        api.authApi.login({
            number: value,
            channel: loginWith
        }, () => {
            setLoader(true)
        }, () => {
            setLoader(false)
        }, () => {
            setLoader(false)
        })
    }
    const otpSubmit = () => {
        console.log(otp);
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
            <h1 class="mb-2 h3">Sign up / Login now to</h1>
            <div class="mt-4 text-start">

                {
                    authProcessState == authState.mobileOrEmail && (
                        <>
                            <SignInInput
                                submit={submit}
                                value={value}
                                loader={loader}
                                loginWith={loginWith}
                            />
                            {/* <Otp /> */}
                        </>
                    )
                }
                {authProcessState == authState.checkOtp && (
                    <>
                        <div className='w-100' >
                            <Otp value={otp} setOtp={setOtp} submit={otpSubmit} />
                        </div>
                    </>
                )}
                {authProcessState == authState.createAccount}
                {/* <!-- Copyright --> */}
                <div class="text-primary-hover text-body mt-3 text-center"> © All rights reserved. by <a href="https://www.vttcabs.com/" class="text-body">VTT Cabs private limited</a>. </div>
            </div>
        </>
    )
}

export default Signin