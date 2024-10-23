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
            {/* <Stack>
                <Typography variant="h4" color="primary" fontWeight={theme.fontWeight.bold} >
                    Core Element
                </Typography>
                <Typography variant="body1" color="gray">
                    This information related to Core Element.
                </Typography>
            </Stack> */}
            <Stack gap={3} alignItems="center" flexDirection={{ sm: "row", xss: "column" }}>
                <FormInput name="narrative" label="Criteria" control={control} type="text" required={false} schema={schema.fields.narrative} />
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
