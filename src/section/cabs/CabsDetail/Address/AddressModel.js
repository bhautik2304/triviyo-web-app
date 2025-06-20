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
  Tab,
  Tabs,
} from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { GmapPlaceSearch } from "@/components";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DropAddress from "./DropAddress";
import PickupAddress from "./PickupAddress";
import TravellerInformation from "./TravellerInformation";
import { useSearchParams } from "next/navigation";
const libraries = ["places"];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: "80%", lg: "70%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: { xs: 5, md: 5, lg: 5 },
  p: 4,
};

const mapContainerStyle = {
  width: "100%",
  // height: "30px",
};

const center = {
  lat: 22.3071588,
  lng: 73.1812187,
};

export default function AddressModel({ open, handleOpen, handleClose }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);

    setValue(newValue);
  };

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAPS_API_KEY,
    libraries,
  });
  const [pickupLocation, setPickupLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

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
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {qry_params?.tripType == "Airport Transfers" ? (
            <>
              <AirportTransfer handleClose={handleClose} />
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Set Pickup Location" />

                {qry_params?.tripType != "Hourly Rentals" && (
                  <Tab label="Set Drop Location" />
                )}
                <Tab label="Traveler Information" />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <PickupAddress
                  handleClose={handleClose}
                  handelConfirm={(data) => {
                    handleChange(1, 1);
                  }}
                />
              </CustomTabPanel>
              {qry_params?.tripType != "Hourly Rentals" && (
                <CustomTabPanel value={value} index={1}>
                  <DropAddress
                    handleClose={handleClose}
                    handelConfirm={() => handleChange(1, 2)}
                  />
                </CustomTabPanel>
              )}
              <CustomTabPanel
                value={value}
                index={qry_params?.tripType != "Hourly Rentals" ? 2 : 1}
              >
                <TravellerInformation handleClose={handleClose} />
              </CustomTabPanel>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AirportTransfer = ({ handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);

    setValue(newValue);
  };

  const qry = useSearchParams();
  const qry_params = JSON.parse(qry.get("qry"));

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {qry_params?.tripOption == "Pickup To Airport" ? (
          <Tab label="Set Drop Location" />
        ) : (
          <Tab label="Set Pickup Location" />
        )}
        <Tab label="Traveler Information" />
      </Tabs>
      {qry_params?.tripOption == "Pickup To Airport" ? (
        <CustomTabPanel value={value} index={0}>
          <DropAddress
            handleClose={handleClose}
            handelConfirm={() => handleChange(1, 1)}
          />
        </CustomTabPanel>
      ) : (
        <CustomTabPanel value={value} index={0}>
          <PickupAddress
            handleClose={handleClose}
            handelConfirm={(data) => {
              handleChange(1, 1);
            }}
          />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={value} index={1}>
        <TravellerInformation handleClose={handleClose} />
      </CustomTabPanel>
    </>
  );
};
const HourlyRental = () => {};
const RoundTripTransfer = () => {};
