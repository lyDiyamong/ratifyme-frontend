// React library import
import { useState } from "react";

// MUI import
import { Drawer, IconButton, Box, Divider, Tabs, Tab, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Custom import
import NoNotification from "../assets/images/NoNotification.png";
import AchieveNotification from "../assets/images/AchieveNotification.png";
import theme from "../assets/themes";

const NotificationSidebar = ({ open, onClose }) => {
    // State to manage the selected tab
    const [selectedTab, setSelectedTab] = useState(0);

    // Render notifications based on the selected tab
    const renderNotifications = () => {
        if (selectedTab === 0) {
            return (
                <Box sx={{ textAlign: "center", my: 3 }}>
                    <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                        No notifications
                    </Typography>
                    <Typography variant="body1" color="textSecondary" pb={2}>
                        There are no notifications yet!
                    </Typography>
                    <Box component="img" src={NoNotification} alt="No Notifications" sx={{ width: "100px", height: "100px" }} />
                </Box>
            );
        } else {
            return (
                <Box sx={{ textAlign: "center", my: 3 }}>
                    <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                        No archive notifications
                    </Typography>
                    <Typography variant="body1" color="textSecondary" pb={2}>
                        There are no archive notifications yet!
                    </Typography>
                    <Box
                        component="img"
                        src={AchieveNotification}
                        alt="No Notifications"
                        sx={{ width: "100px", height: "100px" }}
                    />
                </Box>
            );
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: { md: 500, xss: 300 }, px: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2>Notifications</h2>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Tabs for navigation */}
                <Tabs
                    value={selectedTab}
                    onChange={(event, newValue) => setSelectedTab(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="All" />
                    <Tab label="Archived" />
                </Tabs>

                <Divider />

                {/* Render the notifications based on the selected tab */}
                <Box sx={{ paddingTop: 1 }}>{renderNotifications()}</Box>
            </Box>
        </Drawer>
    );
};

export default NotificationSidebar;
