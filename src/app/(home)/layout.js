import { HomeFooter, HomeHeader, NotificationAlert } from "@/components";
import { Favicon } from "@/layout";
import HomeLayout from "@/layout/HomeLayout";
import { Providers } from "@/redux/Provider";
import Script from "next/script";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { cdnUrl, siteUrl } from "@/util/server";
import { appRoutes } from "@/constant";

export const metadata = {
  title: "trivyo - Reliable Cab and Hotel Booking Services",
  description:
    "Welcome to trivyo, your trusted partner for hassle-free cab and hotel bookings. With our extensive network of reliable drivers and accommodation providers, we ensure seamless travel experiences for every journey. Whether you need a comfortable ride to your destination or a cozy stay at your favorite hotel, trivyo has got you covered. Book your next trip with us and enjoy convenience, safety, and affordability.",
};

export default function PrivacyPolicyLayout({ children }) {
  return (
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
          href={cdnUrl("assets/vendor/font-awesome/css/all.min.css")}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={cdnUrl("assets/vendor/bootstrap-icons/bootstrap-icons.css")}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={cdnUrl("assets/vendor/choices/css/choices.min.css")}
        />
        <link
          rel="stylesheet"
          type="text/css"
          href={cdnUrl("assets/vendor/flatpickr/css/flatpickr.min.css")}
        />

        {/* <!-- Theme CSS --> */}
        <link
          rel="stylesheet"
          type="text/css"
          href={cdnUrl("assets/css/style.css")}
        />
        <Script src={cdnUrl("assets/js/sitethememood.js")}></Script>
      </head>
      <body data-bs-theme="dark">
        <Providers>
          <NotificationAlert />
          <HomeLayout heder={true} link={appRoutes.home} footer={true}>
            {children}
          </HomeLayout>
        </Providers>
        {/* <!-- Back to top --> */}
        <div className="back-top"></div>

        {/* <!-- Bootstrap JS --> */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>

        {/* <!-- Vendors --> */}
        <Script src={cdnUrl("assets/vendor/sticky-js/sticky.min.js")}></Script>
        <Script
          src={cdnUrl("assets/vendor/choices/js/choices.min.js")}
        ></Script>
        <Script src="https://cdn.jsdelivr.net/npm/flatpickr"></Script>

        {/* <!-- ThemeFunctions --> */}
        <Script src={cdnUrl("assets/js/functions.js")}></Script>
      </body>
    </html>
  );
}
