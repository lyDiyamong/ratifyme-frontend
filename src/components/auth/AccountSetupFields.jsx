import { Grid, TextField, Typography, Box, IconButton } from "@mui/material";
import FormInput from "../FormInput";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneNumberForm from "../PhoneNumberForm";

const AccountSetupFields = ({ control, role, guest, schema }) => {
    const [passwordStrength, setPasswordStrength] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const checkPasswordStrength = (password) => {
        let strength = 0;

        if (password.length >= 8) strength += 1; // Minimum length requirement
        if (/[A-Z]/.test(password)) strength += 1; // Uppercase letters
        if (/[a-z]/.test(password)) strength += 1; // Lowercase letters
        if (/[0-9]/.test(password)) strength += 1; // Numbers
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special characters

        // Updated strength conditions
        if (strength === 1) return "Low"; // Only length check passed
        if (strength === 2) return "Medium"; // Minimum length and one other criterion met
        if (strength >= 3) return "Strong"; // More than two criteria met

        return "Low"; // Default to low if none of the checks pass
    };

    // Handle password change
    const handlePasswordChange = (event, onChange) => {
        const password = event.target.value;
        const strength = checkPasswordStrength(password);
        setPasswordStrength(strength);
        onChange(password); // Update the form value
    };
    // Toggle password visibility
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <Grid container spacing={2}>
            {/* <Typography>Account Setup</Typography> */}
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="username"
                    label="Username"
                    control={control}
                    required
                    schema={schema?.fields.username}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                {/* <FormInput
                    name="phoneNumber"
                    label="Phone Number"
                    control={control}
                    required
                    schema={schema?.fields.postalCode}
                /> */}
                <PhoneNumberForm
                    name="phoneNumber"
                    label="Phone Number"
                    control={control}
                    required
                    schema={schema?.fields.postalCode}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="email"
                    label="Email"
                    control={control}
                    required
                    disabled={role !== "institution"}
                    defaultValue={guest?.inviteEmail || ""}
                    schema={schema?.fields.email}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                {/* <FormInput
                    name="password"
                    label="Password"
                    control={control}
                    required
                    type="password"
                    schema={schema?.fields.password}
                /> */}
                
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Password"
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => handlePasswordChange(e, field.onChange)} // Pass the field's onChange
                            helperText={`Password Strength: ${passwordStrength}`} // Display strength as helper text
                            error={passwordStrength === "Low"} // Show error state if password strength is low // Pass the field's onChange
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="passwordConfirm"
                    label="Confirm Password"
                    control={control}
                    required
                    type="password"
                    // schema={schema?.fields.passwordConfirm}
                />
            </Grid>
        </Grid>
    );
};

export default AccountSetupFields;
