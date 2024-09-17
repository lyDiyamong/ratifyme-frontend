// React Imports
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

// MUI Imports
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
import FormInput from "../../../components/FormInput";
import SelectForm from "../../../components/SelectionForm";
import { useUpdateUserProfileMutation } from "../../../store/api/users/userInfoProfileApi";
import theme from "../../../assets/themes/index";
import { SpinLoading } from "../../../components/loading/SpinLoading";

const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

const EditProfileModal = ({ open, userData, onClose }) => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            dateOfBirth: null,
            country: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            organization: "",
            occupation: "",
            email: "",
            Gender: "",
        },
    });

    const [updateUserProfile, { isLoading, isError }] = useUpdateUserProfileMutation();

    useEffect(() => {
        if (userData) {
            reset({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                phoneNumber: userData.phoneNumber || "",
                email: userData.email || "",
                dateOfBirth: userData.dateOfBirth || null,
                nationality: userData.nationality || "",
                Gender: userData.Gender.id || "",
            });
        }
    }, [userData, open, reset]);

    const onSubmit = async (data) => {
        console.log("Date of Birth:", data.dateOfBirth);
        const updatedData = {
            ...data,
            dateOfBirth: data.dateOfBirth,
            genderId: Number(data.Gender),
        };

        try {
            await updateUserProfile({ id: userData.id, data: updatedData }).unwrap();
            onClose();
        } catch (error) {
            console.error("Failed to update profile: ", error);
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
                {/* {isLoading && <SpinLoading size={40} />} */}
                {isError && <p style={{ color: "red" }}>Error updating profile. Please try again.</p>}
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
                    <FormInput name="phoneNumber" label="Phone Number" control={control} type="text" />
                    <FormInput name="email" label="Email Address" control={control} type="email" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Date of Birth"
                                    openTo="year"
                                    views={["year", "month", "day"]}
                                    onChange={(newValue) => {
                                        field.onChange(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            {...field}
                                            sx={{
                                                width: "100%",
                                                borderRadius: "12px",
                                            }}
                                        />
                                    )}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <SelectForm
                        control={control}
                        name="Gender"
                        label="Gender"
                        options={optionSelect}
                        required={false}
                    />
                    <FormInput name="nationality" label="Nationality" control={control} type="text" />
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
