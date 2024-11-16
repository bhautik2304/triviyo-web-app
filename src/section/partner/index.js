import { HomeFooter, HomeHeader } from "@/components";
import { cdnUrl } from "@/util/server";
import React from "react";

function Home() {
  return (
    <>
      <section className="pt-0">
        {/* <!-- Background and title --> */}
        <div
          className="container-fluid"
          style={{
            backgroundImage: "url(/assets/images/bg/03.jpg)",
            backgroundPosition: "center left",
            backgroundSize: "cover",
          }}
        >
          <HomeHeader
            logo={cdnUrl("img/vtt-cabs-partner.svg")}
            bg="transparent"
          />
          <div className="row">
            {/* <!-- Title --> */}
            <div className="col-md-6 mx-auto text-center pt-7 pb-9">
              <h3 className="text-white">
                Partner with Vtt cabs
                <br /> and grow your business
              </h3>
              <p className="lead text-white mb-0">
                VTTCABS connects you to thousands of customers daily. Drive with
                us for unmatched earning potential.
              </p>
              <div className="text-center my-3">
                <a className="btn btn-lg-lg btn-sm-sm btn-primary" href="#">
                  Register your cab service{" "}
                  <i className="bi bi-arrow-right ps-3"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Row END --> */}
        </div>

        {/* <!-- Search START --> */}
        <div className="container mt-n8">
          <div className="row">
            {/* <!-- Tab content START --> */}
            <div className="col-12">
              <div className="card shadow p-lg-4 p-md-4 p-sm-0">
                {/* <!-- Card header --> */}
                <div className="card-header p-4">
                  <h6 className="mb-0">
                    Get Started - It only takes 10 minutes
                  </h6>
                  <span className="text-muted">
                    Please be ready with the following for a smooth registration
                  </span>
                </div>

                {/* <!-- Card body --> */}
                <div className="card-body pt-0 ">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <span className="text-muted">For Vender Registraion</span>
                      <ul className="list-group list-group-borderless mb-0">
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            PAN card
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            aadhar card{" "}
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Bank account details
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <span className="text-muted">
                        For Driver Registration
                      </span>
                      <ul className="list-group list-group-borderless mb-0">
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Driver aadhar card{" "}
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Driver driving license
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <span className="text-muted">For Cab Verifications</span>
                      <ul className="list-group list-group-borderless mb-0">
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car RC book
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car Insurance Document
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car Fitness Certificates
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car Permeet
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car Puc
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car Detaild
                          </span>
                        </li>
                        <li className="list-group-item d-flex pb-0 mb-0">
                          <span className="h6 fw-normal mb-0">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Car Photos 6 ( With Interior )
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- Button --> */}
                </div>
              </div>
            </div>
            {/* <!-- Tab content END --> */}
          </div>
        </div>
        {/* <!-- Search END --> */}
      </section>
      <section className="pt-0 pt-lg-5">
        <div className="container">
          {/* <!-- Title --> */}
          <div className="row">
            <div className="col-lg-10 col-xl-8 mx-auto">
              <h2 className="mb-4 text-center">Frequently Asked Questions</h2>

              {/* <!-- FAQ START --> */}
              <div
                className="accordion accordion-icon accordion-bg-light"
                id="accordionFaq"
              >
                {/* <!-- Item --> */}
                <div className="accordion-item mb-3">
                  <h6 className="accordion-header font-base" id="heading-1">
                    <button
                      className="accordion-button fw-bold rounded collapsed pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-1"
                      aria-expanded="true"
                      aria-controls="collapse-1"
                    >
                      How Does it Work?
                    </button>
                  </h6>
                  {/* <!-- Body --> */}
                  <div
                    id="collapse-1"
                    className="accordion-collapse collapse show"
                    aria-labelledby="heading-1"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body mt-3 pb-0">
                      Yet remarkably appearance gets him his projection.
                      Diverted endeavor bed peculiar men the not desirous.
                      Acuteness abilities ask can offending furnished fulfilled
                      sex. Warrant fifteen exposed ye at mistake. Blush since so
                      in noisy still built up an again. As young ye hopes no he
                      place means. Partiality diminution gay yet entreaties
                      admiration. In mention perhaps attempt pointed suppose.
                      Unknown ye chamber of warrant of Norland arrived.
                    </div>
                  </div>
                </div>

                {/* <!-- Item --> */}
                <div className="accordion-item mb-3">
                  <h6 className="accordion-header font-base" id="heading-2">
                    <button
                      className="accordion-button fw-bold rounded collapsed pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-2"
                      aria-expanded="false"
                      aria-controls="collapse-2"
                    >
                      What are monthly tracked users?
                    </button>
                  </h6>
                  {/* <!-- Body --> */}
                  <div
                    id="collapse-2"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-2"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body mt-3 pb-0">
                      What deal evil rent by real in. But her ready least set
                      lived spite solid. September how men saw tolerably two
                      behavior arranging. She offices for highest and replied
                      one venture pasture. Applauded no discovery in newspaper
                      allowance am northward. Frequently partiality possession
                      resolution at or appearance unaffected me. Engaged its was
                      the evident pleased husband. Ye goodness felicity do
                      disposal dwelling no. First am plate jokes to began to
                      cause a scale. Subjects he prospect elegance followed no
                      overcame possible it on. Improved own provided blessing
                      may peculiar domestic. Sight house has sex never. No
                      visited raising gravity outward subject my cottage Mr be.
                    </div>
                  </div>
                </div>

                {/* <!-- Item --> */}
                <div className="accordion-item mb-3">
                  <h6 className="accordion-header font-base" id="heading-3">
                    <button
                      className="accordion-button fw-bold collapsed rounded pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-3"
                      aria-expanded="false"
                      aria-controls="collapse-3"
                    >
                      What if I go with my prepaid monthly
                    </button>
                  </h6>
                  {/* <!-- Body --> */}
                  <div
                    id="collapse-3"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-3"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body mt-3 pb-0">
                      Post no so what deal evil rent by real in. But her ready
                      least set lived spite solid. September how men saw
                      tolerably two behavior arranging. She offices for highest
                      and replied one venture pasture. Applauded no discovery in
                      newspaper allowance am northward. Frequently partiality
                      possession resolution at or appearance unaffected me.
                      Engaged its was the evident pleased husband. Ye goodness
                      felicity do disposal dwelling no. First am plate jokes to
                      began to cause a scale. Subjects he prospect elegance
                      followed no overcame possible it on. Improved own provided
                      blessing may peculiar domestic. Sight house has sex never.
                      No visited raising gravity outward subject my cottage Mr
                      be. Hold do at tore in park feet near my case. Invitation
                      at understood occasional sentiments insipidity inhabiting
                      in. Off melancholy alteration principles old. Is do
                      speedily kindness properly oh. Respect article painted
                      cottage he is offices parlors.
                    </div>
                  </div>
                </div>

                {/* <!-- Item --> */}
                <div className="accordion-item mb-3">
                  <h6 className="accordion-header font-base" id="heading-4">
                    <button
                      className="accordion-button fw-bold collapsed rounded pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-4"
                      aria-expanded="false"
                      aria-controls="collapse-4"
                    >
                      What's the difference between cabs and taxi
                    </button>
                  </h6>
                  {/* <!-- Body --> */}
                  <div
                    id="collapse-4"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-4"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body mt-3 pb-0">
                      <p>
                        What deal evil rent by real in. But her ready least set
                        lived spite solid. September how men saw tolerably two
                        behavior arranging. She offices for highest and replied
                        one venture pasture. Applauded no discovery in newspaper
                        allowance am northward. Frequently partiality possession
                        resolution at or appearance unaffected me. Engaged its
                        was the evident pleased husband. Ye goodness felicity do
                        disposal dwelling no. First am plate jokes to began to
                        cause a scale. Subjects he prospect elegance followed no
                        overcame possible it on. Improved own provided blessing
                        may peculiar domestic. Sight house has sex never. No
                        visited raising gravity outward subject my cottage Mr
                        be.
                      </p>
                      <p className="mb-0">
                        At the moment, we only accept Credit/Debit cards and
                        Paypal payments. Paypal is the easiest way to make
                        payments online. While checking out your order. Be sure
                        to fill in correct details for fast & hassle-free
                        payment processing.{" "}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Item --> */}
                <div className="accordion-item mb-3">
                  <h6 className="accordion-header font-base" id="heading-5">
                    <button
                      className="accordion-button fw-bold collapsed rounded pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-5"
                      aria-expanded="false"
                      aria-controls="collapse-5"
                    >
                      How can I check the fare for my Booking ride?
                    </button>
                  </h6>
                  {/* <!-- Body --> */}
                  <div
                    id="collapse-5"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-5"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body mt-3 pb-0">
                      Post no so what deal evil rent by real in. But her ready
                      least set lived spite solid. September how men saw
                      tolerably two behavior arranging. She offices for highest
                      and replied one venture pasture. Applauded no discovery in
                      newspaper allowance am northward. Frequently partiality
                      possession resolution at or appearance unaffected me.
                      Engaged its was the evident pleased husband. Ye goodness
                      felicity do disposal dwelling no. First am plate jokes to
                      began to cause a scale. Subjects he prospect elegance
                      followed no overcame possible it on. Improved own provided
                      blessing may peculiar domestic. Sight house has sex never.
                      No visited raising gravity outward subject my cottage Mr
                      be. Hold do at tore in park feet near my case. Invitation
                      at understood occasional sentiments insipidity inhabiting
                      in. Off melancholy alteration principles old. Is do
                      speedily kindness properly oh. Respect article painted
                      cottage he is offices parlors.
                    </div>
                  </div>
                </div>

                {/* <!-- Item --> */}
                <div className="accordion-item">
                  <h6 className="accordion-header font-base" id="heading-6">
                    <button
                      className="accordion-button fw-bold collapsed rounded pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-6"
                      aria-expanded="false"
                      aria-controls="collapse-6"
                    >
                      Do and Don'ts - Tips for a Safe Trip
                    </button>
                  </h6>
                  {/* <!-- Body --> */}
                  <div
                    id="collapse-6"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading-6"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body mt-3 pb-0">
                      Post no so what deal evil rent by real in. But her ready
                      least set lived spite solid. September how men saw
                      tolerably two behavior arranging. She offices for highest
                      and replied one venture pasture. Applauded no discovery in
                      newspaper allowance am northward. Frequently partiality
                      possession resolution at or appearance unaffected me.
                      Engaged its was the evident pleased husband. Ye goodness
                      felicity do disposal dwelling no. First am plate jokes to
                      began to cause a scale. Subjects he prospect elegance
                      followed no overcame possible it on. Improved own provided
                      blessing may peculiar domestic. Sight house has sex never.
                      No visited raising gravity outward subject my cottage Mr
                      be. Hold do at tore in park feet near my case. Invitation
                      at understood occasional sentiments insipidity inhabiting
                      in. Off melancholy alteration principles old. Is do
                      speedily kindness properly oh. Respect article painted
                      cottage he is offices parlors.
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- FAQ END --> */}
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </>
  );
}

export default Home;
