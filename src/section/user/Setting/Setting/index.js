import React from "react";

function Setting() {
  return (
    <>
      {/* <!-- Notifications START --> */}
      <div class="card border">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Notification Settings</h4>
        </div>

        {/* <!-- Form START --> */}
        <div class="card-body">
          {/* <!-- Radio --> */}
          <div class="mb-4">
            <label class="form-label">
              Newsletter<span class="text-danger">*</span>
            </label>
            <div class="d-flex gap-2 gap-sm-4 flex-wrap">
              <div class="form-check radio-bg-light">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Daily
                </label>
              </div>
              <div class="form-check radio-bg-light">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Twice a week
                </label>
              </div>
              <div class="form-check radio-bg-light">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                />
                <label class="form-check-label" for="flexRadioDefault3">
                  Weekly
                </label>
              </div>
              <div class="form-check radio-bg-light">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault4"
                />
                <label class="form-check-label" for="flexRadioDefault4">
                  Never
                </label>
              </div>
            </div>
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy1">
              Notify me via email when logging in
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy1"
              checked
            />
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy2">
              I would like to receive booking assist reminders
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy2"
              checked
            />
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy3">
              I would like to receive emails about Booking promotions
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy3"
              checked
            />
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy7">
              I would like to know about information and offers related to my
              upcoming trip
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy7"
              checked
            />
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy4">
              Show your profile publicly
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy4"
            />
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy6">
              Send SMS confirmation for all online payments
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy6"
            />
          </div>

          {/* <!-- Switch --> */}
          <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
            <label class="form-check-label ps-0 pe-4" for="checkPrivacy5">
              Check which device(s) access your account
            </label>
            <input
              class="form-check-input flex-shrink-0"
              type="checkbox"
              id="checkPrivacy5"
              checked
            />
          </div>

          {/* <!-- Button --> */}
          <div class="d-sm-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-primary me-2 mb-0">
              Save changes
            </button>
            <a href="#" class="btn btn-sm btn-outline-secondary mb-0">
              Cancel
            </a>
          </div>
        </div>
        {/* <!-- Form END --> */}
      </div>
      {/* <!-- Notifications END --> */}

      {/* <!-- Security settings START --> */}
      <div class="card border my-3">
        {/* <!-- Card header --> */}
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Security settings</h4>
        </div>

        {/* <!-- Card body START --> */}
        <div class="card-body">
          {/* <!-- Active sessions --> */}
          <div>
            <h6>Active sessions</h6>
            <p class="mb-2">
              Selecting "Sign out" will sign you out from all devices except
              this one. This can take up to 10 minutes.
            </p>
            <button class="btn btn-sm btn-danger mb-0">Sign Out</button>
          </div>
        </div>
        {/* <!-- Card body END --> */}
      </div>
      {/* <!-- Security settings END --> */}
    </>
  );
}

export default Setting;
