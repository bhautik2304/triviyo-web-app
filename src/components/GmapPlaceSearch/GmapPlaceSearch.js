"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

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

function GmapPlaceSearch({
  onSelectPlace,
  label,
  value = null, // Set default value to null
  validationError,
  stop,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(value);

  const fetchCities = useCallback(
    debounce((query) => {
      setLoading(true);
      axios
        .get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
          params: {
            input: query,
            components: "country:IN",
            key: "AIzaSyD08DAjY2ESqW0ssWbnSrRGvBN7OlXcEJg",
          },
        })
        .then((response) => {
          const filterData =
            response?.data?.predictions?.map((data, key) => ({
              id: key,
              label: data?.description,
              data: data,
            })) || [];
          setOptions(filterData);
        })
        .catch((err) => {
          setError("An error occurred. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300),
    []
  );

  const fetchPlaceDetails = (placeId) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/get-place-details?place_id=${placeId}`
      )
      .then((response) => {
        onSelectPlace(response.data.result);
      })
      .catch((err) => {
        console.log(err);

        setError("Failed to fetch place details. Please try again.");
      });
  };

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    fetchCities(inputValue);
  }, [inputValue, fetchCities]);

  return (
    <div>
      <Autocomplete
        id="city-search"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={selectedCity} // Set the value to selectedCity
        options={options}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setError(null);
        }}
        onChange={(event, newValue) => {
          setSelectedCity(newValue);
          if (newValue && newValue.data.place_id) {
            fetchPlaceDetails(newValue.data.place_id);
          }
        }}
        renderOption={(props, option) => (
          <Stack {...props} direction="row" sx={{ width: "100%" }}>
            <div className="mx-2">
              <FmdGoodIcon color="error" />
            </div>
            <span>{option.label}</span>
          </Stack>
        )}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            error={validationError}
            placeholder={label}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <FmdGoodIcon color="#bb4333" sx={{ color: "#bb4333" }} />
                </>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default GmapPlaceSearch;
