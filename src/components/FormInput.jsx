import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useController } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * FormInput Component
 *
 * A reusable input component that supports custom and Yup validation.
 *
 * @param {string} label - The label text for the input field.
 * @param {string} name - The name of the input field, used by React Hook Form.
 * @param {object} control - The control object provided by React Hook Form.
 * @param {string} [type="text"] - The type of the input field (e.g., "text", "email", "password").
 * @param {boolean} [required=false] - Whether the input field is required.
 * @param {object} schema - Yup validation schema for this input.
 * @param {object} [validationRules] - Additional validation rules for the input.
 * @param {...object} rest - Additional props to pass to the TextField component.
 * @param {...condition} name - If "name" have word description in it, it will catch to make the textFild height larger
 */
const FormInput = ({ label, name, control, type = "text", required = false, schema, validationRules = {}, startIcon, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (event) => event.preventDefault();

    const validateWithYup = async (value) => {
        try {
            // Validate the input using Yup schema
            if (schema) {
                await schema.validateSync(value);
            }
            return true;
        } catch (error) {
            return error.message;
        }
    };

    // Combine Yup validation with custom validation rules
    const combinedValidationRules = {
        required: required ? `${label} is required` : false,
        validate: async (value) => {
            let customError = true;

            // If there are additional custom validation rules
            if (validationRules?.validate) {
                customError = validationRules.validate(value);
            }

            // First, check if Yup validation passes
            const yupValidationError = await validateWithYup(value);
            if (yupValidationError !== true) return yupValidationError;

            // Then, check custom validation
            return typeof customError === 'string' ? customError : true;
        },
    };

    // UseController hook for form control
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

            // Check if this is the description field, and if so, set multiline and rows
            multiline={name.toLowerCase().includes("description")}
            rows={name.toLowerCase().includes("description") ? 4 : 1}

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
