// MUI import
import { Stack } from "@mui/material";

// Custom import
import DateSelectionForm from "../../../components/DateSelectionForm";

const EditOptionalElements = ({ control, errors }) => {
    return (
        <Stack
            sx={{
                gap: 2,
            }}
        >
            <Stack gap={3}>
                {/* End Date */}
                {/* <DateSelectionForm control={control} name="endDate" label="End Date" errors={errors} /> */}
            </Stack>
        </Stack>
    );
};

export default EditOptionalElements;
