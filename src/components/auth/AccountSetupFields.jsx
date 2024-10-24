// MUI Import 
import { Box, Stack, Typography } from "@mui/material";

// Custom Import
import FormInput from "../FormInput";
import PhoneNumberForm from "../PhoneNumberForm";
import theme from "../../assets/themes";

// =========== Start AccountSetupFields ===========
const AccountSetupFields = ({ control, role, guest, schema, errors, watch }) => {
    return (
        <Stack gap={2}>
            <Box component="div">
                <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} fontSize="20px">
                    Account Setup
                </Typography>
                <Typography sx={{ fontSize: theme.typography.body1, color: theme.palette.customColors.gray500, mb: 2 }}>
                    Set up your account by providing your username, email address, and phone number. This information will help
                    personalize your experience and ensure secure communication with us.
                </Typography>
            </Box>

            <FormInput
                name="email"
                label="Email"
                control={control}
                required
                disabled={role !== "institution"}
                defaultValue={guest?.inviteEmail || ""}
                schema={schema?.fields.email}
            />
            <FormInput name="username" label="Username" control={control} required schema={schema?.fields.username} />

            <PhoneNumberForm name="phoneNumber" label="Phone Number" control={control} required />
        </Stack>
    );
};

export default AccountSetupFields;
// =========== End AccountSetupFields ===========