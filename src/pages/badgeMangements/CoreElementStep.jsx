import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import MultiSelectForm from "../../components/MultiSelectionForm";
import FormInput from "../../components/FormInput";
import { useFetchAchievementTypeQuery } from "../../store/api/achievements/achievementTypeApi";
import { Box } from "@mui/system";

const CoreElementStep = ({ control, schema, errors }) => {
    // Fetch achievement types data
    const { data: achievementType } = useFetchAchievementTypeQuery();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Issuer */}
                <FormInput disabled name="issuer" label="Issuer*" control={control} type="text" required={true} />

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
                    {/* Achievement Types */}
                    <MultiSelectForm
                        name="AchievementTypes" // Use the same field name consistently
                        label="Achievement Types"
                        options={achievementType?.data || []}
                        control={control}
                        required={true}
                        schema={schema?.fields.achievementType} // Use the same name in validation schema
                    />
                    {errors.achievementType && (
                        <Typography sx={{ mx: "12px", fontSize: "12px", mt: "3px" }} color="error">
                            {errors.achievementType.message}
                        </Typography>
                    )}
                </Box>
            </Stack>
        </LocalizationProvider>
    );
};

export default CoreElementStep;
