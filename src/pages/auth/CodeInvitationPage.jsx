// React library import
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

// MUI import
import { Box, Grid, Typography, Button } from "@mui/material";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import LoginImgSvg from "../../assets/images/Login-illu.svg";
import { useEffect, useState } from "react";

const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

const CodeInvitationPage = () => {
    const { search } = useLocation();
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
    }, [search]);

    // Form controller
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    // Submit handler
    const onSubmit = async (data) => {
        try {
            navigate('/signup')
        } catch (error) {
            console.error("Error during sign in:", error.message || error); // Improved error handling
        }
    };

    return (
        // ============ Start login container ============
        <LandingContainer sx={{ my: 6 }}>
            {/* Start grid container */}
            <Grid container spacing={4}>
                {/* Start login section */}
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                    <Box mb={5}>
                        <Typography
                            component="h4"
                            sx={{
                                fontSize: theme.typography.h2,
                                fontWeight: theme.fontWeight.bold,
                                lineHeight: 2,
                            }}
                        >
                            Verify the invitation
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            Log In your account to manage your company!
                        </Typography>
                    </Box>
                    {/* Start form container */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        noValidate
                    >
                        <FormInput
                            name="institutionCode"
                            control={control}
                            label="Institution Code"
                            type="text"
                            required={true}
                        />
                        <FormInput name="email" type="email" control={control} label="Email Address" required={true} />
                        {/* Submit button */}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                                fontWeight: theme.fontWeight.bold,
                            }}
                        >
                            Verify
                        </Button>
                    </Box>
                    {/* End form container */}
                </Grid>
                {/* End signup section */}
                {/* Image container */}
                <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                        }}
                        alt="illustration"
                        src={LoginImgSvg}
                    />
                </Grid>
            </Grid>
            {/* End grid container */}
        </LandingContainer>
        // ============ End login container ============
    );
};

export default CodeInvitationPage;
