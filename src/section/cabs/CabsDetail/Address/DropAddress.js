import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Autocomplete,
  Stack,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { GmapPlaceSearch } from "@/components";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { appAxios } from "@/lib/axios";

import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  changeBookingDetaild,
  completeDropLocation,
} from "@/redux/slice/bookingSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

async function getCityByLatLng(lat, lng, setBackDrop) {
  setBackDrop(true);
  const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/geo-place-details?lat=${lat}&lng=${lng}`;

 try {
    const response = await appAxios.get(url);
    console.log(response.data);
    const addressComponents = response.data.data.address_components;
    // Find city information
    const city = addressComponents.find(
      (component) =>
        component.types.includes("locality") ||
      component.types.includes("administrative_area_level_2")
    );
    console.log(city);
    return city
      ? {
          long_name: city.long_name,
          addressComponents: response.data.data.address_components,
          place_id: response.data.data.place_id,
          formatted_address: response.data.address,
        }
      : null;
  } catch (error) {
    setBackDrop(false);
    console.error("Error fetching city:", error); 
    return null;
  }
}

const libraries = ["places"];

const pickupAddres = {
  pickupCityName: "",
  pickupGeoCodinates: {},
  pickupAddress: {
    houseNo: "",
    streetName: "",
    address: "",
  },
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "80%", lg: "70%" },
  height: { xs: "95%", md: 700, lg: 700 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: { xs: 5, md: 5, lg: 5 },
  p: 4,
};

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 22.3071588,
  lng: 73.1812187,
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
  },
  "& .MuiInputBase-root": {
    borderRadius: "15px",
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
}));

function DropAddress({ open, handelConfirm, handleClose }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD08DAjY2ESqW0ssWbnSrRGvBN7OlXcEJg",
    libraries,
  });
  const [backDrop, setBackDrop] = useState(false);
  const [data, setData] = useState(pickupAddres);
  const [selectPickupAddress, setSelectPickupAddress] = useState(
    pickupAddres.pickupAddress
  );
  const [pickupLocation, setPickupLocation] = useState(null);
  const [map, setMap] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));
  const [markerPosition, setMarkerPosition] = useState(qry_params.toCity);

  const { dropAddress } = useSelector((state) => state.booking);

  useEffect(() => {
    // setMarkerPosition(qry_params.fromCity);
    setSelectPickupAddress(dropAddress);
    if (qry_params?.tripOption == "Pickup To Airport") {
      setMarkerPosition({
        lat: qry_params?.toDestination?.lat,
        lng: qry_params?.toDestination?.lng,
      });
    }
  }, []);

  const onMapClick = useCallback((event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  const handlePlaceSelect = (event, newValue) => {
    if (newValue) {
      console.log(newValue);

      setMarkerPosition({
        lat: newValue.lat,
        lng: newValue.lng,
      });
    }
  };

  const onMarkerDragEnd = useCallback(async (event) => {
    setError({
      ...error,
      pickup_city_error: "",
    });
    const fromCity = await getCityByLatLng(
      qry_params.toCity.lat,
      qry_params.toCity.lng,
      setBackDrop
    );
    const pickupCity = await getCityByLatLng(
      event.latLng.lat(),
      event.latLng.lng(),
      setBackDrop
    );
    // console.log(pickupCity?.long_name);

    if (!fromCity || !pickupCity) {
      // console.log("Couldn't retrieve city information");
      return false;
    }

    // Compare city names
    // console.log({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    if (fromCity?.long_name === pickupCity?.long_name) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      console.log(pickupCity);
      setPickupLocation({
        id: pickupCity?.place_id,
        place_id: pickupCity?.place_id,
        pickupCity: pickupCity?.long_name,
        label: pickupCity?.formatted_address,
        geo: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        data: pickupCity?.addressComponents,
      });
      setSuccess(pickupCity.formatted_address);
      setBackDrop(false);
      return; // console.log("PickupArress Are selected");
    } else {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setError({
        ...error,
        pickup_city_error: `Please Choose Address in City ${qry_params.toCity.name}`,
      });
      setBackDrop(false);
      return; // console.log("Please Choose Address in the From City");
    }
  }, []);

  const selectPickupLocation = () => {
    console.log(pickupLocation);

    if (pickupLocation?.geo == null) {
      setError({ ...error, pickup_city_error: "Pls Select Pickup Location" });
      return 0;
    }

    setMap(false);
    setData({
      ...data,
      pickupCityName: pickupLocation?.long_name,
      pickupGeoCodinates: pickupLocation.geo,
    });
  };
  const confirmAddress = async () => {
    const errors = {};

    if (selectPickupAddress.houseNo == "") {
      errors.houseNo = "House No is required";
    }
    if (selectPickupAddress.streetName == "") {
      errors.streetName = "Street / Socity / Complex Name is required";
    }
    if (selectPickupAddress.address == "") {
      errors.address = "Address is required";
    }

    if (Object.keys(errors).length) {
      console.log(errors);
      setError(errors);
    }

    const dropCityName = await getCityByLatLng(
      markerPosition.lat,
      markerPosition.lng,
      setBackDrop
    );

    const dropLocationData = {
      ...selectPickupAddress,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      cityName: dropCityName?.long_name,
      airportName: "",
      isAirport: false,
    };
    setData({
      ...data,
      pickupAddress: dropLocationData,
    });
    dispatch(
      changeBookingDetaild({ key: "dropAddress", val: dropLocationData })
    );
    dispatch(
      changeBookingDetaild({
        key: "dropAddressLatLng",
        val: data.pickupGeoCodinates,
      })
    );
    dispatch(completeDropLocation());

    handelConfirm();
  };

  console.log(qry_params);

  return (
    <>
      {map ? (
        <>
          <Backdrop
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              borderRadius: { xs: 5, md: 5, lg: 5 },
            })}
            open={backDrop}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item xs={12} md={8} lg={8}>
              <GmapPlaceSearch
                label="Search Pickup Location"
                onSelectPlace={(place) => {
                  setMarkerPosition(place.geometry.location);
                }}
                value={pickupLocation}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Button
                size="large"
                color="error"
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    lg: "flex",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                }}
                startIcon={<GpsFixedIcon color="error" />}
              >
                Detect Current location
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={markerPosition}
                zoom={18}
                onClick={onMapClick}
              >
                <Marker
                  position={markerPosition}
                  draggable={true}
                  onDragEnd={onMarkerDragEnd}
                />
              </GoogleMap>
            )}
          </Box>
          <Typography sx={{ mt: 1 }} color="red">
            {error?.pickup_city_error}
          </Typography>
          <Typography sx={{ mt: 1 }} color="green">
            {success}
          </Typography>

          <Button
            size="large"
            color="error"
            sx={{
              display: {
                xs: "flex",
                md: "none",
                lg: "none",
              },
              mt: 2,
            }}
            startIcon={<GpsFixedIcon color="error" />}
            fullWidth
          >
            Detect Current location
          </Button>
          <Stack alignItems="end">
            <Button
              sx={{ mt: 2, width: { md: 200, lg: 200, xs: "100%" } }}
              onClick={selectPickupLocation}
            >
              Confirm Location
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <CustomTextField
                value={selectPickupAddress.houseNo}
                onChange={(e) => {
                  setError({
                    ...error,
                    houseNo: "",
                  });
                  setSelectPickupAddress({
                    ...selectPickupAddress,
                    houseNo: e.target.value,
                  });
                }}
                label="House or Office Number"
              />
              <Typography sx={{ mt: 1 }} color="red">
                {error?.houseNo}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CustomTextField
                value={selectPickupAddress.streetName}
                onChange={(e) => {
                  setError({
                    ...error,
                    streetName: "",
                  });
                  setSelectPickupAddress({
                    ...selectPickupAddress,
                    streetName: e.target.value,
                  });
                }}
                label={"Street / Socity / Complex Name"}
              />
              <Typography sx={{ mt: 1 }} color="red">
                {error?.streetName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <CustomTextField
                value={selectPickupAddress.address}
                onChange={(e) => {
                  setError({
                    ...error,
                    address: "",
                  });
                  setSelectPickupAddress({
                    ...selectPickupAddress,
                    address: e.target.value,
                  });
                }}
                multiline
                rows={4}
                label={"Address line"}
              />
              <Typography sx={{ mt: 1 }} color="red">
                {error?.address}
              </Typography>
            </Grid>
          </Grid>
          <Stack justifyContent="end" direction="row">
            <Button
              sx={{ mt: 2, width: { md: 300, lg: 300, xs: "100%" } }}
              onClick={() => setMap(true)}
            >
              Change Pickup Location
            </Button>
            <Button
              sx={{ mt: 2, width: { md: 200, lg: 200, xs: "100%" } }}
              onClick={confirmAddress}
            >
              Confirm Address
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}

export default DropAddress;
