// React import
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// MUI import
import { Button, MobileStepper, Stack, Typography, CircularProgress, Box, Skeleton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Custom import
import theme from "../../assets/themes";
import CoreElementStep from "./CoreElementStep";
import MetadataStep from "./MetadataStep";
import OptionalStep from "./OptionalStep";
import DashboardContainer from "../../components/styles/DashboardContainer";
import ImageSelection from "./ImageSelection";
import { SpinLoading } from "../../components/loading/SpinLoading";

// The data static of the description
const steps = [
    {
        label: "Core Element :",
        description:
            "A clear statement of the skills, knowledge, or abilities that a learner must demonstrate to earn the badge.",
    },
    {
        label: "Metadata of the Badge :",
        description:
            "A clear statement capture essential information about learning and achievements by storing this metadata inside the badge image.",
    },
    {
        label: "Optional Elements :",
        description:
            "A optional statement of the badge. The specific elements required for an Open Badge may vary depending on the implementation and the preferences of the issuer.",
    },
];

const BadgeCreationForm = () => {
    // Stepper
    const [activeStep, setActiveStep] = useState(0);
    // Image upload
    const [uploadedImage, setUploadedImage] = useState(null);
    // Slow loading
    const [loading, setLoading] = useState(false);

    // React Hook Form
    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            issuer: "",
            criteria: "",
            value: "",
            earningCriteria: "",
            duration: "",

            badgeName: "",
            issuedOn: null,
            startDate: null,
            endDate: null,
            badgeDescription: "",
            tagsOrLanguage: "",
            achievementType: "",

            expirationDate: null,
            additionLink: "",
        },
    });

    const maxSteps = steps.length;

    // const handleNext = async () => {
    //     // Start loading
    //     setLoading(true);
    //     const isValid = await trigger();
    //     if (isValid) {
    //         setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     }
    //     // Stop loading
    //     setLoading(false);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
    const handleNext = async () => {
        // Start loading
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const isValid = await trigger();
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        // Stop loading
        setLoading(false);
    };

    const handleBack = () => {
        setLoading(true);
        setTimeout(() => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            setLoading(false);
        }, 1000);
    };

    const onSubmit = (data) => {
        setLoading(true);
        // console.log("Submitting data", data);
        console.log("Submitting data", { ...data, image: uploadedImage });

        // SetTimeout to see
        setTimeout(() => {
            console.log("Data submitted");
            setLoading(false);

            reset();
            setUploadedImage(null);
        }, 1000);
    };

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <CoreElementStep control={control} errors={errors} />;
            case 1:
                return <MetadataStep control={control} errors={errors} />;
            case 2:
                return <OptionalStep control={control} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        // ============ Start the Badge Creation Form ============
        <DashboardContainer>
            <Stack
                sx={{
                    background: theme.palette.customColors.white,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: 3,
                    mb: 3,
                    gap: 6,
                }}
            >
                {/* Start the Image Upload */}
                <ImageSelection onImageSelect={(file) => setUploadedImage(file)} />
                {/* End the Image Upload */}

                {/* Start the input form */}
                <Stack>
                    <Stack
                        component="form"
                        direction="row"
                        flexDirection={{ xss: "column", md: "row" }}
                        gap={{ xss: 1, md: 4 }}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        {/* Slow Loading of Description */}
                        {loading ? (
                            <Stack spacing={1}>
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    width={500}
                                    height={60}
                                    sx={{ display: { xss: "none", md: "block" } }}
                                />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: "1rem" }} />
                                <Skeleton variant="text" animation="wave" sx={{ fontSize: "1rem" }} />
                            </Stack>
                        ) : (
                            // Description of each form
                            <Stack gap={2}>
                                <Typography component="h3" variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                    {steps[activeStep].label}
                                </Typography>
                                <Typography
                                    variant="body1`"
                                    sx={{
                                        maxWidth: 600,
                                        width: "100%",
                                        color: theme.palette.text.disabled,
                                    }}
                                >
                                    {steps[activeStep].description}
                                </Typography>
                            </Stack>
                        )}

                        <Stack sx={{ maxWidth: "100%", width: "100%" }}>
                            {/* Slow Loading of form */}
                            {loading ? (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <SpinLoading />
                                </Box>
                            ) : (
                                // Form input render
                                renderStepContent()
                            )}
                        </Stack>
                    </Stack>

                    {/* Start the Stepper */}
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        sx={{ marginTop: 4 }}
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                {loading ? <CircularProgress size={24} /> : "Next"}
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                {loading ? <CircularProgress size={24} /> : "Back"}
                            </Button>
                        }
                    />
                    {/* End the Stepper */}
                </Stack>
                {/* End the input form */}
            </Stack>
        </DashboardContainer>
        // ============ End the Badge Creation Form ============
    );
};

export default BadgeCreationForm;
