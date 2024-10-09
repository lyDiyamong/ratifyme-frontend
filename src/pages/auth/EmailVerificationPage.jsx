import { useState } from "react";
import VerificationInput from "react-verification-input";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useVerifyEmailMutation } from "../../store/api/auth/authApi";
import { useNavigate } from "react-router";
import "../../assets/styles/EmailVerificationPage.css";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import OutletImageComponent from "./OutletImageTemplate";
import theme from "../../assets/themes";
import { Link } from "react-router-dom";
import AlertMessage from "../../components/alert/AlertMessage";
import PageLoading from "../../components/loading/PageLoading";
import useCatchStatus from "../../hooks/useCatchStatus";
import { SpinLoading } from "../../components/loading/SpinLoading";

const EmailVerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [inputKey, setInputKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [verifyEmail, { isLoading, isError, error, isSuccess, data }] = useVerifyEmailMutation();

    // Call custom hook
    const [message, setMessage] = useCatchStatus(isError || isSuccess, isError ? error?.data?.message : data?.message);

    const handleVerify = async (event) => {
        // Prevent default form submission
        event.preventDefault();
        try {
            setLoading(true);
            await verifyEmail({ verifyCode: verificationCode }).unwrap();
            navigate("/login");
        } catch (error) {
            setVerificationCode("");
            setInputKey((prevKey) => prevKey + 1);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageLoading isLoading={isLoading} />
            <Box component="div" sx={{ height: "100vh", display: "flex" }}>
                {message && (
                    <AlertMessage variant="error" onClose={() => setMessage("")}>
                        {message}
                    </AlertMessage>
                )}
                <Box
                    flexGrow={0}
                    display="flex"
                    justifyContent="center"
                    sx={{
                        borderRadius: theme.customShape.section,
                        width: { md: "50%", xs: "100%" },
                        mx: "auto",
                        px: 4,
                        backgroundColor: "transparent",
                    }}
                >
                    <Stack width="100%" maxWidth="450px" gap={2}>
                        <Link to="/">
                            <Box
                                component="img"
                                src={RatifyMELogo}
                                alt="Ratifyme Favicon"
                                sx={{ width: 150, height: 150 }}
                            />
                        </Link>

                        <Box my={3}>
                            <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                                Verify Email
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Please enter the verification code sent to your email address.
                            </Typography>
                        </Box>

                        <form onSubmit={handleVerify}>
                            {" "}
                            {/* Wrap input and button in a form */}
                            <Box>
                                <VerificationInput
                                    key={inputKey}
                                    validChars="0-9"
                                    inputProps={{ inputMode: "numeric" }}
                                    className="custom-verification-input"
                                    placeholder=""
                                    onComplete={(verifyCode) => setVerificationCode(verifyCode)}
                                    length={4}
                                    autoFocus
                                />

                                {/* Verify Button */}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    type="submit" // Set button type to submit
                                    disabled={isLoading || verificationCode.length !== 4}
                                    sx={{
                                        color: theme.palette.customColors.white,
                                        fontWeight: theme.fontWeight.bold,
                                        borderRadius: theme.customShape.btn,
                                        mt: "72px",
                                    }}
                                >
                                    {loading ? <SpinLoading size={24} /> : "Verify"}
                                </Button>
                            </Box>
                        </form>

                        <Typography variant="body2" align="center" color={theme.palette.primary.contrastText} mt={2}>
                            Didn't receive a code?{" "}
                            <Link to="/get-started">
                                <Typography
                                    component="a"
                                    href="#"
                                    variant="body2"
                                    color={theme.palette.primary.main}
                                    fontWeight="bold"
                                    sx={{ textDecoration: "none" }}
                                >
                                    Request again
                                </Typography>
                            </Link>
                        </Typography>
                    </Stack>
                </Box>
                

                <OutletImageComponent />
            </Box>
        </>
    );
};

export default EmailVerificationPage;
