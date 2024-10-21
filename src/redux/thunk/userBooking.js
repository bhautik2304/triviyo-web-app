import { apiRoutes } from "@/constant";
import { appAxios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const booking_status = {
  pending: "pending",
  upcomeing: "upcomeing",
  canceled: "canceled",
  completed: "completed",
};

export const fetchUserBooking = createAsyncThunk(
  "userBooking",
  async (userId) => {
    const data = await appAxios
      .post(apiRoutes.user.customerBooking(userId))
      .then((res) => res.data.data);
    // Inferred return type: Promise<MyData>
    console.log(data);
    return {
      upcomeing: data.filter(
        (data) =>
          data?.trip_status == booking_status.pending ||
          data?.trip_status == booking_status.upcomeing
      ),
      canceled: data.filter(
        (data) => data?.trip_status == booking_status.canceled
      ),
      completed: data.filter(
        (data) => data?.trip_status == booking_status.completed
      ),
    };
  }
);
