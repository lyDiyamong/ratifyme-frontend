import { Stack } from "@mui/material";
import theme from "../../../assets/themes";
import FormInput from "../../../components/FormInput";
import MultiSelectForm from "../../../components/MultiSelectionForm";
import { useFetchAchievementTypeQuery } from "../../../store/api/achievements/achievementTypeApi";

const EditCoreElement = ({ control }) => {
    const { data: achievementType } = useFetchAchievementTypeQuery();

    return (
        <Stack
            sx={{
                my: 3,
                p: 3,
                backgroundColor: theme.palette.customColors.white,
                borderRadius: theme.customShape.section,
                boxShadow: theme.customShadows.default,
                gap: 3,
            }}
        >
            <Stack gap={3} alignItems="center">
                <FormInput name="narrative" label="Criteria" control={control} type="text" required={false} />
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
