import { Stack } from "@mui/material";
import FormInput from "../FormInput";
import PhoneNumberForm from "../PhoneNumberForm";

const InstitutionInfoFields = ({ control, schema }) => {
    return (
        <Stack gap={2}>
            <FormInput name="institutionName" label="Institution Name" control={control} required />

            <FormInput
                name="institutionEmail"
                label="Institution Email"
                control={control}
                required
                schema={schema?.fields.institutionEmail}
            />

            <PhoneNumberForm name="institutionPhoneNumber" label="Institution Phone Number" control={control} required />

            <FormInput name="institutionWebsiteUrl" label="Website URL" control={control} schema={schema?.fields.url} />
        </Stack>
    );
};

export default InstitutionInfoFields;
