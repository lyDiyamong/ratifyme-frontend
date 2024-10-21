import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";
import { useEffect } from "react";

const LandingLayout = () => {
    const { data, error, isLoading } = useCheckAuthQuery();
    const user = data?.user || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                // Redirect to login page if there is an error or no user data
                navigate("/login");
            } else if (!user) {
                navigate("/login");
            }
        }
    }, [isLoading, error, user, navigate]);

    return (
        <Box width="100%" height="100%">
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default LandingLayout;
