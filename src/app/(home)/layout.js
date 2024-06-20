import { HomeFooter, HomeHeader, NotificationAlert } from "@/components";
import { Favicon } from "@/layout";
import HomeLayout from "@/layout/HomeLayout";
import { Providers } from "@/redux/Provider";
import Script from "next/script";

export const metadata = {
  title: "VTT Cabs - Reliable Cab and Hotel Booking Services",
  description: "Welcome to VTT Cabs, your trusted partner for hassle-free cab and hotel bookings. With our extensive network of reliable drivers and accommodation providers, we ensure seamless travel experiences for every journey. Whether you need a comfortable ride to your destination or a cozy stay at your favorite hotel, VTT Cabs has got you covered. Book your next trip with us and enjoy convenience, safety, and affordability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Meta Tags --> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="vttcabs.com" />

        {/* <!-- Favicon --> */}
        <Favicon />
        {/* <!-- Google Font --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap" />

        {/* <!-- Plugins CSS --> */}
        <link rel="stylesheet" type="text/css" href="assets/vendor/font-awesome/css/all.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" type="text/css" href="assets/vendor/choices/css/choices.min.css" />
        <link rel="stylesheet" type="text/css" href="assets/vendor/flatpickr/css/flatpickr.min.css" />

        {/* <!-- Theme CSS --> */}
        <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
        <script src="assets/js/sitethememood.js"></script>
      </head>
      <body>
        <Providers>
          <NotificationAlert />
          <HomeLayout heder={true} footer={true} >
            {children}
          </HomeLayout>
        </Providers>
        {/* <!-- Back to top --> */}
        <div className="back-top"></div>

        {/* <!-- Bootstrap JS --> */}
        <Script src="assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>

        {/* <!-- Vendors --> */}
        <Script src="assets/vendor/choices/js/choices.min.js"></Script>
        <Script src="assets/vendor/flatpickr/js/flatpickr.min.js"></Script>

        {/* <!-- ThemeFunctions --> */}
        <Script src="assets/js/functions.js"></Script>
      </body>
    </html>
  );
}
