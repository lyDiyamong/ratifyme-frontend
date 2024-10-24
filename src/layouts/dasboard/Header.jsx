// React library import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

// MUI import
import { AppBar, IconButton, InputBase, Toolbar, useMediaQuery, Box, Menu, MenuItem } from "@mui/material";
import {
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    NotificationsNoneOutlined,
    AccountCircleOutlined,
    LogoutOutlined,
} from "@mui/icons-material";

// Custom import
import FlexBetween from "../../components/styles/FlexBetween";
import DashboardContainer from "../../components/styles/DashboardContainer";
import DefaultProfileSvg from "../../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../assets/images/FemaleUser.svg";

// API import
import { useFetchInfoUserByIdQuery } from "../../store/api/users/userInfoProfileApi";
import { useNavigate } from "react-router";
import NotificationSidebar from "../../components/NotificationSidebar";
import PageLoading from "../../components/loading/PageLoading";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import { useLogoutMutation } from "../../store/api/auth/authApi";

// ============ Start Header ============
const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up("md"));
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState(null);

    // Handle dropdown menu open and close
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        setIsLoading(true);
        navigate("/setting/account");
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        setIsLogoutDialogOpen(true);
        handleMenuClose();
    };

    const [notificationSidebarOpen, setNotificationSidebarOpen] = useState(false);

    // Fetch user data using the query
    const { userId } = useSelector((state) => state.global);
    const { data: userData } = useFetchInfoUserByIdQuery(userId);
    const [profileImage, setProfileImage] = useState(DefaultProfileSvg);
    const gender = userData?.data?.Gender?.name;
    const imageProfile = userData?.data?.profileImage;

    // Update profile image on user data change
    useEffect(() => {
        if (userData) {
            if (imageProfile) {
                setProfileImage(imageProfile);
            } else if (gender === "male") {
                setProfileImage(MaleUserDefault);
            } else if (gender === "female") {
                setProfileImage(FemaleUserDefault);
            } else {
                setProfileImage(DefaultProfileSvg);
            }
        }
    }, [imageProfile, userData]);

    // Header icons
    const headerIcons = [
        <IconButton sx={{ p: 0 }} onClick={() => setNotificationSidebarOpen(true)}>
            <NotificationsNoneOutlined />
        </IconButton>,
        <IconButton
            sx={{ p: 0 }}
            onClick={() => {
                setIsLoading(true);
                navigate("/setting/account");
            }}
        >
            <Box
                component="img"
                src={profileImage}
                alt="Profile Icon"
                style={{ borderRadius: "50%", width: "24px", height: "24px" }}
            />
        </IconButton>,
        <IconButton sx={{ p: 0 }} onClick={handleMenuClick}>
            <SettingsOutlined />
        </IconButton>,
    ];

    // Show loading when navigating
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    return (
        // ============ Start Appbar ============
        <DashboardContainer>
            <NotificationSidebar open={notificationSidebarOpen} onClose={() => setNotificationSidebarOpen(false)} />

            {isLoading && <PageLoading isLoading={isLoading} />}

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        ml: -2,
                        transform: "translateY(8px)",
                    },
                }}
            >
                <MenuItem onClick={handleProfileClick}>
                    <AccountCircleOutlined sx={{ mr: 1 }} />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <LogoutOutlined sx={{ mr: 1, color: theme.palette.customColors.red300 }} />
                    Logout
                </MenuItem>
            </Menu>

            <AppBar
                sx={{
                    position: "static",
                    background: "none",
                    boxShadow: "none",
                    paddingTop: "24px",
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

            {/* Logout Confirmation Dialog */}
            <AlertConfirmation
                open={isLogoutDialogOpen}
                title="Confirm Logout"
                message="Are you sure you want to log out?"
                onClose={() => setIsLogoutDialogOpen(false)}
                onConfirm={async () => {
                    await logout().unwrap();
                    localStorage.removeItem("loginMessageShown");
                    navigate("/login");
                    setIsLogoutDialogOpen(false);
                }}
                confirmText="Logout"
                cancelText="Cancel"
                iconBgColor="#ffebee"
                iconColor={theme.palette.error.main}
                confirmButtonColor={theme.palette.error.main}
                confirmButtonColorHover={theme.palette.error.dark}
            />
        </DashboardContainer>
        // ============ End Appbar ============
    );
};

export default Header;
// ============ End Header ============