export default function Home() {
  return (
    <>
      <section class="pt-0">
        {/* <!-- Background and title --> */}
        <div class="container-fluid" style={{ backgroundImage: "url(assets/images/bg/08.jpg)", backgroundPosition: "center left", backgroundSize: "cover" }}>
          <div class="row">
            {/* <!-- Title --> */}
            <div class="col-md-6 mx-auto text-center pt-7 pb-9">
              <h1 class="text-white">New Hotels,New Cabs & tour experience</h1>
              <p class="lead text-white mb-0">Get the best prices on 2,000,000+ properties, worldwide</p>
            </div>
          </div>
          {/* <!-- Row END --> */}
        </div>

        {/* <!-- Search START --> */}
        <div class="container mt-n8">
          <div class="row">
            {/* <!-- Tabs START --> */}
            <div class="col-11 col-lg-8 col-xl-6 mx-auto">
              <ul class="nav nav-tabs nav-bottom-line nav-justified nav-responsive bg-mode rounded-top z-index-9 position-relative pt-2 pb-0 px-4">
                <li class="nav-item">
                  <a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-1-4"><i class="fa-solid fa-car fa-fw me-2"></i>Cabs</a>
                </li>
              </ul>
            </div>
            {/* <!-- Tabs END --> */}

            {/* <!-- Tab content START --> */}
            <div class="col-12">
              <div class="tab-content" id="nav-tabContent">
                {/* <!-- Tab content item START --> */}
                <div class="tab-pane fade active show" id="tab-1-4">
                  <form class="card shadow p-0">
                    {/* <!-- Card header --> */}
                    <div class="card-header d-sm-flex justify-content-between align-items-center p-4">
                      {/* <!-- Title --> */}
                      <h5 class="mb-3 mb-sm-0"><i class="fa-solid fa-car fa-fw me-2"></i>Cab Booking</h5>

                      {/* <!-- Tabs --> */}
                      <ul class="nav nav-pills nav-pills-dark" id="pills-tab-2" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button class="nav-link mb-0 rounded-start rounded-0 active" id="pills-one-way-2-tab" data-bs-toggle="pill" data-bs-target="#pills-one-way-2" type="button" role="tab" aria-selected="true">One Way</button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button class="nav-link mb-0 rounded-end rounded-0" id="pills-round-way-2-tab" data-bs-toggle="pill" data-bs-target="#pills-round-way-2" type="button" role="tab" aria-selected="false">Road Trip</button>
                        </li>
                      </ul>
                    </div>

                    {/* <!-- Card body --> */}
                    <div class="card-body p-4 pt-0">
                      {/* <!-- Tab content START --> */}
                      <div class="tab-content" id="pills-tabContent3">
                        {/* <!-- One way tab START --> */}
                        <div class="tab-pane fade show active" id="pills-one-way-2" role="tabpanel" aria-labelledby="pills-one-way-2-tab">
                          <div class="row g-4">
                            {/* <!-- Pickup --> */}
                            <div class="col-md-6 position-relative">
                              <div class="form-icon-input form-size-lg form-fs-lg">
                                <select class="form-select js-choice" data-search-enabled="true">
                                  <option value="">Select pickup location</option>
                                  <option>San Jacinto, USA</option>
                                  <option>North Dakota, Canada</option>
                                  <option>West Virginia, Paris</option>
                                </select>
                                <span class="form-icon"><i class="bi bi-geo-alt fs-5"></i></span>
                              </div>

                              {/* <!-- Auto fill button --> */}
                              <div class="btn-flip-icon z-index-9">
                                <button class="btn btn-white shadow btn-round mb-0"><i class="fa-solid fa-right-left"></i></button>
                              </div>
                            </div>

                            {/* <!-- Drop --> */}
                            <div class="col-md-6">
                              <div class="form-icon-input form-size-lg form-fs-lg">
                                <select class="form-select js-choice" data-search-enabled="true">
                                  <option value="">Select drop location</option>
                                  <option>San Jacinto, USA</option>
                                  <option>North Dakota, Canada</option>
                                  <option>West Virginia, Paris</option>
                                </select>
                                <span class="form-icon"><i class="bi bi-geo-alt fs-5"></i></span>
                              </div>
                            </div>

                            {/* <!-- Pickup date --> */}
                            <div class="col-md-6">
                              <div class="form-icon-input form-fs-lg">
                                <input type="text" class="form-control form-control-lg flatpickr" data-date-format="d/M/Y" placeholder="Select pickup date" />
                                <span class="form-icon"><i class="bi bi-calendar fs-5"></i></span>
                              </div>
                            </div>

                            {/* <!-- Pickup time --> */}
                            <div class="col-md-6">
                              <div class="form-icon-input form-fs-lg">
                                <input type="text" class="form-control form-control-lg flatpickr" placeholder="Select pickup time" data-noCalendar="true" data-enableTime="true" />
                                <span class="form-icon"><i class="bi bi-calendar fs-5"></i></span>
                              </div>
                            </div>
                          </div>
                          {/* <!-- Row END --> */}
                          {/* <!-- Button --> */}
                          <div class="text-center pt-0">
                            <a class="btn btn-lg btn-primary mb-n7" href="#">Search Cabs <i class="bi bi-arrow-right ps-3"></i></a>
                          </div>
                        </div>
                        {/* <!-- One way tab END --> */}

                        {/* <!-- Round way tab START --> */}
                        <div class="tab-pane fade" id="pills-round-way-2" role="tabpanel" aria-labelledby="pills-round-way-2-tab">
                          <div class="row g-4">
                            {/* <!-- Pickup --> */}
                            <div class="col-md-6 position-relative">
                              <div class="form-icon-input form-size-lg form-fs-lg">
                                <select class="form-select js-choice" data-search-enabled="true">
                                  <option value="">Select pickup location</option>
                                  <option>San Jacinto, USA</option>
                                  <option>North Dakota, Canada</option>
                                  <option>West Virginia, Paris</option>
                                </select>
                                <span class="form-icon"><i class="bi bi-geo-alt fs-5"></i></span>
                              </div>

                              {/* <!-- Auto fill button --> */}
                              <div class="btn-flip-icon z-index-9">
                                <button class="btn btn-white shadow btn-round mb-0"><i class="fa-solid fa-right-left"></i></button>
                              </div>
                            </div>

                            {/* <!-- Drop --> */}
                            <div class="col-md-6">
                              <div class="form-icon-input form-size-lg form-fs-lg">
                                <select class="form-select js-choice" data-search-enabled="true">
                                  <option value="">Select drop location</option>
                                  <option>San Jacinto, USA</option>
                                  <option>North Dakota, Canada</option>
                                  <option>West Virginia, Paris</option>
                                </select>
                                <span class="form-icon"><i class="bi bi-geo-alt fs-5"></i></span>
                              </div>
                            </div>

                            {/* <!-- Pickup date --> */}
                            <div class="col-md-6 col-lg-3">
                              <div class="form-icon-input form-fs-lg">
                                <input type="text" class="form-control form-control-lg flatpickr" data-date-format="d/M/Y" placeholder="Select pickup date" />
                                <span class="form-icon"><i class="bi bi-calendar fs-5"></i></span>
                              </div>
                            </div>

                            {/* <!-- Pickup time --> */}
                            <div class="col-md-6 col-lg-3">
                              <div class="form-icon-input form-fs-lg">
                                <input type="text" class="form-control form-control-lg flatpickr" placeholder="Select pickup time" data-noCalendar="true" data-enableTime="true" />
                                <span class="form-icon"><i class="bi bi-calendar fs-5"></i></span>
                              </div>
                            </div>

                            {/* <!-- Drop date --> */}
                            <div class="col-md-6 col-lg-3">
                              <div class="form-icon-input form-fs-lg">
                                <input type="text" class="form-control form-control-lg flatpickr" data-date-format="d/M/Y" placeholder="Select return date" />
                                <span class="form-icon"><i class="bi bi-calendar fs-5"></i></span>
                              </div>
                            </div>

                            {/* <!-- Drop time --> */}
                            <div class="col-md-6 col-lg-3">
                              <div class="form-icon-input form-fs-lg">
                                <input type="text" class="form-control form-control-lg flatpickr" placeholder="Select return time" data-noCalendar="true" data-enableTime="true" />
                                <span class="form-icon"><i class="bi bi-calendar fs-5"></i></span>
                              </div>
                            </div>
                          </div>
                          {/* <!-- Row END --> */}
                          {/* <!-- Button --> */}
                          <div class="text-center pt-0">
                            <a class="btn btn-lg btn-primary mb-n7" href="#">Search cabs <i class="bi bi-arrow-right ps-3"></i></a>
                          </div>
                        </div>
                        {/* <!-- Round way tab END --> */}
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!-- Tab content item END --> */}

              </div>
            </div>
            {/* <!-- Tab content END --> */}
          </div>
        </div>
        {/* <!-- Search END --> */}

      </section>
    </>
  );
}
