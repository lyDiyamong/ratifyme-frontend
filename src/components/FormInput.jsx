import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useController } from "react-hook-form";
import theme from "../assets/themes/index";

/**
 * FormInput Component
 *
 * A reusable input component for forms that integrates with React Hook Form and Material UI.
 * It supports various input types including password fields with visibility toggle and email validation.
 *
 * @param {string} label - The label text for the input field.
 * @param {string} name - The name of the input field, used by React Hook Form.
 * @param {object} control - The control object provided by React Hook Form.
 * @param {string} [type="text"] - The type of the input field (e.g., "text", "email", "password").
 * @param {boolean} [required=false] - Whether the input field is required.
 * @param {JSX.Element} [icon] - An optional icon element to display inside the input field.
 * @param {string} [customError] - Custom error message to display.
 * @param {object} [validationRules] - Additional validation rules for the input.
 * @param {...object} rest - Additional props to pass to the TextField component.
 * @returns {JSX.Element} The rendered FormInput component.
 */
const FormInput = ({ label, name, control, type = "text", required = false, startIcon, validationRules = {}, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Prevent default action on mouse down for the password visibility icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationEmailRules = {
        required: required ? `${label} is required` : false,
        ...(type === "email" && {
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
            },
        }),
    };

    const combinedValidationRules = {
        ...validationEmailRules,
        ...validationRules,
    };

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue: "",
        rules: combinedValidationRules,
    });

    return (
        <TextField
            label={label}
            fullWidth
            required={required}
            {...field}
            // Update the type logic here to toggle between "text" and "password"
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: theme.customShape.input,
                },
                "& .MuiInputBase-input": {
                    fontSize: theme.typography.body2,
                },
            }}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                ),
                endAdornment: type === "password" && (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
};

export default FormInput;
