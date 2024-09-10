// React import
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

// MUI import
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Import calendar icon

// Custom import
import theme from "../../assets/themes";
import DashboardContainer from "../../components/styles/DashboardContainer";
import FormInput from "../../components/FormInput";
import SelectForm from "../../components/SelectionForm";

const AddRecipientForm = () => {
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

    // Start options function of country select library
    const options = countryList().getData();

    // Data static of the gender select
    const optionSelect = [
        { value: "M", label: "Male" },
        { value: "F", label: "Female" },
    ];

    return (
        // ============ Start Add Recipient Form container ============
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
                    mb: 3,
                }}
            >
                {/* ============ Start Personal information Form ============ */}
                <Stack>
                    <Box
                        sx={{
                            display: { md: "flex", xs: "block" },
                            justifyContent: "space-between",
                            gap: 10,
                        }}
                    >
                        {/* Start the Detail paragraph */}
                        <Stack gap={1} sx={{ maxWidth: 500, width: "100%", pb: 2 }}>
                            <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                Personal information
                            </Typography>
                            <Typography variant="body1" color={theme.palette.text.disabled}>
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

                                {/* Start Selection DOB */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="dateOfBirth"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Date of Birth"
                                                openTo="year"
                                                views={["year", "month", "day"]}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        {...field}
                                                        sx={{
                                                            width: "100%", // Ensure the width is full
                                                            maxWidth: "100%", // Limit the maximum width
                                                            borderRadius: "12px", // Apply border-radius
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "12px", // Ensure border-radius is applied
                                                            },
                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                borderRadius: "12px", // Apply radius to the outline
                                                            },
                                                        }}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "content",
                                        gap: 2,
                                    }}
                                >
                                    {/* Start selection gender */}
                                    <SelectForm
                                        control={control}
                                        name="value"
                                        label="Gender"
                                        options={optionSelect}
                                        required
                                    />
                                    {/* Start Phonet */}
                                    <FormInput
                                        name="phone"
                                        label="Phone"
                                        control={control}
                                        type="tel"
                                        required={false}
                                    />
                                    {/* Start Email */}
                                </Box>

                                <FormInput name="email" label="Email" control={control} type="email" required={true} />
                                {/* Start Organization */}
                                <FormInput
                                    name="organization"
                                    label="Organization"
                                    control={control}
                                    type="text"
                                    required={false}
                                />
                                {/* Start Position */}
                                <FormInput
                                    name="position"
                                    label="Position"
                                    control={control}
                                    type="text"
                                    required={false}
                                />
                            </Stack>
                        </Box>
                        {/* End the Input form field */}
                    </Box>
                </Stack>
                {/* ============ End Personal information Form ============ */}

                {/* ============ Start Address information Form ============ */}
                <Stack>
                    <Box
                        sx={{
                            display: { md: "flex", xs: "block" },
                            gap: 10,
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Start the Detail paragraph */}
                        <Stack gap={1} sx={{ maxWidth: 500, width: "100%", pb: 2 }}>
                            <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                Address Information
                            </Typography>
                            <Typography variant="body1" color={theme.palette.text.disabled}>
                                A clear statement capture essential information about learning and achievements by
                                storing this metadata inside the badge image.
                            </Typography>
                        </Stack>
                        {/* End the Detail paragraph */}

                        {/* Start the Input form field */}
                        <Box sx={{ maxWidth: "100%", width: "100%" }}>
                            <Stack gap={2}>
                                {/* Start Selection Country */}
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
                                {/* Start City/State */}
                                <FormInput name="cityState" label="City/State" control={control} type="text" />
                                {/* Start District */}
                                <FormInput name="district" label="District" control={control} type="text" />
                            </Stack>
                        </Box>
                        {/* End the Input form field */}
                    </Box>
                </Stack>
                {/* ============ End Address information Form ============ */}

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
                        Add Recipient
                    </Button>
                </Stack>
                {/* End Button Add Recipient */}
            </Stack>
        </DashboardContainer>
        // ============ End Add Recipient Form container ============
    );
};

export default AddRecipientForm;
