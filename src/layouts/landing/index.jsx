// React library import
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// MUI import
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

// API import
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

// ============ Start LandingLayout ============
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
// ============ End LandingLayout ============