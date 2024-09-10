import React from "react";
import { Box, Paper, Button, TextField, MobileStepper, Typography, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";
import ImageSelection from "./ImageSelection";

const steps = [
    {
        description: "Core Elements :",
        details:
            "Badge templates must use square images in PNG format, with dimensions between 300x300.",
        inputs: [
            {
                label: "Issuer*",
                name: "issuer",
                rules: { required: false },
            },
            {
                label: "Criteria*",
                name: "criteria",
                rules: { required: false },
            },
            {
                label: "Earning Criteria*",
                name: "earningCriteria",
                rules: { required: false },
            },
            {
                label: "Duration",
                name: "duration",
                rules: { required: false },
            },
        ],
    },
    {
        description: "Metadata of the Badge :",
        details:
            "A clear statement capture essential information about learning and achievements by storing this metadata inside the badge image.",
        inputs: [
            {
                label: "Badge Name*",
                name: "bagdeName",
                rules: { required: false },
            },
            {
                label: "Issued On*",
                name: "issuedOn",
                rules: { required: false },
            },
            {
                label: "Valid Start",
                name: "validStart",
                rules: { required: false },
            },
            {
                label: "Valid End",
                name: "validEnd",
                rules: { required: false },
            },
            {
                label: "Badge Description",
                name: "badgeDescription",
                rules: { required: false },
            },
            {
                label: "Tags / Language",
                name: "tagsOrLanguage",
                rules: { required: false },
            },
            {
                label: "Achievement Type*",
                name: "achievementType",
                rules: { required: false },
            },
        ],
    },
    {
        description: "Optional Elements :",
        details:
            "A optional statement of the badge. The specific elements required for an Open Badge may vary depending on the implementation and the preferences of the issuer",
        inputs: [
            {
                label: "Expiration Date",
                name: "expirationDate",
                rules: { required: "Expiration Date is required" },
            },
            {
                label: "Addition Links",
                name: "additionLinks",
                rules: { required: "Addition Links is required" },
            },
        ],
    },
];

const BadgeCreationForm = () => {
    const [activeStep, setActiveStep] = React.useState(0);
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
            earningCriteria: "",
            duration: "",
            bagdeName: "",
            issuedOn: "",
            validStart: "",
            validEnd: "",
            badgeDescription: "",
            tagsOrLanguage: "",
            achievementType: "",
            expirationDate: "",
            additionLinks: "",
        },
    });
    const maxSteps = steps.length;

    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <DashboardContainer>
            <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    padding: "32px",
                    bgcolor: theme.palette.customColors.white,
                    gap: 10,
                    mb: 3,
                }}
            >
                <ImageSelection />

                <Box>
                    <Stack direction="row" flexDirection={{ xss: "column", md: "row" }} sx={{ gap: 2, mb: 4 }}>
                        <Stack gap={2}>
                            <Typography component="h3" variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                {steps[activeStep].description}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    maxWidth: "500px",
                                    width: "100%",
                                    color: theme.palette.text.disabled,
                                }}
                            >
                                {steps[activeStep].details}
                            </Typography>
                        </Stack>

                        <Box sx={{ maxWidth: "100%", width: "100%" }}>
                            {steps[activeStep].inputs.map((input, index) => (
                                <Controller
                                    key={`${input.name}-${index}`}
                                    name={input.name}
                                    control={control}
                                    rules={input.rules}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={input.label}
                                            fullWidth
                                            margin="normal"
                                            error={!!errors[input.name]}
                                            helperText={errors[input.name]?.message}
                                            borderRadius={theme.customShape.borderRadius}
                                        />
                                    )}
                                />
                            ))}

                            {activeStep === maxSteps - 1 && (
                                <Stack direction="row" sx={{ width: "100%", my: 2, justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            borderRadius: theme.customShape.btn,
                                            color: theme.palette.customColors.white,
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </Stack>
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />
                </Box>
            </Stack>
        </DashboardContainer>
    );
};

export default BadgeCreationForm;
