// React imports
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "../assets/themes";

/**
 * DateSelectionForm Component
 *
 * @param {Object} control - The control object from react-hook-form, used to register the field and manage form state.
 * @param {string} name - The name of the field, used as a key to register the field in react-hook-form.
 * @param {string} label - The label text for the date picker field.
 *
 * @returns {JSX.Element} The rendered DateSelectionForm component.
 */
const DateSelectionForm = ({ control, name, label, required=false }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={label}
                        value={field.value || null} 
                        onChange={(newValue) => field.onChange(newValue)} 
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!fieldState.error}
                                helperText={fieldState.error ? fieldState.error.message : null}
                                fullWidth
                                required={required}
                            />
                        )}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default DateSelectionForm;
