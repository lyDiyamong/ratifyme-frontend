// MUI import
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import MultiSelectForm from "../../components/MultiSelectionForm";
import FormInput from "../../components/FormInput";
import { useFetchAchievementTypeQuery } from "../../store/api/achievements/achievementTypeApi";

const CoreElementStep = ({ control }) => {
    // Data static of the earning criteria select
    const { data: achievementType } = useFetchAchievementTypeQuery();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2}>
                {/* Issuer */}
                <FormInput
                    name="issuer"
                    label="Issuer*"
                    control={control}
                    type="text"
                    required={false}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />

                {/* Criteria */}
                <FormInput name="narrative" label="Criteria" control={control} type="text" required={false} />

                {/* Earning Criteria */}
                <MultiSelectForm
                    name="AchievementTypes"
                    label="Achievement Types"
                    options={achievementType?.data || []}
                    control={control}
                    required={false}
                />

                {/* Duration */}
                {/* <FormInput name="duration" label="Duration" control={control} type="text" required={false} /> */}
            </Stack>
        </LocalizationProvider>
    );
};

export default CoreElementStep;
