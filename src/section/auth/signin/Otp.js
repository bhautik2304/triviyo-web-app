import React, { useState } from 'react'
import OTPInput from 'react-otp-input'

function Otp({ value, setOtp, loader, isTimerActive, timer, submit, signInsubmit }) {

    return (
        <>
            <div class="mb-3">
                <OTPInput

                    value={value}
                    onChange={setOtp}
                    numInputs={4}
                    // renderSeparator={<span>-</span>}
                    containerStyle={{
                        width: '100%',
                        // backgroundColor: 'red',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                    inputStyle={{
                        width: "100%",
                        margin: 5
                    }}
                    renderInput={(props) => <input maxlength="1" class="form-control text-center p-3" {...props} />} />
            </div>
            {/* <!-- Remember me --> */}
            {/* <input type="checkbox" class="form-check-input me-2" id="rememberCheck" /> */}
            {
                isTimerActive ? (
                    <>
                        <div class="d-sm-flex justify-content-between small mb-4">
                            <span></span>
                            <span>
                                Resend OTP After
                                <span className='text-success' >{` ${timer}`}</span>
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div class="d-sm-flex justify-content-between small mb-4">
                            <span>Don't get a code?</span>
                            <span onClick={signInsubmit} href="#" class="btn btn-sm btn-link p-0 text-decoration-underline mb-0">Click to resend</span>
                        </div>
                    </>
                )
            }
            {/* <!-- Button --> */}
            <div>
                <button disabled={loader} onClick={submit} class="btn btn-primary w-100 mb-0">
                    {loader ? <CircularProgress size={15} color='inherit' /> : "contiinue"}
                </button>
            </div>
        </>
    )
}

export default Otp