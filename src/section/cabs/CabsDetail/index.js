"use client";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CabsPayout from "./CabsPayout";
import CabDetails from "./CabDetails";
import CustomerDetails from "./CustomerDetails";
import { getCityFromAddress } from "@/util";
import { appAxios } from "@/lib/axios";
import { api } from "@/lib/api";
import CabInclusiveOrExclusive from "./CabInclusiveOrExclusive";
import CabTermsAndCondition from "./CabTermsAndCondition";
import Signin from "@/section/auth/signin/Signin";

function CabsDetail() {
  const [km, setKm] = useState(0);
  const [origin, setorigin] = useState({});
  const [datas, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));

  const { authUser } = useSelector((state) => state.user);

  useEffect(() => {
    api.cabs
      .getCabFare(
        qry_params,
        (data) => {
          console.log(data);
          setData(data.fare);
          setLoading(false);
        },
        () => {
          setLoading(true);
        },
        () => {
          setLoading(false);
        }
      )
      .then();
  }, []);

  console.log(qry_params);

  return (
    <>
      <main>
        <section class="pt-4">
          <div class="container position-relative">
            {/* <!-- Title and button START --> */}
            <div class="row">
              <div class="col-12">
                {/* <!-- Meta --> */}
                <div class="d-flex justify-content-between align-items-lg-center">
                  {/* <!-- Title --> */}
                  <ul class="nav nav-divider align-items-center mb-0">
                    <li class="nav-item h6 ">
                      {`${getCityFromAddress(
                        qry_params?.fromCity?.name
                      )} to ${getCityFromAddress(qry_params?.toCity?.name)}`}
                    </li>
                    <li class="nav-item h6 ">{qry_params?.tripType}</li>
                    <li class="nav-item h6 ">
                      {moment(qry_params?.pickupDate).format("D MMM YYYY")} -{" "}
                      {moment(
                        `${qry_params?.pickupDate}T${qry_params?.pickupTime}`
                      ).format("HH:mm A")}
                    </li>
                  </ul>

                  {/* <!-- Buttons --> */}
                  <div class="ms-3">
                    {/* <!-- Share button --> */}
                    <a
                      href="#"
                      class="btn btn-sm btn-light px-2 mb-0"
                      role="button"
                      id="dropdownShare"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-fw fa-share-alt"></i>
                    </a>
                    {/* <!-- dropdown button --> */}
                    <ul
                      class="dropdown-menu dropdown-menu-end min-w-auto shadow rounded"
                      aria-labelledby="dropdownShare"
                    >
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fab fa-twitter-square me-2"></i>Twitter
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fab fa-facebook-square me-2"></i>Facebook
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fab fa-linkedin me-2"></i>LinkedIn
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fa-solid fa-copy me-2"></i>Copy link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Title and button END --> */}
          </div>
        </section>
        <section class="pt-0">
          <div class="container" data-sticky-container>
            <div class="row g-4">
              <div class="col-xl-8">
                <div class="vstack gap-5">
                  <CabDetails
                    data={qry_params?.cabDetaild}
                    faredata={datas}
                    loading={loading}
                  />
                  {!authUser && (
                    <div class="card border">
                      {/* <!-- Card header --> */}
                      <div class="card-header border-bottom bg-transparent">
                        <h6 class="mb-0">
                          Login Or Signup for View your traveller information &
                          unlock deals!{" "}
                        </h6>
                      </div>

                      {/* <!-- Card body START --> */}
                      <div class="card-body">
                        <Signin onlyrefresh={true} noCredite />
                      </div>
                    </div>
                  )}
                  <CustomerDetails data={qry_params} />
                  <CabInclusiveOrExclusive
                    data={qry_params?.cabDetaild}
                    faredata={datas}
                    loading={loading}
                  />
                  <CabTermsAndCondition />
                </div>
              </div>
              <aside class="col-xl-4">
                <CabsPayout fareData={datas} loading={loading} />
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CabsDetail;
