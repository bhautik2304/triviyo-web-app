import { Skeleton } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CabCard from "../components/CabCard";
import { useSearchParams } from "next/navigation";

function CabList() {
  const [km, setKm] = useState(0);
  const [origin, setorigin] = useState({});
  const [data, setData] = useState({});

  const { cabs, loading, cabsSearch } = useSelector((state) => state.cab);

  useEffect(() => {
    setData(cabsSearch);
  }, [cabsSearch]);
  console.log(data);
  return (
    <>
      <div class="col-xl-8 col-xxl-9">
        <div class="vstack gap-4">
          {/* <!-- Alert box START --> */}
          {/* <!-- Alert box END --> */}
          {loading ? (
            <>
              {cabs.length > 0 ? (
                <>
                  <div
                    class="alert alert-warning border-warning rounded-3 mb-0"
                    role="alert"
                  >
                    <h5>Why book a {cabsSearch?.tripType} trip with us?</h5>
                    {/* <!-- List --> */}
                    <ul class="list-group list-group-borderless mb-0">
                      <li class="list-group-item d-flex text-body mb-0">
                        <i class="fa-solid fa-check text-warning me-2"></i>Only
                        one-side fare for your doorstep pickup & drop to
                        destination.
                      </li>
                      <li class="list-group-item d-flex text-body mb-0">
                        <i class="fa-solid fa-check text-warning me-2"></i>No
                        hidden charges - Pay nothing extra than what's
                        mentioned.
                      </li>
                      <li class="list-group-item d-flex text-body mb-0">
                        <i class="fa-solid fa-check text-warning me-2"></i>
                        Experienced & polite drivers with clean & comfortable
                        cabs.
                      </li>
                    </ul>
                  </div>
                  {cabs?.map((cab, cabIndex) => (
                    <CabCard key={cabIndex} data={cab} />
                  ))}
                </>
              ) : (
                <>
                  <div
                    class="alert alert-warning border-warning rounded-3 mb-0"
                    role="alert"
                    style={{
                      height: 500,
                    }}
                  >
                    <center>
                      <h5>No Cab Available</h5>
                    </center>
                    {/* <!-- List --> */}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {["", "", ""].map((_, key) => (
                <Skeleton
                  key={key}
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: 250,
                    borderRadius: 5,
                    my: 0.1,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CabList;
