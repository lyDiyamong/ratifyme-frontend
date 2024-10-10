import { Stack } from "@mui/material";
import theme from "../../../assets/themes";
import DateSelectionForm from "../../../components/DateSelectionForm";

const EditOptionalElements = ({ control }) => {
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
            <Stack gap={3}>
                {/* Expiration Date */}
                <DateSelectionForm control={control} name="expiredDate" label="Expiration Date" required />
            </Stack>
        </Stack>
    );
};

export default EditOptionalElements;
