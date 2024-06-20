import { api } from '@/lib/api';
import React, { useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { appRoutes, cookiesKey } from '@/constant';
import CircularProgress from '@mui/material/CircularProgress';
import { setSession } from '@/lib/auth';
import { useRouter } from 'next/navigation';

function NewRegistration({ submit, customerData }) {
    const [loader, setLoader] = useState(false)
    const [customer, setCustomer] = useState({});

    const router = useRouter();

    const newUserRegister = () => {
        // const cookieStore = cookies()
        const data = { ...customer, number: customerData?.number }
        console.log(data);
        api.authApi.newUserRegister(data,
            () => {
                // pending
                setLoader(true)
            },
            async (e) => {
                // success
                setLoader(false)
                console.log(e);
                // cookieStore.set()
                const session = await setSession(e.token, e.customer)
                if (session) {
                    router.push(appRoutes.home)
                }
            },
            (e) => {
                // error
                setLoader(false)
                console.log(e);
            })
    }

    return (
        <>
            <h1 class="mb-2 h5">Create new account</h1>
            {/* <p class="mb-0">Already a member?<a href="sign-in.html"> Log in</a></p> */}
            {/* <!-- Form START --> */}
            <div class="mt-4 text-start">
                {/* <!-- Email --> */}
                <div class="mb-3">
                    <label class="form-label">Enter Name</label>
                    <input type="text" value={customer?.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} class="form-control" />
                </div>
                {/* <!-- Password --> */}
                <div class="mb-3 position-relative">
                    <label class="form-label">Enter password</label>
                    <input class="form-control fakepassword" type="password" value={customer?.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} id="psw-input" />
                    <span class="position-absolute top-50 end-0 translate-middle-y p-0 mt-3">
                        <i class="fakepasswordicon fas fa-eye-slash cursor-pointer p-2"></i>
                    </span>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label">Select Gender<span class="text-danger">*</span></label>
                    <div class="d-flex gap-4">
                        <div class="form-check radio-bg-light">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setCustomer({ ...customer, gender: "male" })} checked={customer?.gender == "male"} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Male
                            </label>
                        </div>
                        <div class="form-check radio-bg-light">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => setCustomer({ ...customer, gender: "female" })} checked={customer?.gender == "female"} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Female
                            </label>
                        </div>
                    </div>
                </div>
                {/* <!-- Confirm Password --> */}
                {/* <!-- Button --> */}
                <div>
                    <button onClick={newUserRegister} class="btn btn-primary w-100 mb-0">
                        {loader ? <CircularProgress size={15} color='inherit' /> : "contiinue"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewRegistration