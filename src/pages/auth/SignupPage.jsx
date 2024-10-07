// React library import
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";

// MUI import
import { Box, Grid, Typography, Button, Stepper, Step, StepLabel, Stack, StepConnector } from "@mui/material";
import { styled } from "@mui/system";

// Custom import
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import SignupImgSvg from "../../assets/images/Signup-illu.svg";
import { useSignUpMutation } from "../../store/api/auth/authApi";
import GeneralInfoFields from "../../components/auth/GeneralInfoFields";
import AddressFields from "../../components/auth/AddressFields";
import InstitutionInfoFields from "../../components/auth/InstitutionInfoFields";
import AccountSetupFields from "../../components/auth/AccountSetupFields";
import useCatchStatus from "../../hooks/useCatchStatus";
import AlertMessage from "../../components/alert/AlertMessage";

const schema = yup.object({
    firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "First name must contain only letters and no spaces")
        .required("First name is required"),
    lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "Last name must contain only letters and no spaces")
        .required("Last name is required"),
    username: yup
        .string()
        .matches(
            /^[a-zA-Z0-9._-]+$/,
            "Username must not contain spaces and can only include letters, numbers, dots, underscores, and hyphens.",
        )
        .required("Username is required"),
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
        .required("Email is required"),
    postalCode: yup
        .string()
        .matches(/^\d+$/, "Verification code must be numeric")
        .required("Verification code is required"),
    institutionName: yup
        .string()
        .matches(/^[A-Za-z\s]+$/, "Institution name must contains only characters")
        .required("Institution name is required"),
    institutionEmail: yup
        .string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
        .required("Email is required"),
    url: yup.string().url("Invalid URL format").required("URL is required"),
    phoneNumber: yup
        .string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .required("Phone number is required"),
});

const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: ownerState.completed
        ? theme.palette.primary.main
        : ownerState.active
        ? theme.palette.primary.main
        : "1px solid #e0e0e0",
    backgroundColor: ownerState.completed
        ? theme.palette.primary.main
        : ownerState.active
        ? theme.palette.primary.main
        : "none",
    color: ownerState.completed
        ? theme.palette.customColors.white
        : ownerState.active
        ? theme.palette.customColors.white
        : "#000",
    position: "relative",
}));

// Custom connector to match the line style
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    "&.MuiStepConnector-root": {
        top: "25%",
        position: "absolute",
        transform: "translateY(-50%)",
    },
    "& .MuiStepConnector-line": {
        borderColor: theme.palette.customColors.gray200,
        top: "50%",
        position: "absolute",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
    },
}));

// Modify StepLabel to add custom styling for active steps
const CustomStepLabel = styled(StepLabel)(({ theme, ownerState }) => ({
    "& .MuiStepLabel-label": {
        color: ownerState.completed
            ? theme.palette.success.main
            : ownerState.active
            ? theme.palette.primary.main
            : "#999",
        fontWeight: ownerState.active || ownerState.completed ? "bold" : "normal",
        fontSize: "14px",
    },
}));

const SignupPage = () => {
    const { search } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [signUp, { isLoading, isError, error }] = useSignUpMutation();
    // const message = useCatchStatus(isError, error?.data?.message);
    const [message, setMessage] = useCatchStatus(isError || isError, error?.data?.message);
    const [activeStep, setActiveStep] = useState(0);
    const { inviter, guest } = location.state || {};
    const [fieldValues, setFieldValues] = useState({});
    const [stepCompletion, setStepCompletion] = useState([false, false, false, false]);

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
            email: guest?.inviteEmail || "",
            phoneNumber: "",
            password: "",
            passwordConfirm: "",
            country: "",
            city: "",
            street: "",
            postalCode: "",
            institutionName: "",
            institutionEmail: "",
            institutionPhoneNumber: "",
            institutionWebsiteUrl: "",
        },
        mode: "onChange",
    });

    const { handleSubmit, control, trigger, setValue, reset } = methods;

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
        if (guest && guest.inviteEmail && role !== "institution") {
            setValue("email", guest.inviteEmail);
        }
    }, [guest, role, search, setValue]);

    const onSubmit = async (data) => {
        const roleId = roleIdData[role] || 0;

        // Restore any previously cleared values
        const finalData = {
            ...data,
            username: data.username || fieldValues.username,
            phoneNumber: data.phoneNumber || fieldValues.phoneNumber,
            email: data.email || fieldValues.email,
            password: data.password || fieldValues.password,
            passwordConfirm: data.passwordConfirm || fieldValues.passwordConfirm,
            institutionName: data.institutionName || fieldValues.institutionName,
            institutionEmail: data.institutionEmail || fieldValues.institutionEmail,
            institutionPhoneNumber: data.institutionPhoneNumber || fieldValues.institutionPhoneNumber,
            institutionWebsiteUrl: data.institutionWebsiteUrl || fieldValues.institutionWebsiteUrl,
        };

        const reqData = {
            userData: { ...finalData, roleId, email: guest ? guest.inviteEmail : finalData.email },
            addressData: {
                street: finalData.street,
                city: finalData.city,
                postalCode: finalData.postalCode,
                country: finalData.country,
            },
            issuerData: {},
            earnerData: {},
            institutionData: {
                institutionName: finalData.institutionName,
                institutionEmail: finalData.institutionEmail,
                institutionPhoneNumber: finalData.institutionPhoneNumber,
                institutionWebsiteUrl: finalData.institutionWebsiteUrl,
            },
        };

        // Add institutionId to issuerData if inviter exists
        if (inviter) {
            reqData.issuerData = {
                institutionId: inviter.id,
            };

            reqData.earnerData = {
                issuerId: inviter.id,
            };
        }

        try {
            await signUp(reqData).unwrap();
            navigate(role === "institution" ? "/price" : "/dashboard");
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    const handleNext = async () => {
        let fieldsToValidate = [];

        // Specify which fields to validate based on the current step
        switch (activeStep) {
            case 0: // Step 1: General Information
                fieldsToValidate = ["firstName", "lastName", "genderId", "dateOfBirth"];
                break;
            case 1: // Step 2: Address Information
                fieldsToValidate = ["country", "city", "street", "postalCode"];
                break;
            case 2: // Step 3: Account Setup
                fieldsToValidate = ["username", "phoneNumber", "email", "password", "passwordConfirm"];
                break;
            case 3: // Step 4: Institution Information (if role === 'institution')
                if (role === "institution") {
                    fieldsToValidate = [
                        "institutionName",
                        "institutionEmail",
                        "institutionPhoneNumber",
                        "institutionWebsiteUrl",
                    ];
                }
                break;
            default:
                fieldsToValidate = [];
        }

        // Trigger validation
        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid) {
            const currentValues = {
                firstName: methods.getValues("firstName"),
                lastName: methods.getValues("lastName"),
                dateOfBirth: methods.getValues("dateOfBirth"),
                genderId: methods.getValues("genderId"),
                username: methods.getValues("username"),
                phoneNumber: methods.getValues("phoneNumber"),
                email: methods.getValues("email"),
                password: methods.getValues("password"),
                passwordConfirm: methods.getValues("passwordConfirm"),
                country: methods.getValues("country"),
                city: methods.getValues("city"),
                street: methods.getValues("street"),
                postalCode: methods.getValues("postalCode"),
                institutionName: methods.getValues("institutionName"),
                institutionEmail: methods.getValues("institutionEmail"),
                institutionPhoneNumber: methods.getValues("institutionPhoneNumber"),
                institutionWebsiteUrl: methods.getValues("institutionWebsiteUrl"),
            };

            // Store the values temporarily
            setFieldValues(currentValues);

            // Mark current step as complete
            setStepCompletion((prev) => {
                const newCompletion = [...prev];
                newCompletion[activeStep] = true; // Set current step to complete
                return newCompletion;
            });
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <GeneralInfoFields control={control} schema={schema} />;
            case 1:
                return <AddressFields control={control} schema={schema} />;
            case 2:
                return <AccountSetupFields control={control} role={role} guest={guest} schema={schema} />;
            case 3:
                return role === "institution" ? <InstitutionInfoFields control={control} schema={schema} /> : null;

            default:
                return null;
        }
    };

    return (
        <LandingContainer sx={{ my: 6 }}>
            {message && (
                <AlertMessage variant="error" onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            <Grid container spacing={4}>
                <Grid item xss={12} md={role === "institution" ? 12 : 6}>
                    <Typography
                        variant="h4"
                        mb={4}
                        component="h4"
                        sx={{
                            fontSize: theme.typography.h2,
                            fontWeight: theme.fontWeight.bold,
                            lineHeight: 2,
                        }}
                    >
                        Sign up as {role}
                    </Typography>

                    <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
                        {(steps[role] || steps.default).map((label, index) => (
                            <Step key={label}>
                                <CustomStepLabel
                                    StepIconComponent={({ active }) => (
                                        <CustomStepIcon ownerState={{ active, completed: stepCompletion[index] }}>
                                            {index + 1}
                                        </CustomStepIcon>
                                    )}
                                    ownerState={{
                                        active: activeStep === index,
                                        completed: stepCompletion[index],
                                    }}
                                >
                                    {label}
                                </CustomStepLabel>
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
                                    sx={{
                                        color: theme.palette.background.default,
                                        fontWeight: theme.fontWeight.bold,
                                    }}
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
                                        ? "Create Account"
                                        : "Next"}
                                </Button>
                            </Stack>
                        </Box>
                    </FormProvider>
                </Grid>
                {role !== "institution" && (
                    <Grid item xss={12} md={6}>
                        <Box component="img" src={SignupImgSvg} alt="Signup Illustration" sx={{ width: "100%" }} />
                    </Grid>
                )}
            </Grid>
        </LandingContainer>
    );
};

export default SignupPage;
