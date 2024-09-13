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
} from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { GmapPlaceSearch } from "@/components";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

async function getCityByLatLng(lat, lng) {
  const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD08DAjY2ESqW0ssWbnSrRGvBN7OlXcEJg`;

  try {
    const response = await axios.get(url);
    const addressComponents = response.data.results[0].address_components;

    // Find city information
    const city = addressComponents.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("administrative_area_level_2")
    );

    return city ? city.long_name : null;
  } catch (error) {
    console.error("Error fetching city:", error);
    return null;
  }
}

const libraries = ["places"];

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
function PickupAddress({ open, handelConfirm, handleClose }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD08DAjY2ESqW0ssWbnSrRGvBN7OlXcEJg",
    libraries,
  });
  const [pickupLocation, setPickupLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));
  useEffect(() => {
    setMarkerPosition(qry_params.fromCity);
  }, []);

  const onMapClick = useCallback((event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  const handlePlaceSelect = (event, newValue) => {
    if (newValue) {
      setPickupLocation(newValue);
      setMarkerPosition({
        lat: newValue.lat,
        lng: newValue.lng,
      });
    }
  };

  const onMarkerDragEnd = useCallback(async (event) => {
    const fromCity = await getCityByLatLng(
      qry_params.fromCity.lat,
      qry_params.fromCity.lng
    );
    const pickupCity = await getCityByLatLng(
      event.latLng.lat(),
      event.latLng.lng()
    );

    if (!fromCity || !pickupCity) {
      console.log("Couldn't retrieve city information");
      return false;
    }

    // Compare city names
    console.log({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    if (fromCity === pickupCity) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      return console.log("PickupArress Are selected");
    } else {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      return console.log("Please Choose Address in the From City");
    }
  }, []);
  return (
    <>
      <Grid container direction="row" spacing={4} alignItems="center">
        <Grid item xs={12} md={8} lg={8}>
          <GmapPlaceSearch
            label="Search Pickup Location"
            onSelectPlace={(place) => {
              setMarkerPosition(place.geometry.location);
            }}
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
            zoom={14}
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
          onClick={handelConfirm}
        >
          Confirm Location
        </Button>
      </Stack>
    </>
  );
}

export default PickupAddress;
