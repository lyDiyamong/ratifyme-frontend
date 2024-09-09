import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Select from "react-select";
import countryList from "react-select-country-list";
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";
import FormInput from "../../components/FormInput";

const AddRecipientForm = () => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            dateOfBirth: null,
            country: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    const options = countryList().getData();

    return (
        <DashboardContainer>
            <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                gap={5}
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
                            display: { md: "flex", xs: "block" },
                            justifyContent: "space-between",
                            gap: 10
                        }}
                    >
                        <Stack gap={1} sx={{ maxWidth: 500, width: "100%", pb: 2 }}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                Personal information
                            </Typography>
                            <Typography variant="body1" color={theme.palette.text.disabled}>
                                A clear statement of the skills, knowledge, or abilities that a learner must demonstrate
                                to earn the badge.
                            </Typography>
                        </Stack>

                        <Box sx={{ maxWidth: "100%", width: "100%" }}>
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
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    sx={{
                                        "& .MuiLocalizationProvider-root": {
                                            borderRadius: "12px",
                                        },
                                        "& .MuiDatePicker-root": {
                                            borderRadius: "12px",
                                        },
                                        "& MuiTextField-root": {
                                            borderRadius: "12px",
                                        },
                                    }}
                                >
                                    <Controller
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

                <Stack>
                    <Box
                        sx={{
                            display: { md: "flex", xs: "block" },
                            gap: 10,
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack gap={1} sx={{ maxWidth: 500, width: "100%", pb: 2 }}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold}>
                                Address Information
                            </Typography>
                            <Typography variant="body1" color={theme.palette.text.disabled}>
                                A clear statement capture essential information about learning and achievements by
                                storing this metadata inside the badge image.
                            </Typography>
                        </Stack>

                        <Box sx={{ maxWidth: "100%", width: "100%" }}>
                            <Stack gap={2}>
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Select
                                            options={options}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={options.find((option) => option.value === value)}
                                            inputRef={ref}
                                            placeholder="Select Country"
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.value}
                                            styles={{
                                                container: (base) => ({
                                                    ...base,
                                                    width: "100%",
                                                }),
                                                control: (base) => ({
                                                    ...base,
                                                    height: "56px",
                                                    borderRadius: theme.customShape.input,
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    zIndex: 2,
                                                }),
                                            }}
                                        />
                                    )}
                                />
                                <FormInput name="cityState" label="City/State" control={control} type="text" />
                                <FormInput name="district" label="District" control={control} type="text" />
                            </Stack>
                        </Box>
                    </Box>
                </Stack>

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
                        Add Recipient
                    </Button>
                </Stack>
            </Stack>
        </DashboardContainer>
    );
};

export default AddRecipientForm;
