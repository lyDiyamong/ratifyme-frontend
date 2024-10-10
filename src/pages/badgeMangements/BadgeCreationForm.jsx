// React import
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI import
import { Button, MobileStepper, Stack, Typography, CircularProgress, Box, Skeleton, IconButton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Custom import
import theme from "../../assets/themes";
import CoreElementStep from "./CoreElementStep";
import MetadataStep from "./MetadataStep";
import OptionalStep from "./OptionalStep";
import { SpinLoading } from "../../components/loading/SpinLoading";
import { useCreateBadgeMutation, } from "../../store/api/badgeManagement/badgeApi";
import { useFetchAchievementTypeQuery } from "../../store/api/achievements/achievementTypeApi";
import { AssignmentIndOutlined, CameraAltRounded } from "@mui/icons-material";

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
    const { issuerData } = useSelector((state) => state.global);

    const navigate = useNavigate();
    // Stepper
    const [activeStep, setActiveStep] = useState(0);
    // Image upload
    const [uploadedImage, setUploadedImage] = useState(null);
    // Slow loading
    const [loading, setLoading] = useState(false);

    const [createBadge] = useCreateBadgeMutation();

    const { data: achievementType } = useFetchAchievementTypeQuery();

    const allAchievementTypes = achievementType?.data || [];

    const userName = `${issuerData.User.firstName} ${issuerData.User.lastName}`;

    // React Hook Form
    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            issuer: userName || "",
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

    const onSubmit = async (data) => {
        setLoading(true);

        // Construct a FormData object
        const formData = new FormData();

        // Append form data fields
        formData.append("name", data.badgeName);
        formData.append("description", data.badgeDescription);
        formData.append("tags", data.tagsOrLanguage.join(","));
        formData.append("startedDate", data.startDate ? data.startDate.toISOString() : null);
        formData.append("expiredDate", data.endDate ? data.endDate.toISOString() : null);
        formData.append("issuerId", issuerData.id);

        // Append Achievements
        data.AchievementTypes?.forEach((achievementName, index) => {
            const achievementType = allAchievementTypes.find((type) => type.name === achievementName);
            if (achievementType) {
                formData.append(`Achievements[${index}][achievementTypeId]`, achievementType.id);
                formData.append(`Achievements[${index}][AchievementType][name]`, achievementName);
            }
        });

        // Append Criterias
        if (data.narrative) {
            formData.append("Criterias[0][narrative]", data.narrative);
        }

        // Append the uploaded image to the FormData object (if available)
        if (uploadedImage) {
            formData.append("badgeFile", uploadedImage);
        }

        try {
            // Call your mutation function to create the badge with formData
            await createBadge(formData).unwrap();

            // Reset form and image state
            reset();
            setUploadedImage(null);
            navigate("/management/badges");
        } catch (error) {
            console.error("Error creating badge:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file); 
        }
        event.target.value = "";
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
        <Stack
            sx={{
                background: theme.palette.customColors.white,
                boxShadow: theme.customShadows.default,
                borderRadius: theme.customShape.section,
                p: 3,
                mb: 3,
                gap: 6,
            }}
            onSubmit={handleSubmit(onSubmit)}
            component="form"
        >
            {/* Start the Image Upload */}
            {/* <Typography>Hello</Typography> */}
            {/* <ImageSelection onImageSelect={(file) => setUploadedImage(file)} /> */}
            <Stack direction={{ sm: "column", md: "row" }} gap={3} alignItems="center">
                <Box
                    sx={{
                        position: "relative",
                        width: "150px",
                        height: "150px",
                        borderRadius: "100%",
                        overflow: "hidden",
                        "&:hover .hover-overlay": {
                            visibility: "visible",
                            opacity: 1,
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={uploadedImage}
                        alt="person"
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />

                    <Box
                        className="hover-overlay"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            visibility: "hidden",
                            opacity: 0,
                            transition: "visibility 0.2s, opacity 0.3s ease-in-out",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="file"
                            id="icon-button-photo"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="icon-button-photo">
                            <IconButton
                                aria-label="upload"
                                component="span"
                                sx={{
                                    color: theme.palette.customColors.white,
                                }}
                            >
                                <CameraAltRounded />
                            </IconButton>
                        </label>
                        <Typography variant="body3" color={theme.palette.customColors.white}>
                            Update Profile
                        </Typography>
                    </Box>
                </Box>

                {/* <Stack sx={{ alignItems: { md: "start", xss: "center" }, gap: 1 }}>

                    <Box
                        sx={{
                            bgcolor: theme.palette.action.hover,
                            color: theme.palette.primary.main,
                            p: 1,
                            px: 2,
                            borderRadius: theme.customShape.section,
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <AssignmentIndOutlined sx={{ color: theme.palette.primary.main }} />
                        
                    </Box>
                </Stack> */}
            </Stack>
            {/* End the Image Upload */}

            {/* Start the input form */}
            <Stack>
                <Stack direction="row" flexDirection={{ xss: "column", md: "row" }} gap={{ xss: 1, md: 4 }} noValidate>
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
        // ============ End the Badge Creation Form ============
    );
};

export default BadgeCreationForm;
