import { siteUrl } from "@/util/server";
import React from "react";

function favicon() {
  return (
    <>
      <link rel="shortcut icon" href="img/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={siteUrl("/img/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={siteUrl("/img/favicon-16x16.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={siteUrl("/img/android-chrome-192x192.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={siteUrl("/img/android-chrome-512x512.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={siteUrl("/img/android-chrome-512x512.png")}
      />

      <link
        rel="apple-touch-icon"
        href={siteUrl("/img/apple-touch-icon.png")}
      ></link>
      <link rel="manifest" href={siteUrl("/img/site.webmanifest")}></link>
    </>
  );
}

export default favicon;
