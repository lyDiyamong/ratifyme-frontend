import * as React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerValue = ({ field, label }) => {
  console.log("DatePicker Props:", field, label);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => field.onChange(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerValue;
