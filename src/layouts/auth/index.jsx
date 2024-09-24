import { Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import LogoIconSvg from "../../assets/icons/Logo.svg";
import LandingContainer from "../../components/styles/LandingContainer";

const AuthLayout = () => {
    return (
        <Box width="100%" height="100%">
            <LandingContainer sx={{ my: 8 }}>
                <Link to="/">
                    <Box component="img" src={LogoIconSvg} />
                </Link>
            </LandingContainer>
            <Outlet />
        </Box>
    );
};

export default AuthLayout;
