import { cdnUrl } from "@/util/server";
import Script from "next/script";

export const metadata = {
  title: "trivyo - Sign in",
  description:
    "Join trivyo today and start enjoying our exclusive services. Sign up now to create your account and stay connected.",
};

export default function SigninLayout({ children }) {
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
        <link rel="shortcut icon" href={cdnUrl("img/favicon-32x32.png")} />

        {/* <!-- Google Font --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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

        {/* <!-- Theme CSS --> */}
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
        <script src={cdnUrl("assets/js/sitethememood.js")}></script>
      </head>

      <body>
        {/* <!-- **************** MAIN CONTENT START **************** --> */}
        {children}
        {/* <!-- Bootstrap JS --> */}
        {/* <main>
        </main> */}
        {/* <!-- **************** MAIN CONTENT END **************** --> */}

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
