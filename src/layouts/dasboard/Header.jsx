// React library import
import React, { useEffect, useState } from "react";

// MUI import
import { AppBar, IconButton, InputBase, Toolbar, useMediaQuery, Box } from "@mui/material";
import { Menu as MenuIcon, Search, SettingsOutlined, NotificationsNoneOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

// Custom Import
import FlexBetween from "../../components/styles/FlexBetween";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";
import DefaultProfileSvg from "../../assets/images/DefaultProfile.svg";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up("md"));

    // Fetch user data using the query
    const { data: userData } = useCheckAuthQuery();
    const [profileImage, setProfileImage] = useState(DefaultProfileSvg);

    // Update profile image on user data change
    useEffect(() => {
        if (userData.user.profileImage) {
            setProfileImage(userData.user.profileImage);
        } else {
            setProfileImage(DefaultProfileSvg);
        }
    }, [userData]);

    // Header icons
    const headerIcons = [
        <NotificationsNoneOutlined />,
        <Box
            component="img"
            src={userData.user.profileImage || DefaultProfileSvg}
            alt="Profile Icon"
            style={{ borderRadius: "50%", width: "24px", height: "24px" }}
        />,
        <SettingsOutlined />,
    ];

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
                <Toolbar disableGutters sx={{ justifyContent: "space-between", px: 0 }}>
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
