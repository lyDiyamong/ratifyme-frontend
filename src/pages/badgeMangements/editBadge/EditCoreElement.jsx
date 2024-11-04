// MUI import
import { Stack } from "@mui/material";

// Custom import
import FormInput from "../../../components/FormInput";
import MultiSelectForm from "../../../components/MultiSelectionForm";

// Api import
import { useFetchAchievementTypeQuery } from "../../../store/api/achievements/achievementTypeApi";

const EditCoreElement = ({ control, schema }) => {
    const { data: achievementType } = useFetchAchievementTypeQuery();

    return (
        <Stack
            sx={{
                gap: 2,
            }}
        >
            <Stack
                gap={3}
                alignItems="center"
                sx={{
                    flexDirection: "row",
                    "@media (max-width: 1500px)": {
                        // Media query for 1500px and below
                        flexDirection: "column",
                    },
                }}
            >
                <FormInput
                    name="narrative"
                    label="Criteria"
                    control={control}
                    type="text"
                    required={false}
                    schema={schema.fields.narrative}
                />
                <MultiSelectForm
                    name="AchievementTypes"
                    label="Achievement Types"
                    options={achievementType?.data || []}
                    control={control}
                    required={false}
                />
            </Stack>
        </Stack>
    );
};

export default EditCoreElement;
