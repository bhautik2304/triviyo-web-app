"use client"
import SearchTab from "@/section/Home/SearchTab";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    alert("This Website is Under Construction")
  }, [])


  return (
    <>
      <section class="pt-0">
        {/* <!-- Background and title --> */}
        <div
          class="container-fluid"
          style={{
            backgroundImage: "url(assets/images/bg/08.jpg)",
            backgroundPosition: "center left",
            backgroundSize: "cover",
          }}
        >
          <div class="row">
            {/* <!-- Title --> */}
            <div class="col-md-6 mx-auto text-center pt-7 pb-9">
              <h1 class="text-white">Hotel, cab & tour experience</h1>
              <p class="lead text-white mb-0">
                Get the best prices Cabs in Vadodara
              </p>
            </div>
          </div>
          {/* <!-- Row END --> */}
        </div>

        <SearchTab />
      </section>
    </>
  );
}
