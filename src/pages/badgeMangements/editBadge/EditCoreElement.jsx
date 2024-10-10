import { useEffect, useState } from "react";
import { CameraAltRounded } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";
import { Box } from "@mui/system";
import FormInput from "../../../components/FormInput";
import MultiSelectForm from "../../../components/MultiSelectionForm";
import { useFetchAchievementTypeQuery } from "../../../store/api/achievements/achievementTypeApi";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const EditCoreElement = ({ bagdeData, control, reset }) => {
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
