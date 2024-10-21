import React from "react";
import Skeleton from "@mui/material/Skeleton";

function SkeletonBooking() {
  return (
    <>
      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 5 }}
        width={"100%"}
        height={"183px"}
      />
    </>
  );
}

export default SkeletonBooking;
