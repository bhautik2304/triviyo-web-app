"use client"
import React from 'react'
import Autocomplete from "react-google-autocomplete";

function Index({ onSelectPlace, ...params }) {

    return (
        <Autocomplete
            class="form-select form-select-lg"
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
            onPlaceSelected={(place) => {
                onSelectPlace(place);
            }}
            {...params}
        />
    );
}

export default Index