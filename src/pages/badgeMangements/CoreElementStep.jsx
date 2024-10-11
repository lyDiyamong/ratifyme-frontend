// MUI import
import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import MultiSelectForm from "../../components/MultiSelectionForm";
import FormInput from "../../components/FormInput";
import { useFetchAchievementTypeQuery } from "../../store/api/achievements/achievementTypeApi";
import { Box } from "@mui/system";

const CoreElementStep = ({ control, schema, errors }) => {
    // Data static of the earning criteria select
    const { data: achievementType } = useFetchAchievementTypeQuery();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Issuer */}
                <FormInput
                    disabled
                    name="issuer"
                    label="Issuer*"
                    control={control}
                    type="text"
                    required={true}
                    //
                />

                {/* Criteria */}
                <FormInput
                    name="narrative"
                    label="Criteria"
                    control={control}
                    type="text"
                    required={true}
                    schema={schema?.fields.narrative}
                />
                <Box>
                    {/* Earning Criteria */}
                    <MultiSelectForm
                        name="AchievementTypes"
                        label="Achievement Types"
                        options={achievementType?.data || []}
                        control={control}
                        required={true}
                        schema={schema?.fields.achievementType}
                    />
                    {errors.achievementType && (
                        <Typography sx={{ mx: "12px", fontSize: "12px", mt: "3px" }} color="error">
                            {errors.achievementType.message}
                        </Typography>
                    )}
                </Box>

                {/* Duration */}
                {/* <FormInput name="duration" label="Duration" control={control} type="text" required={false} /> */}
            </Stack>
        </LocalizationProvider>
    );
};

export default CoreElementStep;
