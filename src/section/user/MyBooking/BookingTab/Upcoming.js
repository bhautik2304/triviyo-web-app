import React, { useEffect } from "react";
import CabBookingCard from "./CabBookingCard";
import { appAxios } from "@/lib/axios";
import { NoBooking } from "@/section/user";

function Upcoming({ bookingData }) {
  return (
    <>
      <div class="tab-pane fade show active" id="tab-1">
        <h6>Upcoming bookings ({bookingData?.length})</h6>
        {bookingData ? (
          <>
            {bookingData?.map((data, i) => (
              <CabBookingCard data={data} key={i} />
            ))}
          </>
        ) : (
          <NoBooking />
        )}
      </div>
    </>
  );
}

export default Upcoming;
