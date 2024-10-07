import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import theme from "../../assets/themes";
import RatifyMELogo from "../../assets/icons/RatfiyME.svg";
import SignupOptionCard from "./SignupOptionCard";
import OutletImageComponent from "./OutletImageTemplate";
import IssuerImg from "../../assets/images/Issuer.png";
import UniversifyImg from "../../assets/images/University.png";
import CertificateImg from "../../assets/images/Certificate.png";

// Signup options data
const signupOptsData = [
    {
        title: "Institution",
        description:
            "Sign up as an institution to manage badge issuance, track performance, and create verifiable credentials for your learners.",
        circleBg: theme.palette.primary.light,
        icon: UniversifyImg,
        iconWidth: '80px'
    },
    {
        title: "Issuer",
        description:
            "Sign up as an issuer to create, award, and manage badges for achievements, certifications, and skills recognition.",
        circleBg: theme.palette.customColors.orange200,
        icon: IssuerImg,
    },
    {
        title: "Earner",
        description:
            "Sign up as an earner to collect and showcase digital badges for your skills and achievements, and share them with employers.",
        circleBg: theme.palette.customColors.green200,
        icon: CertificateImg,
    },
];

const SignupOptPage = () => {
    const navigate = useNavigate();

    // Handles role selection
    const handleRoleSelect = (role) => {
        navigate(
            role === "Institution" ? `/signup?as=${role.toLowerCase()}` : `/join-invitation?as=${role.toLowerCase()}`,
        );
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Right side with login form */}
            <Box
                flexGrow={1}
                display="flex"
                justifyContent="center"
                sx={{
                    width: { md: "50%", xss: "100%" },
                    mx: "auto",
                    px: 4,
                    backgroundColor: { sm: "inherit", xss: "inherit", md: "#fff" },
                }}
            >
                {/* Signup options section */}
                <Stack width="100%" maxWidth="500px" gap={2} mb={{ sm: 4, xss: 4, md: 0 }}>
                    <Link to="/">
                        <Box
                            component="img"
                            src={RatifyMELogo}
                            alt="Ratifyme Favicon"
                            sx={{ width: 150, height: 150 }}
                        />
                    </Link>

                    <Box>
                        <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} mb={1}>
                            How do you want to use RatifyMe?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            We’ll personalize your setup experience accordingly.
                        </Typography>
                    </Box>

                    {/* Render signup option cards */}
                    {signupOptsData.map((opt, index) => (
                        <SignupOptionCard
                            key={index}
                            title={opt.title}
                            description={opt.description}
                            circleBg={opt.circleBg}
                            icon={opt.icon}
                            onClick={() => handleRoleSelect(opt.title)}
                        />
                    ))}
                </Stack>
            </Box>

            {/* Left side with text */}
            <OutletImageComponent />
        </Box>
    );
};

export default SignupOptPage;
