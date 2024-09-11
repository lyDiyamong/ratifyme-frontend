// React imports
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// DateSelectionForm component
const DateSelectionForm = ({ control, name, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <DatePicker
                    {...field}
                    label={label}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            error={!!fieldState.error} 
                            helperText={fieldState.error ? fieldState.error.message : null}
                            fullWidth
                        />
                    )}
                />
            )}
        />
    );
};

export default DateSelectionForm;
