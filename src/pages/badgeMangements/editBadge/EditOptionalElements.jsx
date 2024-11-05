// MUI import
import { Stack, Box } from "@mui/material";

// Custom import
import DateSelectionForm from "../../../components/DateSelectionForm";
import FormInput from "../../../components/FormInput";
import HelperTextForm from "../../../components/alert/HelperTextForm";

const EditOptionalElements = ({ control, errors }) => {
    return (
        <Stack
            sx={{
                gap: 2,
            }}
        >
            <Stack gap={3}>
                <FormInput
                    label="Addition Link"
                    name="additionLink"
                    control={control}
                    type="text"
                    required={false}
                />
                <DateSelectionForm control={control} name="expiredDate" label="Expire Date" errors={errors} />
                {errors.expiredDate && <HelperTextForm color={"error"} message={errors?.expiredDate?.message} />}
            </Stack>
        </Stack>
    );
};

export default EditOptionalElements;
