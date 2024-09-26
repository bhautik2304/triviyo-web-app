"use client";
import { appRoutes, cookiesKey } from "@/constant";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { Favicon } from "@/layout";
import ProfileLayout from "@/layout/ProfileLayout";
import Script from "next/script";
import { Providers } from "@/redux/Provider";

export default function UserLayout({ children }) {
  useEffect(() => {
    const session = getCookie(cookiesKey.authToken);
    if (!session) {
      console.log("session", session);
      redirect(appRoutes.home);
    } else {
    }
  }, []);
  return (
    <>
      <html lang="en">
        <head>
          {/* <!-- Meta Tags --> */}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="author" content="vttcabs.com" />

          {/* <!-- Favicon --> */}
          <Favicon />
          {/* <!-- Google Font --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
          />

          {/* <!-- Plugins CSS --> */}
          <link
            rel="stylesheet"
            type="text/css"
            href={cdnUrl("/assets/vendor/font-awesome/css/all.min.css")}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={cdnUrl("/assets/vendor/bootstrap-icons/bootstrap-icons.css")}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={cdnUrl("/assets/vendor/choices/css/choices.min.css")}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={cdnUrl("/assets/vendor/flatpickr/css/flatpickr.min.css")}
          />

          {/* <!-- Theme CSS --> */}
          <link
            rel="stylesheet"
            type="text/css"
            href={cdnUrl("/assets/css/style.css")}
          />
          <Script src={cdnUrl("/assets/js/sitethememood.js")}></Script>
        </head>
        <body class="dashboard">
          {/* Layout UI */}
          <Providers>
            <ProfileLayout>
              <main>{children}</main>
            </ProfileLayout>
          </Providers>
          <div className="back-top"></div>

          {/* <!-- Bootstrap JS --> */}
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>

          {/* <!-- Vendors --> */}
          <Script src={cdnUrl("assets/vendor/aos/aos.js")}></Script>
          <Script
            src={cdnUrl("/assets/vendor/choices/js/choices.min.js")}
          ></Script>
          <Script
            src={cdnUrl("/assets/vendor/flatpickr/js/flatpickr.min.js")}
          ></Script>

          {/* <!-- ThemeFunctions --> */}
          <Script src={cdnUrl("assets/js/functions.js")}></Script>
        </body>
      </html>
    </>
  );
}
