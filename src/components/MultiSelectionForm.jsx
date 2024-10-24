// React library import
import { useController } from "react-hook-form";

// MUI import
import { InputLabel, MenuItem, FormControl, Select, FormHelperText } from "@mui/material";

// Custom import
import theme from "../assets/themes";

/**
 * A reusable SelectForm component for use with react-hook-form.
 *
 * @param {string} name - The name of the form field. It should match the key in the form data.
 * @param {Object} control - The react-hook-form control object used to manage form state.
 * @param {Array} options - An array of option objects for the select input. Each object should have `value` and `label` properties.
 * @param {string} label - The label for the select input field.
 * @param {boolean} required - A boolean indicating if the field is required.
 *
 * @returns {JSX.Element} A multi selection form.
 *
 * @example
 * ===== Usage =====
* import { useForm, Controller } from "react-hook-form";
* import SelectForm from "./SelectForm";
*
* const MyForm = () => {
*    const { control, handleSubmit } = useForm();
*
*    const onSubmit = (data) => {
*        console.log(data);
*    };
*
*    const selectOptions = [
*        { value: "option1", label: "Option 1" },
*        { value: "option2", label: "Option 2" },
*        { value: "option3", label: "Option 3" },
*    ];
*
*   return (
*      <form onSubmit={handleSubmit(onSubmit)}>
*            <SelectForm
*               name="mySelectField"
*              control={control}
*               options={selectOptions}
*label="Select Options"
*              required={true}
*         />
*        <button type="submit">Submit</button>
*   </form>
);
};

 */

// =========== Start SelectForm ===========
const SelectForm = ({ name, control, options, label, required }) => {
    const validationRules = { required: required ? `${label} is required` : false };
    const {
        field,
        fieldState: { error },
    } = useController({ name, control, rules: validationRules });

    // This handles the change event and updates the value in react-hook-form
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // Update react-hook-form with the new value
        // The value will be an array of selected values
        field.onChange(value);
    };

    return (
        <FormControl fullWidth error={!!error}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                multiple
                required={required}
                sx={{
                    borderRadius: theme.customShape.input,
                }}
                labelId={`${name}-label`}
                id={`${name}-select`}
                value={field.value || []} 
                label={label}
                onChange={handleChange}
                onBlur={field.onBlur}
                inputProps={{ "aria-required": required }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            borderRadius: theme.customShape.input,
                            maxHeight: 48 * 7 + 8, 
                            overflowY: "auto", 
                        },
                    },
                }}
            >
                {/* Render options for the select input */}
                {options.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            {/* Display validation error message if any */}
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
};

export default SelectForm;
// =========== End SelectForm ===========