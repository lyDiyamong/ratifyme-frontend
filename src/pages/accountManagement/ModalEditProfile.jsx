// React Library Import
import { useEffect, useState } from "react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import * as yup from "yup";

// MUI Import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

// Custom Imports
import theme from "../../assets/themes/index";
import FormInput from "../../components/FormInput";
import SelectForm from "../../components/SelectionForm";
import { SpinLoading } from "../../components/loading/SpinLoading";
import PhoneNumberForm from "../../components/PhoneNumberForm";
import AlertMessage from "../../components/alert/AlertMessage";

// Fetching Data Import
import { useUpdateUserProfileMutation } from "../../store/api/users/userInfoProfileApi";
import HelperTextForm from "../../components/alert/HelperTextForm";

// Custom Paper Component with Styling
const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

// Validation Schema with Yup
const validationSchema = yup.object({
    firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "First name should contain only letters and no spaces")
        .required("First name is required"),
    lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "Last name should contain only letters and no spaces")
        .required("Last name is required"),
    username: yup.string().matches(/^\S*$/, "Username should not contain spaces").required("Username is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    Gender: yup.string(),
    dateOfBirth: yup
        .date()
        .nullable()
        .typeError("Invalid date")
        .min(new Date(1900, 0, 1), "Year cannot be earlier than 1900")
        .max(new Date(), "Date of birth cannot be in the future"),
    country: yup.string(),
    organization: yup.string(),
    occupation: yup.string(),
});

const EditProfileModal = ({ open, userData, onClose }) => {
    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            dateOfBirth: null,
            country: "",
            firstName: "",
            lastName: "",
            username: "",
            phoneNumber: "",
            organization: "",
            occupation: "",
            email: "",
            Gender: "",
        },
    });

    const { errors } = useFormState({ control });

    const [updateUserProfile, { isLoading, isError }] = useUpdateUserProfileMutation();
    const [isSuccess, setIsSuccess] = useState(false);

    // Populate fields with existing user data on load
    useEffect(() => {
        if (userData) {
            reset({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                username: userData.username || "",
                phoneNumber: userData.phoneNumber || "",
                email: userData.email || "",
                dateOfBirth: userData.dateOfBirth ? dayjs(userData.dateOfBirth) : null,
                Gender: userData.Gender?.id || "",
            });
        }
    }, [userData, open, reset]);

    const onSubmit = async (data) => {
        const updatedData = {
            ...data,
            dateOfBirth: data.dateOfBirth,
            genderId: Number(data.Gender), // Convert gender ID if needed
        };

        try {
            await updateUserProfile({ id: userData.id, data: updatedData }).unwrap();
            setIsSuccess(true);
            onClose();
        } catch (error) {
            console.error("Failed to update profile:", error);
            setIsSuccess(false);
        } finally {
            reset();
        }
    };

    const optionSelect = [
        { value: 1, label: "male" },
        { value: 2, label: "female" },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={CustomPaper}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <DialogTitle sx={{ padding: "20px", fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                Personal Information
            </DialogTitle>
            <DialogContent>
                {isError && (
                    <AlertMessage variant={isSuccess ? "success" : "error"}>
                        {isSuccess ? "Profile updated successfully!" : "Error updating profile. Please try again."}
                    </AlertMessage>
                )}
                <Box
                    sx={{
                        mt: 2,
                        width: { xs: "280px", sm: "420px", md: "500px" },
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                    }}
                    noValidate
                >
                    <FormInput name="firstName" label="First Name" control={control} type="text" required />
                    <FormInput name="lastName" label="Last Name" control={control} type="text" required />
                    <FormInput name="username" label="Username" control={control} type="text" required />
                    <PhoneNumberForm name="phoneNumber" label="Phone Number" control={control} required />
                    <FormInput name="email" label="Email Address" control={control} type="email" disabled={true} />

                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        label="Date of Birth"
                                        openTo="year"
                                        views={["year", "month", "day"]}
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        renderInput={(params) => (
                                            <TextField {...params} {...field} sx={{ width: "100%", borderRadius: "12px" }} />
                                        )}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        {errors.dateOfBirth && <HelperTextForm color={"error"} message={errors.dateOfBirth.message} />}
                    </Box>

                    <SelectForm control={control} name="Gender" label="Gender" options={optionSelect} required={false} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ pb: "20px", pr: "20px" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ color: theme.palette.customColors.white, borderRadius: theme.customShape.btn }}
                >
                    {isLoading ? <SpinLoading size={20} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;
