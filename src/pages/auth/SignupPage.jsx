// React library import
import { useForm } from "react-hook-form";

// MUI import
import { Box, Grid, Typography, Button, FormControl } from "@mui/material";

// Custom import
import FormInput from "../../components/FormInput";
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import SignupImgSvg from "../../assets/images/Signup-illu.svg";
import { useSignUpMutation } from "../../store/api/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DateSelectionForm from "../../components/DateSelectionForm";
import SelectForm from "../../components/SelectionForm";

const roleIdData = {
    institution: 2,
    issuer: 3,
    earner: 4,
};

// Data static of the gender select
const optionSelect = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
];

const SignupPage = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const { handleSubmit, control } = useForm();
    const [signUp, { isLoading, isError, error }] = useSignUpMutation();

    useEffect(() => {
        const queryRole = new URLSearchParams(search).get("as") || "";
        setRole(queryRole);
    }, [search]);

    const onSubmit = async (data) => {
        // Only accessing roleId, no state updates here
        const roleId = roleIdData[role] || 0;
        const reqData = { ...data, roleId };
        try {
            const result = await signUp(reqData).unwrap();
            navigate("/dashboard");
        } catch (err) {
            console.error("Error during signup:", err);
        }
    };

    return (
        <LandingContainer sx={{ my: 6 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
                    {/* Start signup title  */}
                    <Box mb={5}>
                        <Typography
                            component="h4"
                            sx={{ fontSize: theme.typography.h2, fontWeight: theme.fontWeight.bold, lineHeight: 2 }}
                        >
                            Sign up as {role}
                        </Typography>
                        <Typography>
                            Let’s get started. Are you ready to be a part of our digital badge? Then boldly move forward
                            with us.
                        </Typography>
                    </Box>
                    {/* End signup title  */}

                    {/* Start signup form  */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        noValidate
                    >
                        <FormInput name="firstname" label="First Name" control={control} type="text" required={true} />
                        <FormInput name="lastname" label="Last Name" control={control} type="text" required={true} />
                        <FormInput name="username" label="Username" control={control} type="text" required={true} />
                        <FormInput name="email" label="Email" control={control} type="email" required={true} />
                        <FormInput
                            label="Phone Number"
                            name="phoneNumber"
                            control={control}
                            required={true}
                            type="text"
                        />
                        {/* Gender  */}
                        <SelectForm
                            control={control}
                            name="genderId"
                            label="Gender"
                            options={optionSelect}
                            required={false}
                        />

                        {/* DOB  */}
                        <DateSelectionForm control={control} name="dateOfBirth" label="Date of Birth" />
                        <FormInput label="Password" name="password" control={control} type="password" required={true} />
                        <FormInput
                            label="Confirm Password"
                            name="passwordConfirm"
                            control={control}
                            type="password"
                            required={true}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                color: theme.palette.background.default,
                                borderRadius: theme.customShape.btn,
                                fontWeight: theme.fontWeight.bold,
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                        {isError && <Typography color="error">{error?.data?.message || "Signup failed"}</Typography>}
                        <Typography textAlign="center" color={theme.palette.text.secondary}>
                            By signing up to create an account I accept{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: theme.fontWeight.semiBold, color: theme.palette.text.primary }}
                            >
                                Term of Use{" "}
                            </Typography>
                            and{" "}
                            <Typography
                                component="span"
                                sx={{ fontWeight: theme.fontWeight.semiBold, color: theme.palette.text.primary }}
                            >
                                Privacy Policy.
                            </Typography>
                        </Typography>
                        <Typography textAlign="center" color={theme.palette.text.secondary}>
                            Already have an account?{" "}
                            {/* <Link to="/login">
                                <Typography
                                    component="span"
                                    sx={{ color: theme.palette.text.primary, fontWeight: theme.fontWeight.semiBold }}
                                >
                                    Log in
                                </Typography>{" "}
                            </Link> */}
                        </Typography>
                        <Typography color={theme.palette.text.secondary} fontSize={theme.typography.body2}>
                            Let’s get started. Are you ready to be a part of our digital badge? Then boldly move forward
                            with us.
                        </Typography>
                    </Box>
                    {/* End signup form  */}
                </Grid>
                <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                    <Box component="img" sx={{ width: "100%" }} alt="illustration" src={SignupImgSvg} />
                </Grid>
            </Grid>
        </LandingContainer>
    );
};

export default SignupPage;
