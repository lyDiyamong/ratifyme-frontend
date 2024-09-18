import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm, FormProvider } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Box, Grid, Typography, Button, Stepper, Step, StepLabel, Stack } from "@mui/material";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import SignupImgSvg from "../../assets/images/Signup-illu.svg";
import { useSignUpMutation } from "../../store/api/auth/authApi";
import DateSelectionForm from "../../components/DateSelectionForm";
import SelectForm from "../../components/SelectionForm";
import FormInput from "../../components/FormInput";

const steps = ["General Information", "Address Information", "Account Setup"];

// Data static of the role select
const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

const optionSelect = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
];

const SignupPage = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [signUp, { isLoading, isError, error }] = useSignUpMutation();
    const [activeStep, setActiveStep] = useState(0);
    
    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
    }, [search]);

    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            genderId: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            country: "",
            city: "",
            street: "",
            postalCode: "",
        },
    });

    const { handleSubmit, control, getValues } = methods;

    const onSubmit = async (data) => {
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
            if (roleId === 2) {
                navigate("/company-info");
            }
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    const options = countryList().getData();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        {/* General Information */}
                        <Typography variant="h4">General Information</Typography>
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
                            <Grid item xs={12} sm={6}>
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
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        {/* Address Information */}
                        <Typography variant="h4">Address Information</Typography>
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
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="city" label="City / State" control={control} type="text" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="street" label="Street Address" control={control} type="text" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="postalCode" label="Postal Code" control={control} type="text" />
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        {/* Account Setup */}
                        <Typography variant="h4">Account Setup</Typography>
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
                        <FormInput label="Password" name="password" control={control} type="password" required={true} />
                        <FormInput
                            label="Confirm Password"
                            name="passwordConfirm"
                            control={control}
                            type="password"
                            required={true}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <LandingContainer sx={{ my: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    {/* Signup Form with Stepper */}
                    <Typography variant="h4" mb={4}>
                        Sign up as {role}
                    </Typography>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <FormProvider {...methods}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 4 }}
                        >
                            {handleStepContent(activeStep)}
                            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={activeStep === steps.length - 1 ? handleSubmit(onSubmit) : handleNext}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button>
                            </Stack>
                        </Box>
                    </FormProvider>
                    {isError && <Typography color="error">{error?.data?.message || "Signup failed"}</Typography>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component="img" sx={{ width: "100%" }} alt="illustration" src={SignupImgSvg} />
                </Grid>
            </Grid>
        </LandingContainer>
    );
};

export default SignupPage;
