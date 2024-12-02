// React library import
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// MUI import
import { Box } from "@mui/material";

// Custom import
import Navbar from "./Navbar";
import Footer from "./Footer";

// API import
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

const LandingLayout = () => {
    const [authUser, setAuthUser] = useState(null);

    // Fetch authentication data
    const { data } = useCheckAuthQuery();
    const navigate = useNavigate();

    // Store the authentication data once available
    useEffect(() => {
        if (data && data.user) {
            setAuthUser(data.user);
        }
    }, [data, navigate]);

    //This component is when we change route we it the scroll to the top everytime route change
    const Scroll = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return null;
    };

    return (
        <Box width="100%" minHeight="100vh" bgcolor="#FFFFFF">
            {/* This make the page render to the Top */}
            <Scroll />
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default LandingLayout;
