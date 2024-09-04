import React from "react";
import { AppBar, IconButton, InputBase, Toolbar, useMediaQuery } from "@mui/material";
import {
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    NotificationsNoneOutlined,
    AccountCircleOutlined,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";

import FlexBetween from "../../components/styles/FlexBetween";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
                paddingTop: "10px",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left Side */}
                <FlexBetween>
                    {!isSidebarOpen && (
                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <MenuIcon sx={{ fontSize: "32px", color: theme.palette.customColors.gray800 }} />
                        </IconButton>
                    )}
                    {isTablet && (
                        <FlexBetween
                            backgroundColor={theme.palette.customColors.white}
                            borderRadius={theme.shape.borderRadius.btn}
                            paddingLeft="24px"
                            width="30rem"
                            py="4px"
                            sx={{
                                borderRight: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows.default,
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
                            <Search sx={{ fontSize: "28px", color: theme.palette.customColors.gray200 }} />
                        </IconButton>
                    )}
                </FlexBetween>

                {/* Right Side  */}
                <FlexBetween>
                    <IconButton>
                        <NotificationsNoneOutlined
                            sx={{ fontSize: "24px", color: theme.palette.customColors.gray200 }}
                        />
                    </IconButton>
                    <IconButton>
                        <AccountCircleOutlined sx={{ fontSize: "24px", color: theme.palette.customColors.gray200 }} />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "24px", color: theme.palette.customColors.gray200 }} />
                    </IconButton>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
