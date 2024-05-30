"use client"
import { api } from '@/lib/api'
import React, { useState } from 'react'
import SignInInput from './SignInInput'

function Signin() {

    return (
        <>
            <h1 class="mb-2 h3">Sign up / Login now to</h1>
            <div class="mt-4 text-start">

                <SignInInput />
                {/* <!-- Copyright --> */}
                <div class="text-primary-hover text-body mt-3 text-center"> © All rights reserved. by <a href="https://www.vttcabs.com/" class="text-body">VTT Cabs private limited</a>. </div>
            </div>
        </>
    )
}

export default Signin