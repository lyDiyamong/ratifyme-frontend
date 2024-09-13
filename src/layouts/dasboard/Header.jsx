// React library import
import React from "react";

// MUI import
import { AppBar, IconButton, InputBase, Toolbar, useMediaQuery } from "@mui/material";
import {
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    NotificationsNoneOutlined,
    AccountCircleOutlined,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";

// Custom Import
import FlexBetween from "../../components/styles/FlexBetween";
import DashboardContainer from "../../components/styles/DashboardContainer";
// Header icons
const headerIcons = [<NotificationsNoneOutlined />, <AccountCircleOutlined />, <SettingsOutlined />];

/**
 *
 *
 * @param {boolean} isSidebarOpen - prop to check action of sidebar
 * @param {boolean} setIsSidebarOpen - prop to set action of sidebar
 * @return {JSX.Element} Render Header component
 */
const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up("md"));
    return (
        // ============ Start Appbar ============
        <DashboardContainer>
            <AppBar
                sx={{
                    position: "static",
                    background: "none",
                    boxShadow: "none",
                    paddingTop: "10px",
                }}
            >
                <Toolbar disableGutters        sx={{ justifyContent: "space-between", px: 0 }}>
                    {/* Start left side */}
                    <FlexBetween>
                        {!isSidebarOpen && (
                            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <MenuIcon sx={{ fontSize: "32px", color: theme.palette.customColors.gray800 }} />
                            </IconButton>
                        )}
                        {isTablet && (
                            <FlexBetween
                                backgroundColor={theme.palette.customColors.white}
                                borderRadius="20px"
                                paddingLeft="24px"
                                width="30rem"
                                py="4px"
                                sx={{
                                    borderRight: `1px solid ${theme.palette.divider}`,
                                    boxShadow: theme.customShadows.default,
                                }}
                            >
                                <InputBase placeholder="Search any topics..." sx={{ width: "30rem" }} />
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </FlexBetween>
                        )}
                        {!isTablet && (
                            <IconButton>
                                <Search sx={{ fontSize: "28px", color: theme.palette.customColors.gray500 }} />
                            </IconButton>
                        )}
                    </FlexBetween>
                    {/* End left side */}

                    {/* Start right side  */}
                    <FlexBetween>
                        {headerIcons.map((icon, index) => (
                            <IconButton key={index}>{icon}</IconButton>
                        ))}
                    </FlexBetween>
                    {/* End right side  */}
                </Toolbar>
            </AppBar>
        </DashboardContainer>
        // ============ End Appbar ============
    );
};

export default Header;
