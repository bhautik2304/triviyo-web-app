import React from "react";

function NotificationAlert() {
  return (
    <div>
      <div
        className="alert alert-warning py-2 m-0 bg-primary border-0 rounded-0 alert-dismissible fade show text-center overflow-hidden"
        role="alert"
      >
        <p className="text-white m-0">
          Traveling internationally? Get update information on COVID-19 travel
          guidance and restrictions
          <a href="#" className="btn btn-xs btn-dark ms-2 mb-0">
            Learn more!
          </a>
        </p>
        {/* <!-- Close button --> */}
        <button
          type="button"
          className="btn-close btn-close-white opacity-9 p-3"
          data-bs-dismiss="alert"
          ariaLabel="Close"
        ></button>
      </div>
    </div>
  );
}

export default NotificationAlert;
