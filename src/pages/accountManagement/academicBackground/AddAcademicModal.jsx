import { Dialog, DialogTitle, DialogContent, Button, Typography, Divider, Avatar, TextField } from "@mui/material";
import FormInput from "../../../components/FormInput";
import { Controller, useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { Box, Stack } from "@mui/system";
import theme from "../../../assets/themes";
import AcademicBgSvg from "../../../assets/icons/AcademicBgSvg.svg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import SelectForm from "../../../components/SelectionForm";
import {
    useFetchAcademicLevelsQuery,
    useFetchFieldOfStudiesQuery,
} from "../../../store/api/earnerManagement/fieldOfStudyApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCreateAcademicBackgroundMutation } from "../../../store/api/earnerManagement/earnerApis";
import dayjs from "dayjs";

const AddAcademicModal = ({ open, onClose, onSubmit, userId }) => {
    const { control, handleSubmit, reset } = useForm();
    const [createAcademicBackground] = useCreateAcademicBackgroundMutation();
    const { data: fieldOfStudiesData, error: fieldOfStudiesError, isLoading } = useFetchFieldOfStudiesQuery();
    const { data: fetchAcademicLevelsData } = useFetchAcademicLevelsQuery();

    const onSubmitForm = async (data) => {
        const formattedData = {
            ...data,
            academicYear: data.academicYear ? dayjs(data.academicYear).format("YYYY-MM-DD") : null,
        };

        try {
            await createAcademicBackground({
                userId,
                ...formattedData,
            }).unwrap();
            reset();
            onClose();
        } catch (error) {
            console.error("Failed to update", error.response?.data || error.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} noValidate component="form" onSubmit={handleSubmit(onSubmitForm)}>
            <DialogTitle>
                <Stack flexDirection="column" alignItems="center">
                    <Avatar
                        src={AcademicBgSvg}
                        sx={{
                            width: 56,
                            height: 56,
                        }}
                    />

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: theme.fontWeight.bold,
                            color: theme.palette.text.primary,
                            lineHeight: 1.8,
                            textAlign: "center",
                        }}
                    >
                        Academic Background
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.text.secondary,
                            textAlign: "center",
                        }}
                    >
                        Create your educational journey.
                    </Typography>
                </Stack>
            </DialogTitle>

            <Divider sx={{ my: 1, backgroundColor: theme.palette.text.contrastText }} />

            {/* <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                        width: { xs: "280px", sm: "420px", md: "500px" },
                    }}
                    noValidate
                >
                    <FormInput name="academicLevel" label="Academic Level" control={control} type="text" required />
                    <DateSelectionForm control={control} name="academicYear" label="Academic Year" />
                    <FormInput name="fieldOfStudy" label="Field of Study" control={control} type="text" required />
                    <FormInput name="description" label="Description" control={control} type="text" required />
                </Box>
            </DialogContent> */}

            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "16px",
                        width: { xs: "280px", sm: "420px", md: "500px" },
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name="academicYear"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Academic Year"
                                    value={field.value || null}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        />
                    </LocalizationProvider>

                    <SelectForm
                        name="academicLevelId"
                        control={control}
                        options={fetchAcademicLevelsData?.data?.map((level) => ({
                            id: level.id,
                            value: level.id,
                            label: level.name,
                        }))}
                        label="Academic Level"
                        required
                    />

                    <SelectForm
                        name="fieldOfStudyId"
                        control={control}
                        options={fieldOfStudiesData?.data?.map((study) => ({
                            id: study.id,
                            value: study.id,
                            label: study.name,
                        }))}
                        label="Field of Study"
                        required
                    />
                </Box>
            </DialogContent>

            <Stack sx={{ flexDirection: "row", justifyContent: "end", m: 2, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderColor: theme.palette.customColors.gray200,
                        color: theme.palette.text.primary,
                        width: "100%",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ color: theme.palette.customColors.white, width: "100%" }}
                >
                    Create
                </Button>
            </Stack>
        </Dialog>
    );
};

export default AddAcademicModal;
