import React from "react";
import { NoBooking } from "@/section/user";
import CabBookingCard from "./CabBookingCard";

function Completed({ bookingData }) {
  return (
    <>
      <div class="tab-pane fade" id="tab-3">
        {Number(bookingData.length) ? (
          <>
            <h6>Completed booking ({bookingData?.length})</h6>
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

export default Completed;
