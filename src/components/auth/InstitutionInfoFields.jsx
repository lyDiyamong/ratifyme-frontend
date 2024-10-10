import { Stack, Typography } from "@mui/material";
import FormInput from "../FormInput";
import PhoneNumberForm from "../PhoneNumberForm";
import theme from "../../assets/themes";

const InstitutionInfoFields = ({ control, schema }) => {
    return (
        <Stack gap={2}>
            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} fontSize="24px" mb={1}>
                Institution Information
            </Typography>
            <Typography sx={{ fontSize: theme.typography.body1, color: theme.palette.customColors.gray500, mb: 1 }}>
                Share information about your affiliated institution, including its name, email, phone number and website, for institutional
                verification.
            </Typography>

            <FormInput name="institutionName" label="Institution Name" control={control} required />

            <FormInput
                name="institutionEmail"
                label="Institution Email"
                control={control}
                required
                schema={schema?.fields.institutionEmail}
            />

            <PhoneNumberForm
                name="institutionPhoneNumber"
                label="Institution Phone Number"
                control={control}
                required
            />

            <FormInput name="institutionWebsiteUrl" label="Website URL" control={control} schema={schema?.fields.url} />
        </Stack>
    );
};

export default InstitutionInfoFields;
