import React from "react";
import { NoBooking } from "@/section/user";

function Canceled({ bookingData }) {
  return (
    <>
      <div class="tab-pane fade" id="tab-2">
        {Number(bookingData.length) ? (
          <>
            <h6>Canceled booking ({bookingData?.length})</h6>
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

export default Canceled;
