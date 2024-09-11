// React import
import React from "react";
import { useForm, Controller } from "react-hook-form";

// MUI import
import { Box, Button, TextField, MobileStepper, Typography, Stack } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

//Custom import 
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";
import ImageSelection from "./ImageSelection";
import SelectForm from "../../components/SelectionForm";
import { steps } from "../../data/BadgeCreationFormDate";

const BadgeCreationForm = () => {

    // Stepper useState
    const [activeStep, setActiveStep] = React.useState(0);

    // Reat-hook-form function
    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
    } = useForm({
        // Set to default
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
            achievementType: "",
            tagsOrLanguage: "",
            expirationDate: "",
            additionLinks: "",
        },
    });

    // Max steps length
    const maxSteps = steps.length;

    // Handle the next of Stepper
    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    // Handle the back of Stepper
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // OnSubmit for the react-hook-form
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        // ============ Start Badge Creation Form ============ 
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
                {/* ============ Start Image Uplaod component ============  */}
                <ImageSelection />
                {/* ============ End Image Uplaod component ============  */}

                {/* ============ Start Creation Form ============  */}
                <Box>
                    {/* Start Form Container */}
                    <Stack direction="row" flexDirection={{ xss: "column", md: "row" }} sx={{ gap: 2, mb: 4 }}>
                        {/* Start Details info */}
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

                        {/* Start Input form */}
                        <Stack sx={{ maxWidth: "100%", width: "100%", gap: 2 }}>
                            {steps[activeStep].inputs.map((input, index) => (
                                input.component ? (
                                    <Controller
                                        key={`${input.name}-${index}`}
                                        name={input.name}
                                        control={control}
                                        rules={input.rules}
                                        render={({ field }) => (
                                            // Selection options
                                            <SelectForm
                                                {...field}
                                                fullWidth
                                                margin="normal"
                                                name={input.name}
                                                control={control}
                                                options={input.options}
                                                label={input.label}
                                                required={input.rules?.required}
                                                InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
                                                sx={{
                                                    "& .MuiInputLabel-root": {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                ) : (
                                    // Input field
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
                                                error={!!errors[input.name]}
                                                helperText={errors[input.name]?.message}
                                                borderRadius={theme.customShape.borderRadius}
                                                InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
                                                sx={{
                                                    "& .MuiInputLabel-root": {
                                                        color: theme.palette.text.secondary,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                )
                            ))}

                            {activeStep === maxSteps - 1 && (
                                // Submit button
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
                        </Stack>
                    </Stack>
                    {/* End Form Container */}

                    {/* Start Stepper Section */}
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
                    {/* End Stepper Section */}
                </Box>
                {/* ============ End Creation Form ============  */}
            </Stack>
        </DashboardContainer>
        // ============ End Badge Creation Form ============ 
    );
};

export default BadgeCreationForm;
