import { Stack } from "@mui/material";
import FormInput from "../FormInput";
import PhoneNumberForm from "../PhoneNumberForm";

const InstitutionInfoFields = ({ control, schema }) => {
    return (
        <Stack gap={2}>
            <FormInput name="institutionName" label="Name" control={control} required />

            <FormInput
                name="institutionEmail"
                label="Email Address"
                control={control}
                required
                schema={schema?.fields.institutionEmail}
            />

            <PhoneNumberForm name="institutionPhoneNumber" label="Phone Number" control={control} required />

            <FormInput name="institutionWebsiteUrl" label="Website" control={control} schema={schema?.fields.url} />
        </Stack>
    );
};

export default InstitutionInfoFields;
