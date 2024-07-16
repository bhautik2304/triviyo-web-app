import { appRoutes } from "@/constant";
import Link from "next/link";
import React from "react";

function Logo({ classHeight, imgClass, width = 100, ...props }) {
  return (
    <>
      <Link href={appRoutes.home}>
        <img
          className="light-mode-item"
          src="/img/logo-light.svg"
          alt="logo"
          // width={50}
          width={width}
        />
        <img
          className="dark-mode-item"
          src="/img/logo-dark.svg"
          alt="logo"
          width={width}
        />
      </Link>
    </>
  );
}

export default Logo;
