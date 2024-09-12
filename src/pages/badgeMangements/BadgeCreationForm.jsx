// React import
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// MUI import
import { Button, MobileStepper, Stack, Typography } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Custom import
import theme from "../../assets/themes";
import CoreElementStep from "./CoreElementStep";
import MetadataStep from "./MetadataStep";
import OptionalStep from "./OptionalStep";
import DashboardContainer from "../../components/styles/DashboardContainer";
import ImageSelection from "./ImageSelection";

// Static data for the steppers
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
    // Stepper useState
    const [activeStep, setActiveStep] = React.useState(0);

    // State for storing image
    const [uploadedImage, setUploadedImage] = useState(null);

    // React-hook-form
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

    // Max of the steps
    const maxSteps = steps.length;

    // Handle the next of stepper
    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    // Handle the back of stepper
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data) => {
        // Log form data and image together when the form is submitted
        console.log({ ...data, image: uploadedImage });
        reset();
    };

    // Render Step content function
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
        // ============ Start Badge Creation Form ============
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
                {/* Image Upload Component */}
                <ImageSelection onImageSelect={(file) => setUploadedImage(file)} />

                {/* ============ Start Badge content ============ */}
                <Stack>
                    {/* Start Form Render*/}
                    <Stack
                        component="form"
                        direction="row"
                        flexDirection={{ xss: "column", md: "row" }}
                        gap={{ xss: 1, md: 4 }}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
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

                        <Stack sx={{ maxWidth: "100%", width: "100%" }}>{renderStepContent()}</Stack>
                    </Stack>
                    {/* End Form Render*/}

                    {/* Start Stepper section */}
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        sx={{ marginTop: 4 }}
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        }
                    />
                    {/* End Stepper section */}
                </Stack>
                {/* ============ Start Badge content ============ */}
            </Stack>
        </DashboardContainer>
        // ============ End Badge Creation Form ============
    );
};

export default BadgeCreationForm;
