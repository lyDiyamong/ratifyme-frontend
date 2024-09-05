// React library import
import { useState } from "react";
import { useController } from "react-hook-form";

// MUI import
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Custom import
import theme from "../assets/themes/index";

/**
 * FormInput component
 *
 * A reusable input component for forms that integrates with React Hook Form and Material UI.
 * It supports various input types including password fields with visibility toggle.
 *
 * @param {string} label - The label text for the input field.
 * @param {string} name - The name of the input field, used by React Hook Form.
 * @param {object} control - The control object provided by React Hook Form.
 * @param {string} [type="text"] - The type of the input field (e.g., "text", "password").
 * @param {boolean} [required=false] - Whether the input field is required.
 * @param {JSX.Element} [icon] - An optional icon element to display inside the input field.
 * @param {...object} rest - Additional props to pass to the TextField component.
 * @returns {JSX.Element} The rendered FormInput component.
 */
const FormInput = ({ label, name, control, type = "text", required = false, icon, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Prevent default action on mouse down for the password visibility icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Use useController to connect the input field with React Hook Form
    const {
        field, // Contains value, onChange, onBlur, and name for the input
        fieldState: { error } // Contains error state and message for validation
    } = useController({
        name,
        control,
        defaultValue: "",
        rules: {
            required: required ? `${label} is required` : false, // Add validation rule based on the required prop
        },
    });

    return (
        <TextField
            label={label}
            fullWidth
            required={required} // Conditionally set the required prop
            {...field} // Spread the field props onto the TextField component
            type={type === "password" && !showPassword ? "password" : "text"} // Handle password visibility toggle
            error={!!error} // Set error state if validation fails
            helperText={error ? error.message : null} // Display error message if present
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: theme.customShape.input, // Apply custom border-radius
                },
                "& .MuiInputBase-input": {
                    fontSize: theme.typography.body2, // Apply custom font size
                },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment sx={{ position: "absolute", right: 15 }}>
                        {type === "password" ? (
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        ) : (
                            icon // Display optional icon if provided
                        )}
                    </InputAdornment>
                ),
            }}
            {...rest} // Pass down any additional props to the TextField component
        />
    );
};

export default FormInput;
