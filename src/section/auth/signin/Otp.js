import React, { useState } from 'react'
import OTPInput from 'react-otp-input'

function Otp({ value, setOtp, loader, loginWith, submit }) {

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
                        width: 100
                    }}
                    renderInput={(props) => <input maxlength="1" class="form-control text-center p-3" {...props} />} />
            </div>
            {/* <!-- Remember me --> */}
            <div class="mb-3 d-flex justify-content-end">
                {/* <input type="checkbox" class="form-check-input me-2" id="rememberCheck" /> */}
                <label class="form-check-label" for="rememberCheck">Resend OTP.</label>
            </div>
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