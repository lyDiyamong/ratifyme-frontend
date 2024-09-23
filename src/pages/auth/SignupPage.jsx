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

const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

const genderOptions = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
];

// Address fields extracted for reuse
const AddressFields = ({ control }) => (
    <>
        <Grid item xs={12} sm={6}>
            <Controller
                name="country"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                        options={countryList().getData()}
                        onChange={(selectedOption) => onChange(selectedOption.value)}
                        onBlur={onBlur}
                        value={countryList()
                            .getData()
                            .find((option) => option.value === value)}
                        inputRef={ref}
                        placeholder="Select Country"
                        styles={{
                            container: (base) => ({ ...base, width: "100%" }),
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
    </>
);

const SignupPage = () => {
    const { search } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [signUp, { isLoading, isError, error }] = useSignUpMutation();
    const [activeStep, setActiveStep] = useState(0);
    const { inviter } = location.state || {};
    console.log("inviter from signup", inviter);

    const steps = {
        institution: ["General Information", "Address Information", "Account Setup", "Institution Information"],
        default: ["General Information", "Address Information", "Account Setup"],
    };

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
            companyName: "",
            companyRegistration: "",
        },
    });

    const { handleSubmit, control } = methods;

    const onSubmit = async (data) => {
        const roleId = roleIdData[role] || 0;
        const reqData = {
            userData: { ...data, roleId },
            addressData: { street: data.street, city: data.city, postalCode: data.postalCode, country: data.country },
            issuerData: {},
        };

        // Add institutionId to issuerData if inviter exists
        if (inviter) {
            reqData.issuerData = {
                institutionId: inviter.id,
            };
        }

        if (roleId === roleIdData.institution) {
            reqData.institutionData = {
                institutionName: data.institutionName,
                institutionEmail: data.institutionEmail,
                institutionPhoneNumber: data.institutionPhoneNumber,
                institutionWebsiteUrl: data.institutionWebsiteUrl,
            };
        }

        try {
            await signUp(reqData).unwrap();
            role === "institution" ? navigate("/price") : navigate("/dashboard");
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h4">General Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="firstName" label="First Name" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="lastName" label="Last Name" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectForm name="genderId" label="Gender" options={genderOptions} control={control} />
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
                        <Typography variant="h4">Address Information</Typography>
                        <Grid container spacing={2}>
                            <AddressFields control={control} />
                        </Grid>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography variant="h4">Account Setup</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="username" label="Username" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="phoneNumber" label="Phone Number" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="email" label="Email" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    name="password"
                                    label="Password"
                                    control={control}
                                    required
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    control={control}
                                    required
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 3:
                return role === "institution" ? (
                    <Box>
                        <Typography variant="h4">Institution Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="institutionName" label="Name" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="institutionEmail" label="Email Address" control={control} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput
                                    name="institutionPhoneNumber"
                                    label="Phone Number"
                                    control={control}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormInput name="institutionWebsiteUrl" label="Website" control={control} required />
                            </Grid>
                        </Grid>
                    </Box>
                ) : null;
            default:
                return null;
        }
    };

    return (
        <LandingContainer sx={{ my: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={role === "institution" ? 12 : 6}>
                    <Typography variant="h4" mb={4}>
                        Sign up as {role}
                    </Typography>
                    <Stepper activeStep={activeStep}>
                        {steps[role]
                            ? steps[role].map((label, index) => (
                                  <Step key={index}>
                                      <StepLabel>{label}</StepLabel>
                                  </Step>
                              ))
                            : steps.default.map((label, index) => (
                                  <Step key={index}>
                                      <StepLabel>{label}</StepLabel>
                                  </Step>
                              ))}
                    </Stepper>
                    <FormProvider {...methods}>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
                            {renderStepContent(activeStep)}
                            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
                                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={
                                        activeStep === (steps[role]?.length - 1 || 2)
                                            ? handleSubmit(onSubmit)
                                            : handleNext
                                    }
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Processing..."
                                        : activeStep === (steps[role]?.length - 1 || 2)
                                        ? "Finish"
                                        : "Next"}
                                </Button>
                            </Stack>
                        </Box>
                    </FormProvider>
                    {isError && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            Error: {error.message}
                        </Typography>
                    )}
                </Grid>
                {role !== "institution" && (
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={SignupImgSvg} alt="Signup Illustration" sx={{ width: "100%" }} />
                    </Grid>
                )}
            </Grid>
        </LandingContainer>
    );
};

export default SignupPage;
