"use client";
import React from "react";
import dynamic from "next/dynamic";
import Signin from "@/section/auth/signin/Signin";
import { Logo } from "@/components";
import { getCookie } from "cookies-next";
import { appRoutes, cookiesKey } from "@/constant";
import { redirect } from "next/navigation";

function page() {
  const session = getCookie(cookiesKey.authToken);
  if (session) {
    console.log("session", session);
    redirect(appRoutes.home);
  }

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
                        <div className="container-fluid my-2">
                          <center>
                            <Logo width={150} />
                          </center>
                        </div>
                        {/* <!-- Title --> */}
                        {/* <!-- Form START --> */}
                        <div className="container-fluid my-2">
                          <Signin />
                        </div>
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
  );
}

export default page;
