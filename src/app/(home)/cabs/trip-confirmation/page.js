import CabConfirmBooking from "@/section/booking";
import { siteUrl } from "@/util/server";
import Script from "next/script";
import React from "react";

function Page() {
  return (
    <>
      <section>
        <CabConfirmBooking />
      </section>
    </>
  );
}

export default Page;
