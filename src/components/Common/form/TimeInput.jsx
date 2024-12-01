"use client"
import React, { useState } from 'react';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import moment from 'moment';

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
export default function TimeInput({
  value,
  onChange,
  label,
  date,
  disabled = false,
}) {
  // Check if the selected date is today
  const isToday = moment(date).isSame(moment(), "day");

  return (
    <CustomTimePicker
      disablePast={isToday} // Disable past times only if the date is today
      label={label}
      value={value ? moment(value) : null}
      onChange={(newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField disabled={disabled} {...params} fullWidth />
      )}
    />
  );
}
