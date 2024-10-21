"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { appAxios } from "@/lib/axios";
import { apiRoutes } from "@/constant";
import CabsPayout from "./CabsPayout";
import CabBookingDetaild from "./CabBookingDetaild";
import Lottie from "lottie-react";
import { bookingLoading } from "@/assets";
import { isMobile } from "react-device-detect";

function CabConfirmBooking() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);

  const qry = useSearchParams();
  const qry_params = qry.get("booking_id");

  useEffect(() => {
    appAxios
      .post(apiRoutes.payment.confirmBooking, { booking_id: qry_params })
      .then((e) => {
        if (e.data.code == 200) {
          setLoading(false);
          setData(e.data);
        }
      });
  }, [qry_params]);

  return (
    <>
      <section class="pt-4 pt-md-5">
        <div class="container">
          <div class="row g-4">
            {loading ? (
              <Lottie
                animationData={bookingLoading}
                style={{
                  height: 500,
                  width: "100%",
                }}
                loop={true}
              />
            ) : (
              <>
                <div
                  className={`col-sm-12 col-md-${
                    data?.data?.payment_status?.payment_status !=
                    "payment_successfull"
                      ? "8"
                      : "12"
                  } col-lg-${
                    data?.data?.payment_status?.payment_status !=
                    "payment_successfull"
                      ? "8"
                      : "12"
                  }`}
                >
                  <CabBookingDetaild data={data} />
                </div>
                {data?.data?.payment_status?.payment_status !=
                  "payment_successfull" && (
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <CabsPayout
                      term={data?.terms}
                      bookingdata={data}
                      included_charges={data?.included_charges}
                      extra_charges={data?.extra_charges}
                      fareData={data?.data?.payment_brack_points}
                      loading={loading}
                      bookingData={data?.data?.payment_status}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CabConfirmBooking;
