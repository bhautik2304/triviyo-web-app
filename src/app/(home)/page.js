import { GmapPlaceSearch } from "@/components";
import HomeLayout from "@/layout/HomeLayout";
import SearchTab from "@/section/Home/SearchTab";

export default function Home() {
  return (
    <>
      <section class="pt-0">
        {/* <!-- Background and title --> */}
        <div class="container-fluid" style={{ backgroundImage: "url(assets/images/bg/08.jpg)", backgroundPosition: "center left", backgroundSize: "cover" }}>
          <div class="row">
            {/* <!-- Title --> */}
            <div class="col-md-6 mx-auto text-center pt-7 pb-9">
              <h1 class="text-white">Hotels news,Cabs & tour experience</h1>
              <p class="lead text-white mb-0">Get the best prices on 2,000,000+ properties, worldwide</p>
            </div>
          </div>
          {/* <!-- Row END --> */}
        </div>

        <SearchTab />
      </section>
    </>
  );
}
