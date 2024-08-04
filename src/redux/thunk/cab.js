import { apiRoutes } from "@/constant";
import { appAxios } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCabs = createAsyncThunk(
  "cabs",
  async ({ location, trip = "One Way", cabsType = "all" }) => {
    console.log(location);
    const data = await appAxios
      .post(apiRoutes.cabList.list, {
        location: location,
        trip: trip,
        cabsType: cabsType,
      })
      .then((res) => res.data.data);
    // Inferred return type: Promise<MyData>
    console.log(data);
    return data;
  }
);
