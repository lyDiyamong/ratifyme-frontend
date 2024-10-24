// MUI import
import { Box, Stack, Typography } from "@mui/material";

// Custom import
import PasswordFields from "./PasswordFields";
import { passwordSchema } from "../../utils/auth/passwordUtils";
import theme from "../../assets/themes";

// =========== Start PasswordSetupFields ===========
const PasswordSetupFields = ({ control, role, guest, schema, errors, watch }) => {
    return (
        <Stack gap={2}>
            <Box component="div">
                <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} fontSize="20px">
                    Password Setup
                </Typography>
                <Typography sx={{ fontSize: theme.typography.body1, color: theme.palette.customColors.gray500, mb: 2 }}>
                    To complete your account setup, please create a secure password and confirm it. This will help protect your
                    account and personal information.
                </Typography>
            </Box>
            <PasswordFields
                control={control}
                errors={errors}
                watch={watch}
                schema={passwordSchema}
                pwdLabelName="Password"
                confirmPwdLableName="Confirm Password"
            />
        </Stack>
    );
};

export default PasswordSetupFields;
// =========== End PasswordSetupFields ===========