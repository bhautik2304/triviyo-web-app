import React from 'react'
import dynamic from "next/dynamic";
const Signin = dynamic(() => import('@/section/auth/signin/Signin'), { ssr: false })
import { Logo } from '@/components'

export const metadata = {
    title: "VTT Cabs - Sign in",
    description: "Join VTT Cabs today and start enjoying our exclusive services. Sign up now to create your account and stay connected.",
};

function page() {
    return (
        <>
            <main>
                <section class="vh-xxl-100">
                    <div class="container h-100 d-flex px-0 px-sm-4">
                        <div class="row justify-content-center align-items-center m-auto">
                            <div class="col-12">
                                <div class="bg-mode shadow rounded-3 overflow-hidden">
                                    <div class="row g-0">
                                        {/* <!-- Vector Image --> */}
                                        <div class="col-lg-6 d-md-flex align-items-center order-2 order-lg-1">
                                            <div class="p-3 p-lg-5">
                                                <img src="assets/images/element/signin.svg" alt="" />
                                            </div>
                                            {/* <!-- Divider --> */}
                                            <div class="vr opacity-1 d-none d-lg-block"></div>
                                        </div>

                                        {/* <!-- Information --> */}
                                        <div class="col-lg-6 order-1">
                                            <div class="p-4 p-sm-6">
                                                {/* <!-- Logo --> */}
                                                <Logo />
                                                {/* <!-- Title --> */}
                                                {/* <!-- Form START --> */}
                                                <Signin />
                                                {/* <!-- Form END --> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default page