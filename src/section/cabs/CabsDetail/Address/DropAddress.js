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
import { useSearchParams } from "next/navigation";
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
function DropAddress({ open, handelConfirm, handleClose }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD08DAjY2ESqW0ssWbnSrRGvBN7OlXcEJg",
    libraries,
  });
  const [pickupLocation, setPickupLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));
  useEffect(() => {
    setMarkerPosition(qry_params.toCity);
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

  const onMarkerDragEnd = useCallback((event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);
  return (
    <>
      <Grid container direction="row" spacing={4} alignItems="center">
        <Grid item xs={12} md={8} lg={8}>
          <GmapPlaceSearch
            label="Search Drop Location"
            onSelectPlace={() => {
              // set;
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

export default DropAddress;
