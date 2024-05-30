import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { PhoneInputContry } from '@/components';

const loginWithType = {
    num: 'Whatsapp',
    email: 'email'
}

function SignInInput() {
    const [value, setValue] = useState()
    const [loader, setLoader] = useState(false)
    const [loginWith, setLoginWith] = useState(loginWithType.num);

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
    return (
        <>
            {/* <!-- Email --> */}
            <div class="mb-3">
                {
                    loginWith == loginWithType.num ? (
                        <>
                            <PhoneInputContry value={value} onChange={(e) => setValue(e)} />
                        </>
                    ) : (
                        <>
                            <label class="form-label">Enter Email id</label>
                            <input type="email" class="form-control" value={value} onChange={e => onChange(e.target.value)}
                            />
                        </>
                    )
                }
            </div>
            {/* <!-- Remember me --> */}
            <div class="mb-3">
                {/* <input type="checkbox" class="form-check-input me-2" id="rememberCheck" /> */}
                {/* <label class="form-check-label" for="rememberCheck">Keep me signed in</label> */}
            </div>
            {/* <!-- Button --> */}
            <div>
                <button disabled={loader} onClick={submit} class="btn btn-primary w-100 mb-0">
                    {loader ? <CircularProgress size={15} color='inherit' /> : "contiinue"}
                </button>
            </div>

            {/* <!-- Divider --> */}
            <div class="position-relative my-4">
                <hr />
                <p class="small position-absolute top-50 start-50 translate-middle bg-mode px-1 px-sm-2">Or sign in with</p>
            </div>

            {/* <!-- Google and facebook button --> */}
            <div class="vstack gap-3">
                {
                    loginWith == loginWithType.num ? (
                        <>
                            <button onClick={() => {
                                setValue("")
                                setLoginWith(loginWithType.email)
                            }} href="#" class="btn btn-light mb-0"><i class="bi bi-envelope me-2"></i>Sign in with Mail</button>
                        </>) : (
                        <>
                            <button onClick={() => {
                                setValue("")
                                setLoginWith(loginWithType.num)
                            }} href="#" class="btn btn-success mb-0"><i class="bi bi-whatsapp me-2"></i>Sign in with Whatsapp</button>
                        </>
                    )
                }
                <a href="#" class="btn btn-light mb-0"><i class="fab fa-fw fa-google text-google-icon me-2"></i>Sign in with Google</a>
            </div>
        </>
    )
}

export default SignInInput