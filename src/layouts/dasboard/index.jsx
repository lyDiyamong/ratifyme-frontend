import { Outlet, replace, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import theme from "../../assets/themes";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";

const DashboardLayout = () => {
    // Determine if the screen size is large (desktop)
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    // State to manage whether the sidebar is open or closed
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Hook to handle redirection
    const navigate = useNavigate();

    const { data, error, isLoading } = useCheckAuthQuery();
    const user = data?.user || {};

    // Effect to automatically open or close the sidebar based on screen size
    useEffect(() => {
        setIsSidebarOpen(isDesktop ? true : false);
    }, [isDesktop]);

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

    if (isLoading) {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    return (
        // Use flex layout for desktop and block layout for smaller screens
        <Box display={isDesktop ? "flex" : "block"}>
            {/* Sidebar component */}
            <Sidebar
                user={user}
                isDesktop={isDesktop}
                drawerWidth="270px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Main content area */}
            <Box flexGrow={1}>
                {/* Header component */}
                <Header user={user} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                {/* Outlet for rendering child routes */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
