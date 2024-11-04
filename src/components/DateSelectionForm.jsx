// React library imports
import { Controller } from "react-hook-form";

// MUI import
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/**
 * DateSelectionForm Component
 *
 * @param {Object} control - The control object from react-hook-form, used to register the field and manage form state.
 * @param {string} name - The name of the field, used as a key to register the field in react-hook-form.
 * @param {string} label - The label text for the date picker field.
 * @param {boolean} required - add * to label
 *
 * @returns {JSX.Element} The rendered DateSelectionForm component.
 *
 * ===== Usage =====
 * const MyForm = () => {
    // Initialize the form control using useForm from react-hook-form
    const { handleSubmit, control } = useForm();

    // Form submission handler
    const onSubmit = (data) => {
        console.log("Form Data: ", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DateSelectionForm
                control={control}
                name="startDate"
                label="Start Date"
                required={true} // Mark the field as required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
            </Button>
        </form>
    );
};
 */
const DateSelectionForm = ({ control, name, label, required=false }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        label={required ?  `${label}*` : label}
                        value={field.value || null}
                        onChange={(newValue) => field.onChange(newValue)}
                        sx={{ width: "100%" }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default DateSelectionForm;
