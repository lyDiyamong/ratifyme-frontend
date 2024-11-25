// React library import
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI import
import { Box, Typography, Button, Stepper, Step, Stack } from "@mui/material";

// Custom import
import AlertMessage from "../../components/alert/AlertMessage";
import RenderStepSignupContent from "../../components/auth/RenderStepSignupContent.jsx";
import { GetStepIcon, CustomConnector, CustomStepIcon, CustomStepLabel } from "../../components/auth/CustomSteppers.jsx";
import PageLoading from "../../components/loading/PageLoading.jsx";
import AuthOutletImage from "../../components/auth/AuthOutletImage.jsx";
import useCatchStatus from "../../hooks/useCatchStatus";
import { passwordSchema } from "../../utils/auth/passwordUtils";
import { schema } from "../../utils/auth/fieldValidationSchema.js";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import theme from "../../assets/themes";

// API import
import { useSignUpMutation } from "../../store/api/auth/authApi";

const passwordSchemaName = passwordSchema({
    passwordName: "password",
    passwordConfirmName: "passwordConfirm",
});

const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

const SignupPage = () => {
    const { search, pathname } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [signUp, { isLoading, isError, error, isSuccess, data }] = useSignUpMutation();
    const [activeStep, setActiveStep] = useState(0);
    const { inviter, guest } = location.state || {};
    const [fieldValues, setFieldValues] = useState({});
    const [stepCompletion, setStepCompletion] = useState([false, false, false, false, false]);

    const [message, setMessage] = useCatchStatus(isError || isSuccess, isError ? error?.data?.message : data?.message);

    // Fallback steps in case role is not defined
    const steps = {
        institution: ["Institution Info", "General Info", "Address Info", "Account Setup", "Password Setup"],
        issuer: ["General Info", "Address Info", "Account Setup", "Password Setup"],
        earner: ["General Info", "Address Info", "Account Setup", "Password Setup"],
    };

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);

        const validRoles = ["institution", "earner", "issuer"];

        // Check for valid routes
        const isValidPath = pathname === "/auth/signup" && validRoles.includes(queryRole.toLowerCase());

        if (!isValidPath) {
            navigate("/not-found");
        }
    }, [search, pathname, navigate]);

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
            termsOfUse: false,
        },
        mode: "onChange",
        resolver: yupResolver(schema.concat(passwordSchemaName)),
    });

    const {
        handleSubmit,
        control,
        trigger,
        setValue,
        watch,
        formState: { errors },
    } = methods;

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
        if (guest && guest.inviteEmail && role !== "institution") {
            setValue("email", guest.inviteEmail);
        }
    }, [guest, role, search, setValue]);

    const handleNext = async () => {
        let fieldsToValidate = [];

        // Define which fields to validate for each step
        switch (activeStep) {
            case 0:
                if (role === "institution") {
                    fieldsToValidate = ["institutionName", "institutionEmail", "institutionPhoneNumber", "institutionWebsiteUrl"];
                } else {
                    fieldsToValidate = ["firstName", "lastName", "genderId", "dateOfBirth"];
                }
                break;
            case 1:
                if (role === "institution") {
                    fieldsToValidate = ["firstName", "lastName", "genderId", "dateOfBirth"];
                } else {
                    fieldsToValidate = ["country", "city", "street", "postalCode"];
                }
                break;
            case 2:
                if (role === "institution") {
                    fieldsToValidate = ["country", "city", "street", "postalCode"];
                } else {
                    fieldsToValidate = ["username", "phoneNumber", "email"];
                }
                break;
            case 3:
                if (role === "institution") {
                    fieldsToValidate = ["username", "phoneNumber", "email"];
                } else {
                    fieldsToValidate = ["password", "passwordConfirm", "termsOfUse"];
                }
                break;
            case 4: // Only applicable to "institution"
                fieldsToValidate = ["password", "passwordConfirm", "termsOfUse"];
                break;
            default:
                fieldsToValidate = [];
        }

        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid) {
            const currentValues = methods.getValues();

            // setFieldValues(currentValues);
            setFieldValues((prev) => ({
                ...prev,
                ...currentValues,
            }));

            // Mark current step as completed
            setStepCompletion((prev) => {
                const newCompletion = [...prev];
                newCompletion[activeStep] = true;
                return newCompletion;
            });

            const totalSteps = role === "institution" ? 5 : 4;

            // If it's the last step, submit the form
            if (activeStep === totalSteps - 1) {
                handleSubmit(onSubmit)();
            } else {
                setActiveStep((prevStep) => prevStep + 1);
            }
        }
    };

    const onSubmit = async (data) => {
        const roleId = roleIdData[role] || 0;

        const reqData = {
            userData: {
                ...data,
                roleId,
                email: guest ? guest.inviteEmail : data.email,
            },
            addressData: {
                street: data.street,
                city: data.city,
                postalCode: data.postalCode,
                country: data.country,
            },
            institutionData: {
                institutionName: data.institutionName,
                institutionEmail: data.institutionEmail,
                institutionPhoneNumber: data.institutionPhoneNumber,
                institutionWebsiteUrl: data.institutionWebsiteUrl,
            },
            issuerData: {},
            earnerData: {},
        };

        // Add institutionId or IssuerId to issuerData if inviter exists
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
            navigate("/auth/verify-email", { state: { email: data.email, roleId } });
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    const handleSubmitLastStep = async () => {
        // Validate password and confirm password
        const fieldsToValidate = ["password", "passwordConfirm", "termsOfUse"];
        const isStepValid = await trigger(fieldsToValidate);

        // Check if password fields and checkbox are properly filled
        const termsAgreed = methods.getValues("termsOfUse");

        if (!termsAgreed) {
            setMessage("Please agree to the Terms of Use before proceeding.");
            return;
        }

        // Proceed if all validations pass
        if (isStepValid) {
            const currentValues = methods.getValues();

            try {
                await onSubmit(currentValues);
            } catch (err) {
                console.error("Error during last step submission:", err);
            }
        } else {
            setMessage("Please ensure all fields are correctly filled.");
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    return (
        <>
            <PageLoading isLoading={isLoading} />
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                {message && (
                    <AlertMessage variant="error" timeOutClose={1000} onClose={() => setMessage("")}>
                        {message}
                    </AlertMessage>
                )}
                <Stack direction="row" sx={{ height: { md: "100vh" } }}>
                    {/* Right side with login form */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{
                            width: { md: "50%", xss: "100%" },
                            px: 4,
                        }}
                    >
                        <Box mx="auto" maxWidth="750px" width="100%">
                            <Link to="/">
                                <Box component="img" src={RatifyMELogo} alt="Ratifyme Favicon" sx={{ width: 150, height: 150 }} />
                            </Link>

                            <Box>
                                <Typography variant="h2" fontWeight={theme.fontWeight.semiBold} mb={1}>
                                    Create an account
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Signup now and unlock exclusive access!
                                </Typography>
                            </Box>

                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                connector={(steps[role] || steps.default || []).map((_, index) => (
                                    <CustomConnector key={index} ownerState={{ isCompleted: index < activeStep }} />
                                ))}
                                sx={{ my: { xss: 2, xs: 3, md: 5 } }}
                            >
                                {(steps[role] || steps.default || []).map((label, index) => (
                                    <Step key={label}>
                                        <CustomStepLabel
                                            StepIconComponent={({ active }) => (
                                                <CustomStepIcon ownerState={{ active, completed: stepCompletion[index] }}>
                                                    {GetStepIcon(label)}
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

                            <Stack direction="row">
                                <FormProvider {...methods}>
                                    <Box component="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
                                        <RenderStepSignupContent
                                            step={activeStep}
                                            control={control}
                                            role={role}
                                            guest={guest}
                                            watch={watch}
                                            errors={errors}
                                        />

                                        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, mb: 5 }}>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                variant="outlined"
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    fontWeight: theme.fontWeight.bold,
                                                    borderRadius: theme.customShape.btn,
                                                    padding: "8px 48px",
                                                    textTransform: "none",
                                                }}
                                            >
                                                Back
                                            </Button>
                                            {activeStep < steps[role]?.length - 1 && (
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        color: theme.palette.customColors.white,
                                                        fontWeight: theme.fontWeight.bold,
                                                        borderRadius: theme.customShape.btn,
                                                        padding: "8px 48px",
                                                        textTransform: "none",
                                                    }}
                                                    onClick={handleNext}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? "Processing..." : "Next"}
                                                </Button>
                                            )}

                                            {activeStep === steps[role]?.length - 1 && (
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        color: theme.palette.customColors.white,
                                                        fontWeight: theme.fontWeight.bold,
                                                        borderRadius: theme.customShape.btn,
                                                        padding: "8px 48px",
                                                        textTransform: "none",
                                                    }}
                                                    onClick={handleSubmitLastStep}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? "Processing..." : "Done"}
                                                </Button>
                                            )}
                                        </Stack>
                                    </Box>
                                </FormProvider>
                            </Stack>
                        </Box>
                    </Box>

                    <AuthOutletImage
                        backgroundColor="#071E3D"
                        image={
                            "https://images.pexels.com/photos/27809294/pexels-photo-27809294/free-photo-of-a-3d-model-of-a-ball-with-red-and-blue-lights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                        title1="Unlock your potential."
                        title2="Let our digital badges celebrate your journey."
                        description="Transform the future of education and employment by launching a digital credential business that empowers people to securely showcase their skills in a rapidly evolving world."
                    />
                </Stack>
            </Box>
        </>
    );
};

export default SignupPage;
