// React library import
import { Outlet, useNavigate } from "react-router-dom";
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
    const { data} = useCheckAuthQuery();
    const navigate = useNavigate();

    // Store the authentication data once available
    useEffect(() => {
        if (data && data.user) {
            setAuthUser(data.user);
        }
    }, [data, navigate]);

    return (
        <Box width="100%" height="100%">
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default LandingLayout;
