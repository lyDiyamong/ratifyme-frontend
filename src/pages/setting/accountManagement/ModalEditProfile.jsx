//React Import
import { useForm, Controller } from "react-hook-form";
//MUI Import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
//Custom Import
import FormInput from "../../../components/FormInput";
import SelectForm from "../../../components/SelectionForm";
import theme from "../../../assets/themes/index";


const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

//============ Start Modal Popup Component ============
const EditProfileModal = ({ open, onClose }) => {
    
    // React-hook-form function
    const { handleSubmit, control, reset } = useForm({
        //  Set to default
        defaultValues: {
            dateOfBirth: null,
            country: "",
        },
    });
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    //Ocupation Data
    const optionOcupation = [
        { value: "student", label: "Student" },
        { value: "employee", label: "Employee" },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={CustomPaper}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <DialogTitle sx={{ padding: "20px", fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                Edit Your Profile
            </DialogTitle>
            <DialogContent>
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
                    {/*Input Form First Name */}
                    <FormInput name="firstName" label="First Name" control={control} type="text" required />

                    {/*Input Form Last Name */}
                    <FormInput name="lastName" label="Last Name" control={control} type="text" required />

                    {/*Selection Input Form Occupation */}
                    <SelectForm
                        name="occupation"
                        label="Occupation"
                        options={optionOcupation}
                        control={control}
                        required={false}
                    />

                    {/*Input Form Phone Number */}
                    <FormInput name="phoneNumber" label="Phone Number" control={control} type="text" required />

                    {/*Selection Date Input Birth Date */}
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
                                                width: "100%", 
                                                maxWidth: "100%",
                                                borderRadius: "12px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "12px",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderRadius: "12px", 
                                                },
                                            }}
                                        />
                                    )}
                                />
                            )}
                        />
                    </LocalizationProvider>

                    {/*Input Form Email Address */}
                    <FormInput name="email" label="Email Address" control={control} type="email" required />

                    {/*Input Form Country */}
                    <FormInput name="country" label="Country" control={control} type="text" required />

                    {/*Input Form Organization */}
                    <FormInput name="organization" label="Organization" control={control} type="text" required />
                </Box>
            </DialogContent>

            {/*Button Container*/}
            <DialogActions sx={{ pb: "30px", pr: "30px" }}>
                {/* Cancel Button*/}
                <Button
                    onClick={onClose}
                    sx={{
                        color: theme.palette.primary.dark,
                        borderRadius: theme.customShape.btn,
                        textTransform: "none",
                    }}
                >
                    Cancel
                </Button>

                {/* Save Button*/}
                <Button
                    type="submit"
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        color: theme.palette.customColors.white,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: theme.customShape.btn,
                        textTransform: "none",
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
//============ End Modal Popup Component ============

export default EditProfileModal;
