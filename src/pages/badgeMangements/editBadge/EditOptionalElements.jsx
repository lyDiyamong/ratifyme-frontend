// MUI import
import { Stack } from "@mui/material";

// Custom import
import DateSelectionForm from "../../../components/DateSelectionForm";
import FormInput from "../../../components/FormInput";

const EditOptionalElements = ({ control, errors }) => {
    return (
        <Stack
            sx={{
                gap: 2,
            }}
        >
            <Stack gap={3}>
                {/* End Date */}
                <DateSelectionForm control={control} name="endDate" label="End Date" errors={errors} />
                <FormInput
                    label="Addition Link"
                    name="additionLink"
                    control={control}
                    type="text"
                    required={false}
                />
            </Stack>
        </Stack>
    );
};

export default EditOptionalElements;
