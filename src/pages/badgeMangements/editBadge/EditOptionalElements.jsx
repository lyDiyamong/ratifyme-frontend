import { Stack, Typography } from "@mui/material";
import theme from "../../../assets/themes";
import DateSelectionForm from "../../../components/DateSelectionForm";

const EditOptionalElements = ({ control, errors }) => {
    return (
        <Stack
            sx={{
                gap: 2,
            }}
        >
            {/* <Stack>
                <Typography variant="h4" color="primary" fontWeight={theme.fontWeight.bold}>Optional Element</Typography>
                <Typography variant="body1" color="gray">This information related to Optional Element.</Typography>
            </Stack> */}
            <Stack gap={3}>
                {/* Expiration Date */}
                <DateSelectionForm control={control} name="expiredDate" label="Expiration Date" errors={errors} />
            </Stack>
        </Stack>
    );
};

export default EditOptionalElements;
