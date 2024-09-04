// React library import
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI import
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Backdrop,
} from "@mui/material";
import { ChevronLeft, SettingsOutlined } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useTheme } from "@emotion/react";

// Custom import
import FlexBetween from "../../components/styles/FlexBetween";
import LogoIconSvg from "../../assets/icons/Logo.svg";
import {sidebarItems} from '../../data/sidebarData'

// Icon Style Constant
const iconStyles = { width: "20px", height: "20px" };

/**
 *
 *
 * @param {number} drawerWidth  - The width of sidebar
 * @param {boolean} drawerWidth  - The prop to check the action of sidebar
 * @param {boolean} setIsSidebarOpen  - The prop to set the action of sidebar
 * @param {boolean} isDesktop  - The prop to check screen size
 * @return {JSX.Element}
 */
const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isDesktop }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [active, setActive] = useState("");

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);


    const handleNavigation = useCallback(
        (path) => {
            setActive(path.substring(1));
            navigate(path);
        },
        [navigate],
    );

    // Determine the Drawer variant based on isDesktop and isSidebarOpen
    const drawerVariant = isDesktop ? (isSidebarOpen ? "persistent" : "temporary") : "temporary";

    return (
        <Box component="nav">
            {/* Backdrop for mobile overlay */}
            {!isDesktop && (
                <Backdrop
                    open={isSidebarOpen}
                    onClick={() => setIsSidebarOpen(false)}
                    sx={{
                        zIndex: theme.zIndex.drawer - 1,
                        backgroundColor: theme.palette.customColors.gray100,
                    }}
                />
            )}

            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant={drawerVariant}
                anchor="left"
                sx={drawerStyles}
            >
                <Box width="100%">
                    <Box m="1.75rem 2rem 2rem 2rem">
                        <FlexBetween>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Box component="img" src={LogoIconSvg} />
                            </Box>
                            <IconButton
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                sx={{
                                    position: "absolute",
                                    left: "80%",
                                    backgroundColor: "#F2F2F2",
                                }}
                            >
                                <ChevronLeft sx={{ fontSize: "24px" }} />
                            </IconButton>
                        </FlexBetween>
                    </Box>
                    <List>
                        {sidebarItems.map(({ text, icon, dropdown, subItems, path, altText }) => {
                            const lcText = text.toLowerCase();

                            return (
                                <ListItem key={text} disablePadding sx={{ mb: 1 }}>
                                    <ListItemButton
                                        disableRipple
                                        onClick={() => handleNavigation(path)}
                                        sx={{
                                            backgroundColor:
                                                active === lcText ? theme.palette.action.selected : "transparent",
                                            "&:hover": {
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.action.selected
                                                        : theme.palette.action.hover,
                                            },
                                            padding: "7px 14px",
                                            borderRadius: "100px",
                                        }}
                                    >
                                        {icon && (
                                            <ListItemIcon sx={{ minWidth: "2rem" }}>
                                                <Box
                                                    component="img"
                                                    src={icon}
                                                    alt={altText || `${text} icon`}
                                                    sx={iconStyles}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            </ListItemIcon>
                                        )}

                                        <ListItemText primary={<Typography variant="body1">{text}</Typography>} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>

                <Box position="absolute" bottom="2rem">
                    <Divider />
                    <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.9rem">
                                User Name
                            </Typography>
                            <Typography fontSize="0.8rem">user@example.com</Typography>
                        </Box>
                        <SettingsOutlined sx={{ fontSize: "25px" }} />
                    </FlexBetween>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
