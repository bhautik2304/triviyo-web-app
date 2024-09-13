import React, { useEffect, useState } from "react";
import { DateInput, GmapPlaceSearch, TimeInput } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { fetchCabs } from "@/redux/thunk/cab";
import { useDispatch } from "react-redux";
import { changeTripData } from "@/redux/slice/cabBookingSlice";
import { appRoutes } from "@/constant";

const defaultAddress = {
  label: "Surat, Gujarat, India",
  id: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  name: "Surat, Gujarat, India",
  placeId: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
  lat: 21.1702401,
  lng: 72.83106070000001,
};

const roundTrip = {
  tripType: "Round Trip",
  fromCity: {},
  toCity: {},
  stopOvers: [],
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  dropTime: "",
};

function RoundTrip() {
  const [km, setKm] = useState(0);
  const [origin, setorigin] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [stops, setStops] = useState([
    // Initial state with one stop
  ]);

  const [error, setError] = useState({
    origin: false,
    destination: false,
    date: false,
    times: false,
  });

  const qry = useSearchParams();
  const dispatch = useDispatch();
  const routes = useRouter();

  const qry_params = JSON.parse(qry.get("qry"));

  useEffect(() => {
    const datesss = moment(qry_params.pickupDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const combinedDateTimeString = `${datesss}T${qry_params.pickupTime}`;

    // Parse the combined date and time using moment
    const formattedDateTime = moment(combinedDateTimeString).format(
      "YYYY-MM-DDTHH:mm"
    );
    const pickupDate = qry_params?.pickupDate
      ? setDate(moment(qry_params.pickupDate))
      : null;
    const pickupTime = qry_params?.pickupTime
      ? setTime(moment(formattedDateTime))
      : null;
    setData(qry_params);
    console.log(qry_params);

    setStops(qry_params?.stop || []);
  }, []);

  const handleAddStop = () => {
    const newStop = {
      id: stops.length + 1, // Incremental ID
      location: null,
      lat: null,
      lng: null,
    };
    setStops([...stops, newStop]);
  };

  const handleRemoveStop = (stopId) => {
    const updatedStops = stops.filter((stop) => stop.id !== stopId);
    setStops(updatedStops);
  };

  const handleSelectPlace = (place, stopId) => {
    const newLocationData = {
      label: place.formatted_address,
      name: place.formatted_address,
      placeId: place.place_id,
      id: place.place_id,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    };
    const updatedStops = stops.map((stop) =>
      stop.id === stopId ? { ...stop, ...newLocationData } : stop
    );

    setStops(updatedStops);
  };
  const searchTrip = async () => {
    let hasError = false;

    if (!time) {
      setError((prevError) => ({
        ...prevError,
        times: "Please Select Pickup Time",
      }));
      hasError = true;
    }

    if (!date) {
      setError((prevError) => ({
        ...prevError,
        date: "Please Select Pickup Date",
      }));
      hasError = true;
    }

    if (!data?.fromCity) {
      setError((prevError) => ({
        ...prevError,
        origin: "Please Select Pickup Location",
      }));
      hasError = true;
    }

    if (!data?.toCity) {
      setError((prevError) => ({
        ...prevError,
        destination: "Please Select Drop Location",
      }));
      hasError = true;
    }

    // Exit early if there is an error
    if (hasError) {
      return;
    }

    try {
      const newOneWay = {
        ...roundTrip,
        fromCity: data?.fromCity,
        toCity: data?.toCity,
        stopOvers: [data?.fromCity, ...stops, data?.toCity],
        pickupDate: moment(date).format("YYYY-MM-DD"),
        pickupTime: moment(time).format("HH:mm:ss"),
        stop: stops,
      };
      console.log(newOneWay);
      // Ensure pathname and query are set correctly
      dispatch(changeTripData(newOneWay));
      routes.push(`${appRoutes.app.cabs}?qry=${JSON.stringify(newOneWay)}`);
      const params = {
        location: newOneWay?.stopOvers, // Example locations
        trip: newOneWay?.tripType,
        cabsType: "all",
      };
      dispatch(fetchCabs(params));
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  return (
    <>
      <div class="row g-4 align-items-center">
        <div class="col-xl-12">
          <div class="row g-4">
            {/* <!-- Leaving From --> */}
            <div class="col-md-3 col-xl-3">
              <div class="form-size-lg">
                <label class="form-label">Pickup</label>
                <GmapPlaceSearch
                  label="Selct Pickup Location"
                  onSelectPlace={(place) => {
                    setError((prevError) => ({
                      ...prevError,
                      origin: false,
                    }));
                    const newLocationData = {
                      label: place.formatted_address,
                      id: place.place_id,
                      name: place.formatted_address,
                      placeId: place.place_id,
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };
                    setData({ ...data, fromCity: newLocationData });
                  }}
                  value={qry_params?.fromCity || null}
                />
              </div>
            </div>

            {/* <!-- Going To --> */}
            <div class="col-md-3 col-xl-3">
              <div class="form-size-lg">
                <label class="form-label">Drop</label>
                <GmapPlaceSearch
                  value={qry_params?.toCity || null}
                  label="Selct Pickup Location"
                  onSelectPlace={(place) => {
                    setError((prevError) => ({
                      ...prevError,
                      destination: false,
                    }));

                    const newLocationData = {
                      label: place.formatted_address,
                      name: place.formatted_address,
                      placeId: place.place_id,
                      id: place.place_id,
                      lat: place.geometry.location.lat,
                      lng: place.geometry.location.lng,
                    };

                    // Update the state immutably
                    // setDestinationLatLong(newLocation);
                    setData({ ...data, toCity: newLocationData });
                  }}
                />
              </div>
            </div>

            {/* <!-- Date --> */}
            <div class="col-md-2">
              <div class="form-icon-input form-fs-lg">
                <label class="form-label">Pickup Date</label>
                <DateInput
                  error={error.date}
                  onChange={(data) => {
                    // const date = new Date(data);
                    setError((prevError) => ({
                      ...prevError,
                      date: false,
                    }));
                    setDate(moment(data).format("YYYY-MM-DD"));
                  }}
                  value={date}
                />
                <span className="text-danger">{error.date && error.date}</span>
              </div>
            </div>

            {/* <!-- Time --> */}
            <div class="col-md-2">
              <div class="form-icon-input form-fs-lg">
                <label class="form-label">Pickup Time</label>
                <TimeInput
                  value={time}
                  error={error.times}
                  onChange={(data) => {
                    // const date = new Date(data);
                    setError((prevError) => ({
                      ...prevError,
                      times: false,
                    }));
                    setTime(moment(data).format("HH:mm:ss"));
                  }}
                />
                <span className="text-danger">
                  {error.times && error.times}
                </span>
              </div>
            </div>
            <div class="col-xl-2 d-grid mt-xl-auto">
              <button onClick={searchTrip} class="btn btn-lg btn-primary mb-0">
                Update
              </button>
            </div>
            <div className="col-12 row mt-2">
              {stops.map((stop, index) => (
                <>
                  <div
                    key={stop.id}
                    className="col-md-4 mt-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="col-10 me-3">
                      <div className="form-icon-input form-size-lg form-fs-lg">
                        <GmapPlaceSearch
                          label={`Select Stop Location ${index + 1}`}
                          error={error[`stop${stop.id}`]}
                          value={stop?.label ? stop : null}
                          onSelectPlace={(place) => {
                            setError((prevError) => ({
                              ...prevError,
                              [`stop${stop.id}`]: false,
                            }));
                            console.log(place);

                            handleSelectPlace(place, stop.id);
                          }}
                        />
                      </div>
                      <span className="text-danger">
                        {error[`stop${stop.id}`] && error[`stop${stop.id}`]}
                      </span>
                    </div>
                    <div className="col-1 text-end">
                      <div className="">
                        <button
                          onClick={() => handleRemoveStop(stop.id)}
                          className="btn btn-danger shadow btn-round mb-0"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    {/* Remove Stop Button */}
                  </div>
                </>
              ))}
            </div>
            <div className="col-md-2 text-start mt-3">
              <button
                onClick={handleAddStop}
                className="btn btn-sm btn-danger mb-3"
              >
                Add Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoundTrip;
