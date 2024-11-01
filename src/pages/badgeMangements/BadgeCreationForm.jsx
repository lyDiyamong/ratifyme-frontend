// React import
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

// MUI import
import { Button, MobileStepper, Stack, Typography, CircularProgress, Box, Skeleton, IconButton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// Custom import
import badgeSchema from "../../utils/schema/badgeSchema";
import theme from "../../assets/themes";
import CoreElementStep from "./CoreElementStep";
import MetadataStep from "./MetadataStep";
import OptionalStep from "./OptionalStep";
import { SpinLoading } from "../../components/loading/SpinLoading";
import { useCreateBadgeMutation } from "../../store/api/badgeManagement/badgeApi";
import { useFetchAchievementTypeQuery } from "../../store/api/achievements/achievementTypeApi";
import { CameraAltRounded } from "@mui/icons-material";
import BadgeDefaultSvg from "../../assets/icons/BadgeDefaultSvg.svg";
import AlertMessage from "../../components/alert/AlertMessage";
import useCatchStatus from "../../hooks/useCatchStatus";
import PageLoading from "../../components/loading/PageLoading";

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
        label: "Additional Elements :",
        description:
            "An additional statement of the badge. The specific elements required for an Open Badge may vary depending on the implementation and the preferences of the issuer.",
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

    const [createBadge, { isLoading, isError, error, isSuccess, data }] = useCreateBadgeMutation();
    const [message, setMessage] = useCatchStatus(isError || isSuccess, isError ? error?.data?.message : data?.message);

    const { data: achievementType } = useFetchAchievementTypeQuery();

    const allAchievementTypes = achievementType?.data || [];

    const userName = `${issuerData?.User?.firstName} ${issuerData?.User?.lastName}`;

    const stepFields = {
        0: ["narrative", "AchievementTypes"],
        1: ["badgeName", "badgeDescription", "startedDate", "endDate"],
    };

    // React Hook Form
    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            issuer: userName || "",
            criteria: "",
            value: "",
            earningCriteria: "",
            duration: "",

            badgeName: "",
            issuedOn: null,
            startedDate: null,
            endDate: null,
            badgeDescription: "",
            tagsOrLanguage: "",
            achievementType: "",

            expiredDate: null,
            additionLink: "",
        },
        mode: "onChange",
        resolver: yupResolver(badgeSchema),
    });

    const maxSteps = steps.length;

    const handleNext = async () => {
        // Start loading
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve));
        // Validate by field of each step
        const isValid = await trigger(stepFields[activeStep]);
        // Move to next step if valid
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        // Stop loading
        setLoading(false);
    };

    const handleBack = () => {
        setLoading(true);
        // setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setLoading(false);
        // }, 1000);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        // Construct a FormData object
        const formData = new FormData();

        // Append form data fields
        formData.append("name", data.badgeName);
        formData.append("description", data.badgeDescription);
        formData.append("tags", data.tagsOrLanguage ? data.tagsOrLanguage.join(",") : []);
        formData.append("startedDate", data.startedDate ? data.startedDate.toISOString() : null);
        formData.append("endDate", data.endDate ? data.endDate.toISOString() : null);
        formData.append("expiredDate", data.expiredDate ? data.expiredDate.toISOString() : null);
        formData.append("issuerId", issuerData.id);
        formData.append("institutionId", issuerData.institutionId);

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
            navigate("/dashboard/management/badges", {
                state: { successMessage: "Badge created successfully!" },
            });
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
    useEffect(() => {
        if (userName) {
            setValue("issuer", userName);
        }
    }, [userName, issuerData]);

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <CoreElementStep control={control} errors={errors} schema={badgeSchema} />;
            case 1:
                return <MetadataStep control={control} errors={errors} schema={badgeSchema} />;
            case 2:
                return <OptionalStep control={control} errors={errors} schema={badgeSchema} />;
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
            <PageLoading isLoading={isLoading} />
            {/* Start the Image Upload */}
            {message && (
                <AlertMessage variant={isError ? "error" : "success"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
            <Stack direction={{ md: "row", xss: "column-reverse" }} gap={3} alignItems={{ md: "center", xss: "start" }}>
                <Box
                    sx={{
                        position: "relative",
                        maxWidth: "250px",
                        width: "100%",
                        height: "250px",
                        borderRadius: theme.customShape.input,
                        overflow: "hidden",
                        border: "1px solid gray",
                    }}
                >
                    {uploadedImage ? (
                        <img
                            src={URL.createObjectURL(uploadedImage)}
                            alt="Selected"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <img src={BadgeDefaultSvg} alt="Default" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                    <Box
                        className="hover-overlay"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                        <input type="file" id="upload-photo" style={{ display: "none" }} onChange={handleFileChange} />
                        <label htmlFor="upload-photo">
                            <Stack justifyContent="center" alignItems="center">
                                <IconButton component="span">
                                    <CameraAltRounded sx={{ color: "white" }} />
                                </IconButton>
                                <Typography color="white" textAlign="center">
                                    Badge Image
                                </Typography>
                            </Stack>
                        </label>
                    </Box>
                </Box>

                <Stack gap={2}>
                    <Typography component="h3" variant="h3" fontWeight={theme.fontWeight.semiBold}>
                        Badge Image
                    </Typography>
                    <Typography
                        variant="body1`"
                        sx={{
                            maxWidth: 400,
                            width: "100%",
                            color: theme.palette.text.disabled,
                        }}
                    >
                        The badge image can be any type of image, but the image size must be below 1 MB.
                    </Typography>
                </Stack>
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
