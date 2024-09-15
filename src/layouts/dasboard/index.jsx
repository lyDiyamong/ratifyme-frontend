import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import theme from "../../assets/themes";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
    // Determine if the screen size is large (desktop)
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    // State to manage whether the sidebar is open or closed
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.global.userId);

    // Effect to automatically open or close the sidebar based on screen size
    useEffect(() => {
        setIsSidebarOpen(isDesktop ? true : false);
    }, [isDesktop]);

    return (
        // Use flex layout for desktop and block layout for smaller screens
        <Box display={isDesktop ? "flex" : "block"}>
            {/* Sidebar component */}
            <Sidebar
                isDesktop={isDesktop}
                drawerWidth="270px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Main content area */}
            <Box flexGrow={1}>
                {/* Header component */}
                <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                {/* Outlet for rendering child routes */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
