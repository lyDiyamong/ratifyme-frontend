// React import
import { useForm } from "react-hook-form";

// MUI import
import { Box, Typography, Button, Stack } from "@mui/material";

// Custom import
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";
import FormInput from "../../components/FormInput";

import ImageSelection from "./ImageSelection";

const BadgeCreationForm = () => {
    // Start React-hook-form function
    const { handleSubmit, control, reset } = useForm({
        // Start Set to default
        defaultValues: {
            dateOfBirth: null,
            country: "",
        },
    });

    // Start onSubmit function
    const onSubmit = (data) => {
        console.log(data);
        //Reset after success
        reset();
    };

    return (
        // ============ Start ============
        <DashboardContainer>
            <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                gap={5}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    padding: "32px",
                    bgcolor: theme.palette.customColors.white,
                    gap: 4,
                    mb: 3,
                }}
            >
                <ImageSelection />
                {/* ============ Start Personal information Form ============ */}
                <Stack>
                    <Box
                        sx={{
                            display: { md: "flex", xs: "block" },
                            justifyContent: "space-between",
                            gap: 4,
                        }}
                    >
                        {/* Start the Detail paragraph */}
                        <Stack gap={1} sx={{ maxWidth: 500, width: "100%", pb: 2 }}>
                            <Typography component="h3" variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                Core Elements :
                            </Typography>
                            <Typography
                                variant="body1`"
                                sx={{
                                    maxWidth: "400px",
                                    width: "100%",
                                    color: theme.palette.text.disabled,
                                }}
                            >
                                A clear statement of the skills, knowledge, or abilities that a learner must demonstrate
                                to earn the badge.
                            </Typography>
                        </Stack>
                        {/* End the Detail paragraph */}

                        {/* Start the Input form field */}
                        <Box sx={{ maxWidth: "100%", width: "100%" }}>
                            <Stack gap={2}>
                                {/* Start First Name */}
                                <FormInput
                                    name="firstName"
                                    label="First Name"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                                {/* Start Last Name */}
                                <FormInput
                                    name="lastName"
                                    label="Last Name"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                            </Stack>
                        </Box>
                        {/* End the Input form field */}
                    </Box>
                </Stack>
                {/* ============ End Personal information Form ============ */}

                {/* Start Button Add Recipient */}
                <Stack alignItems={"end"}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            color: theme.palette.background.default,
                            borderRadius: theme.customShape.btn,
                            fontWeight: theme.fontWeight.bold,
                            mt: 2,
                            maxWidth: 150,
                        }}
                    >
                        Add Badge
                    </Button>
                </Stack>
                {/* End Button Add Recipient */}
            </Stack>
        </DashboardContainer>
    );
};

export default BadgeCreationForm;
