"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";
import { styled } from "@mui/material/styles";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

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

export default function AirportGmapPlace({
  label,
  onSelectAirport,
  defaultValue = null,
  validationError,
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(defaultValue);
  // Debounced API call

  const location = "20.5937,78.9629"; // Center of India
  const radius = 3000000; // Covering most of India

  const fetchAirports = useCallback(
    debounce((query) => {
      setLoading(true);
      axios
        .get(`https://api.vttcabs.com/api/search-airports?query=${query}`)
        .then((res) => {
          console.log();

          const airportOptions = res.data.results.map((airport) => ({
            id: airport.place_id,
            label: airport.name,
            latitude: airport.latitude,
            longitude: airport.longitude,
            address: airport.address,
          }));
          setOptions(airportOptions);
        })
        .catch(() => {
          setOptions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300),
    []
  );

  useEffect(() => {
    if (inputValue) {
      fetchAirports(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, fetchAirports]);

  return (
    <Autocomplete
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      value={selectedAirport}
      onChange={(event, newValue) => {
        setSelectedAirport(newValue);
        if (newValue) {
          onSelectAirport(newValue); // Call the parent function with the selected airport
        } else {
          onSelectAirport(null); // Clear the selection if the input is cleared
        }
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label={label}
          placeholder={label}
          variant="outlined"
          fullWidth
          error={validationError}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            startAdornment: <FlightTakeoffIcon />,
          }}
        />
      )}
    />
  );
}
