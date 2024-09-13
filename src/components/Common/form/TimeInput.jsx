"use client"
import React from 'react';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomTimePicker = styled(MobileTimePicker)(({ theme }) => ({
    '& .MuiFormControl-root': {
        width: '100%',
    },
    '& .MuiInputBase-root': {
        borderRadius: '15px',
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
}));

export default function TimeInput({ value, onChange, label }) {

    return (
        <CustomTimePicker
            // disablePast
            label={label}
            value={value}
            onChange={(newValue) => onChange(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
        />
    );
}
