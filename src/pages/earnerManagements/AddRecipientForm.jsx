import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";

const AddRecipientForm = () => {

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            dateOfBirth: null,
        },
    });

    const onSubmit = (data) => {
        console.log(data); // Handle form submission logic here
        reset(); // Reset the form after submission
    };

    return (
        <DashboardContainer>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                    background: theme.palette.customColors.white,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: 3,
                }}
            >
                <Stack>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack gap={1} sx={{ maxWidth: 500, width: "100%", pr: 2 }}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                Personal information
                            </Typography>
                            <Typography variant="body1" color={theme.palette.text.disabled}>
                                A clear statement of the skills, knowledge, or abilities that a learner must demonstrate
                                to earn the badge.
                            </Typography>
                        </Stack>

                        <Box sx={{ maxWidth: 600, width: "100%" }}>
                            <Stack gap={2}>
                                <FormInput
                                    name="firstName"
                                    label="First Name"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                                <FormInput
                                    name="lastName"
                                    label="Last Name"
                                    control={control}
                                    type="text"
                                    required={true}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{
                                            '& .MuiLocalizationProvider-root': {
                                                borderRadius: "12px",
                                            },
                                            '& .MuiDatePicker-root': {
                                                borderRadius: "12px",
                                            },
                                            '& MuiTextField-root': {
                                                borderRadius: "12px",
                                            },
                                        }}>
                                    <Controller
                                        sx={{
                                            '& .MuiLocalizationProvider-root': {
                                                borderRadius: "12px",
                                            },
                                            
                                        }}
                                        name="dateOfBirth"
                                        control={control}
                                        render={({ field: { ref, ...rest } }) => (
                                            <DatePicker
                                                label="Date of Birth"
                                                openTo="year"
                                                views={["year", "month", "day"]}
                                                renderInput={(params) => <TextField {...params} />}
                                                {...rest}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <FormInput name="phone" label="Phone" control={control} type="tel" required={false} />
                                <FormInput name="email" label="Email" control={control} type="email" required={true} />
                                <FormInput
                                    name="organization"
                                    label="Organization"
                                    control={control}
                                    type="text"
                                    required={false}
                                />
                                <FormInput
                                    name="position"
                                    label="Position"
                                    control={control}
                                    type="text"
                                    required={false}
                                />
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        color: theme.palette.background.default,
                        borderRadius: theme.customShape.btn,
                        fontWeight: theme.fontWeight.bold,
                        mt: 2, // added margin top for spacing
                    }}
                >
                    Add Recipient
                </Button>
            </Box>
        </DashboardContainer>
    );
};

export default AddRecipientForm;
