"use client"
import React,{useState} from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import moment from 'moment';

const CustomDatePicker = styled(MobileDatePicker)(({ theme }) => ({
    '& .MuiFormControl-root': {
        // borderRadius: '8px',
        // backgroundColor: '#f5f5f5',
        width: '100%', // Ensure the input takes full width
    },
    '& .MuiInputBase-root': {
        borderRadius: '15px',
        backgroundColor: '#f5f5f5',
        width: '100%', // Ensure the input takes full width
    },
}));
function DateInput({ value, onChange, label, disabled=false }) {
  return (
    <>
      <CustomDatePicker
        label={label}
        value={value ? moment(value) : null}
        fullWidth
        disablePast
        onChange={(newValue) =>{
            onChange(newValue)}}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled={disabled}
            InputProps={{
              ...params.InputProps,
              startAdornment: <AccessTimeFilledIcon />,
            }}
            fullWidth
          />
        )}
      />
    </>
  );
}

export default DateInput