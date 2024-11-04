// MUI import
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/system";

// Custom import
import MultiSelectForm from "../../components/MultiSelectionForm";
import FormInput from "../../components/FormInput";

// API import
import { useFetchAchievementTypeQuery } from "../../store/api/achievements/achievementTypeApi";

const CoreElementStep = ({ control, schema, errors }) => {
    // Fetch achievement types data
    const { data: achievementType } = useFetchAchievementTypeQuery();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Issuer */}
                <FormInput disabled name="issuer" label="Issuer" control={control} type="text" required={true} />

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
                        schema={schema?.fields.AchievementTypes} // Use the same name in validation schema
                    />
                </Box>
            </Stack>
        </LocalizationProvider>
    );
};

export default CoreElementStep;
