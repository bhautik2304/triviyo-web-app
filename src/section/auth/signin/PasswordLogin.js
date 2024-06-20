import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function PasswordLogin({ customer, setCustomer, submit, loader }) {
    const [show, setShow] = useState(false)
    return (
        <>
            <h1 class="mb-2 h5">Login Your Account</h1>
            {/* <p class="mb-0">Already a member?<a href="sign-in.html"> Log in</a></p> */}
            {/* <!-- Form START --> */}
            <div class="mt-4 text-start">
                {/* <!-- Email --> */}
                {/* <!-- Password --> */}
                <div class="mb-3 position-relative">
                    <label class="form-label">Enter password</label>
                    <input class="form-control fakepassword" type={show ? "text" : "password"} value={customer?.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} id="psw-input" />
                    <span class="position-absolute top-50 end-0 translate-middle-y p-0 mt-3">
                        <i class="fakepasswordicon fas fa-eye-slash cursor-pointer p-2" onClick={() => setShow(!show)} ></i>
                    </span>
                </div>
                {/* <!-- Confirm Password --> */}
                {/* <!-- Button --> */}
                <div>
                    <button onClick={() => submit(customer)} class="btn btn-primary w-100 mb-0">
                        {loader ? <CircularProgress size={15} color='inherit' /> : "contiinue"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default PasswordLogin