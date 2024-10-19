import { Dialog, DialogTitle, DialogContent, Button, Typography, Divider, Avatar, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useUpdateAcademicBackgroundByIdMutation } from "../../../store/api/earnerManagement/earnerApis";
import theme from "../../../assets/themes";
import EditAcademicBgSvg from "../../../assets/icons/EditAcademicBgSvg.svg";
import FormInput from "../../../components/FormInput";
import {
    useFetchAcademicLevelsQuery,
    useFetchFieldOfStudiesQuery,
} from "../../../store/api/earnerManagement/fieldOfStudyApi";
import SelectForm from "../../../components/SelectionForm";

const EditAcademicModal = ({ open, onClose, initialData, userId }) => {
    const [updateAcademicBackgroundById] = useUpdateAcademicBackgroundByIdMutation();
    const { data: fieldOfStudiesData, error: fieldOfStudiesError, isLoading } = useFetchFieldOfStudiesQuery();
    const { data: fetchAcademicLevelsData } = useFetchAcademicLevelsQuery();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            academicYear: null,
            fieldOfStudy: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                academicYear: initialData.academicYear ? dayjs(initialData.academicYear) : null,
            });
        }
    }, [initialData, reset]);

    // Fetch field of studies data
    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else if (fieldOfStudiesError) {
            setError(fieldOfStudiesError);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [isLoading, fieldOfStudiesError]);

    const onSubmitForm = async (data) => {
        const formattedData = {
            ...data,
            academicYear: data.academicYear ? dayjs(data.academicYear).format("YYYY-MM-DD") : null,
        };

        // if (!userId) {
        //     console.error("User ID is undefined");
        //     return;
        // }

        try {
            console.log("Submitting Data:", { userId, ...formattedData });
            const result = await updateAcademicBackgroundById({
                id: userId,
                ...formattedData,
            }).unwrap();
            console.log("Mutation Result:", result);
            reset();
            onClose();
        } catch (error) {
            console.error("Failed to update", error.response?.data || error.message);
        }
    };

    // Conditional rendering based on loading and error state
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading field of studies.</div>;

    return (
        <Dialog open={open} onClose={onClose} component="form" onSubmit={handleSubmit(onSubmitForm)}>
            <DialogTitle>
                <Stack flexDirection="column" alignItems="center">
                    <Avatar src={EditAcademicBgSvg} sx={{ width: 56, height: 56 }} />
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: theme.fontWeight.bold,
                            color: theme.palette.text.primary,
                            lineHeight: 1.8,
                            textAlign: "center",
                        }}
                    >
                        Update Academic Background
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.text.secondary,
                            textAlign: "center",
                        }}
                    >
                        Update your educational journey.
                    </Typography>
                </Stack>
            </DialogTitle>

            <Divider sx={{ my: 1, backgroundColor: theme.palette.text.contrastText }} />

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
                        name="academicLevel"
                        control={control}
                        options={fetchAcademicLevelsData?.data?.map((level) => ({
                            id: level.id,
                            value: level.id,
                            label: level.name,
                        }))}
                        label="Academic Level"
                    />

                    <SelectForm
                        name="FieldOfStudy"
                        control={control}
                        options={fieldOfStudiesData?.data?.map((study) => ({
                            id: study.id,
                            value: study.id,
                            label: study.name,
                        }))}
                        label="Field of Study"
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
                    sx={{
                        color: theme.palette.customColors.white,
                        width: "100%",
                    }}
                >
                    Save
                </Button>
            </Stack>
        </Dialog>
    );
};

export default EditAcademicModal;
