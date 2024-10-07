import { Grid } from "@mui/material";
import FormInput from "../FormInput";
import PhoneNumberForm from "../PhoneNumberForm";

const InstitutionInfoFields = ({ control, schema }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xss={12} sm={12}>
                <FormInput name="institutionName" label="Name" control={control} required />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput
                    name="institutionEmail"
                    label="Email Address"
                    control={control}
                    required
                    schema={schema?.fields.institutionEmail}
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <PhoneNumberForm
                    name="institutionPhoneNumber"
                    label="Phone Number"
                    control={control}
                    required
                />
            </Grid>
            <Grid item xss={12} sm={12}>
                <FormInput name="institutionWebsiteUrl" label="Website" control={control} schema={schema?.fields.url} />
            </Grid>
        </Grid>
    );
};

export default InstitutionInfoFields;
