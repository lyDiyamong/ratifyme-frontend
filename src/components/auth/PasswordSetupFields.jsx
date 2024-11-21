// MUI import
import { Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";

// Custom import
import PasswordFields from "./PasswordFields";
import theme from "../../assets/themes";
import { passwordSchema } from "../../utils/auth/passwordUtils";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";

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
            {/* <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                    <Typography variant="body2">
                        I agree with the{" "}
                        <Link to="/termsOfUse" target="_blank">
                            Terms of Use
                        </Link>
                    </Typography>
                }
            /> */}

            <Controller
                name="termsOfUse"
                control={control}
                rules={{ required: "You must agree to the Terms of Use." }} // Adding validation if needed
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} />}
                        label={
                            <>
                                I agree to the{" "}
                                <Link to="/termsOfUse" target="_blank" rel="noopener noreferrer">
                                    Terms of Use
                                </Link>
                            </>
                        }
                    />
                )}
            />
        </Stack>
    );
};

export default PasswordSetupFields;
