import { Grid } from "@mui/material";
import FormInput from "../FormInput";

const InstitutionInfoFields = ({ control, schema }) => {
    return (
        <Grid container spacing={2}>
            {/* <Typography>Institution Information</Typography> */}
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
                <FormInput
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
