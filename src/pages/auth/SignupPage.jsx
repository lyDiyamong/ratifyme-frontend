// React library import
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

// MUI import
import { Box, Grid, Typography, Button, FormControl, Stack } from "@mui/material";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import SignupImgSvg from "../../assets/images/Signup-illu.svg";
import { useSignUpMutation } from "../../store/api/auth/authApi";
import DateSelectionForm from "../../components/DateSelectionForm";
import SelectForm from "../../components/SelectionForm";

// Data static of the role select
const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

// Data static of the gender select
const optionSelect = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
];

const SignupPage = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [signUp, { isLoading, isError, error }] = useSignUpMutation();

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
    }, [search]);

    // Initialize React Hook Form with default values
    const { handleSubmit, control } = useForm({
        defaultValues: {
            dateOfBirth: null,
            country: "",
            genderId: "",
        },
    });

    const onSubmit = async (data) => {
        // Only accessing roleId, no state updates here
        const roleId = roleIdData[role] || 0;
        const reqData = {
            userData: {
                ...data,
                roleId,
            },
            addressData: {
                street: data.street,
                city: data.city,
                postalCode: data.postalCode,
                country: data.country,
            },
        };
        try {
            const result = await signUp(reqData).unwrap();
            navigate("/dashboard");
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    const options = countryList().getData();

    return (
        <LandingContainer sx={{ my: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    {/* Start signup title  */}
                    <Box mb={5}>
                        <Typography
                            component="h4"
                            sx={{ fontSize: theme.typography.h2, fontWeight: theme.fontWeight.bold, lineHeight: 2 }}
                        >
                            Sign up as {role}
                        </Typography>
                        <Typography>
                            Let’s get started. Are you ready to be a part of our digital badge? Then boldly move forward
                            with us.
                        </Typography>
                    </Box>
                    {/* End signup title  */}

                    {/* Start signup form  */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        noValidate
                    >
                        {/* Start General Info  */}
                        {/* Firstname & Lastname  */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    name="firstName"
                                    label="First Name"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    name="lastName"
                                    label="Last Name"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                            </Grid>
                        </Grid>

                        {/* Gender & DoB  */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/* Gender  */}
                                <SelectForm
                                    control={control}
                                    name="genderId"
                                    label="Gender"
                                    options={optionSelect}
                                    required={false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateSelectionForm control={control} name="dateOfBirth" label="Date of Birth" />
                            </Grid>
                        </Grid>

                        {/* Username & email  */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    name="username"
                                    label="Username"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    label="Phone Number"
                                    name="phoneNumber"
                                    control={control}
                                    required={true}
                                    type="text"
                                />
                            </Grid>
                        </Grid>

                        <FormInput name="email" label="Email" control={control} type="email" required={true} />
                        {/* End General Info  */}

                        {/* Start Address Info  */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Select
                                            options={options}
                                            onChange={(selectedOption) => onChange(selectedOption.value)}
                                            onBlur={onBlur}
                                            value={options.find((option) => option.value === value)}
                                            inputRef={ref}
                                            placeholder="Select Country"
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.value}
                                            styles={{
                                                container: (base) => ({
                                                    ...base,
                                                    width: "100%",
                                                }),
                                                control: (base) => ({
                                                    ...base,
                                                    height: "56px",
                                                    borderRadius: theme.customShape.input,
                                                    background: "none",
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    zIndex: 2,
                                                }),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                {/* Start City/State */}
                                <FormInput name="city" label="City / State" control={control} type="text" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="street" label="Street Address" control={control} type="text" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="postalCode" label="Postal Code" control={control} type="text" />
                            </Grid>
                        </Grid>
                        {/* End Address Info  */}

                        {/* Start Password & Confirm Password  */}
                        <FormInput label="Password" name="password" control={control} type="password" required={true} />
                        <FormInput
                            label="Confirm Password"
                            name="passwordConfirm"
                            control={control}
                            type="password"
                            required={true}
                        />
                        {/* End Password & Confirm Password  */}

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                                fontWeight: theme.fontWeight.bold,
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                        {isError && <Typography color="error">{error?.data?.message || "Signup failed"}</Typography>}
                        <Typography textAlign="center" color={theme.palette.text.secondary}>
                            By signing up to create an account I accept{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: theme.fontWeight.semiBold, color: theme.palette.text.primary }}
                            >
                                Term of Use{" "}
                            </Typography>
                            and{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: theme.fontWeight.semiBold, color: theme.palette.text.primary }}
                            >
                                Privacy Policy.
                            </Typography>
                        </Typography>
                        <Typography textAlign="center" color={theme.palette.text.secondary}>
                            Already have an account?{" "}
                            {/* <Link to="/login">
                                <Typography
                                    component="span"
                                    sx={{ color: theme.palette.text.primary, fontWeight: theme.fontWeight.semiBold }}
                                >
                                    Log in
                                </Typography>{" "}
                            </Link> */}
                        </Typography>
                        <Typography color={theme.palette.text.secondary} fontSize={theme.typography.body2}>
                            Let’s get started. Are you ready to be a part of our digital badge? Then boldly move forward
                            with us.
                        </Typography>
                    </Box>
                    {/* End signup form  */}
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Box component="img" sx={{ width: "100%" }} alt="illustration" src={SignupImgSvg} />
                </Grid>
            </Grid>
        </LandingContainer>
    );
};

export default SignupPage;
