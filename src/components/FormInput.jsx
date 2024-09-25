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
const FormInput = ({ label, name, control, type = "text", required = false, validationRules = {}, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // Prevent default action on mouse down for the password visibility icon
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Define a regex to disallow spaces and special characters
    const noSpacesOrSpecialChars = {
        validate: (value) => {
            const regex = /^[a-zA-Z]+$/;
            if (!regex.test(value)) {
                return `${label} cannot contain spaces or special characters`;
            }
            return true;
        },
    };

    // Define validation rules based on the input type and required prop
    const validationEmailRules = {
        required: required ? `${label} is required` : false,
        ...(type === "email" && {
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
            },
        }),
        ...(name === "firstName" || name === "lastName" ? noSpacesOrSpecialChars : {}), // Apply to first and last name
    };

    // Combine custom validation rules with email validation rules
    const combinedValidationRules = {
        ...validationEmailRules,
        ...validationRules,
    };

    // Use useController to connect the input field with React Hook Form
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
            type={type === "password" && !showPassword ? "password" : "text"}
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
