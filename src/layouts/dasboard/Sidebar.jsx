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
import { sidebarItems } from "../../data/sidebarData";

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

    const drawerStyles = useMemo(
        () => ({
            width: drawerWidth,
            "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                borderWidth: isDesktop ? 0 : "2px",
                width: drawerWidth,
                borderRight: `1px solid ${theme.palette.divider}`,
                boxShadow: isDesktop ? theme.shadows.default : "",
                padding: "0 16px",
            },
        }),
        [drawerWidth, isDesktop, theme.palette.divider],
    );

    const handleNavigation = useCallback(
        (path) => {
            setActive(path.substring(1));
            navigate(path);

            if(!isDesktop) setIsSidebarOpen(false)
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

            {/* ============ Start Drawer of Sidebar ============ */}
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant={drawerVariant}
                anchor="left"
                sx={drawerStyles}
            >
                <Box width="100%">
                    <Box m="1.75rem 2rem 2rem 2rem">
                        {/* Start brand logo */}
                        <FlexBetween>
                            {/* logo image  */}
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Box component="img" src={LogoIconSvg} alt="Brand Logo" />
                            </Box>

                            {/* IconButton for open and close sidebar  */}
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
                        {/* End brand logo  */}
                    </Box>

                    {/* ============ Start list of Sidebar ============ */}
                    <List>
                        {sidebarItems.map(({ text, icon, dropdown, subItems, path, altText }) => {
                            const lcText = text.toLowerCase();

                            // ============ Start list item of sidebar when dropdown ============
                            if (dropdown) {
                                return (
                                    <Accordion
                                        disableGutters
                                        key={text}
                                        sx={{
                                            background: "none",
                                            boxShadow: "none",
                                            border: "none",
                                            "&:before": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        {/* Start main list item of sidebar  */}
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ width: "20px", height: "20px" }} />}
                                            aria-controls={`${lcText}-content`}
                                            id={`${lcText}-header`}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                paddingLeft: "14px",
                                                "& .MuiAccordionSummary-content": {
                                                    margin: 0,
                                                },
                                                backgroundColor: active.startsWith(lcText)
                                                    ? theme.palette.action.selected
                                                    : "transparent",
                                                "&:hover": {
                                                    backgroundColor: active.startsWith(lcText)
                                                        ? theme.palette.action.selected
                                                        : theme.palette.action.hover,
                                                    borderRadius: "100px",
                                                },
                                                borderRadius: active.startsWith(lcText) ? "100px" : "0px",
                                                mb: 1,
                                            }}
                                        >
                                            <ListItem disablePadding>
                                                <ListItemIcon sx={{ minWidth: "2rem" }}>
                                                    <Box component="img" src={icon} alt={altText} sx={iconStyles} />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography variant="body1">{text}</Typography>}
                                                />
                                            </ListItem>
                                        </AccordionSummary>
                                        {/* End main list item of sidebar  */}

                                        {/* Start sub list item of sidebar  */}
                                        <AccordionDetails sx={{ padding: "0" }}>
                                            <List sx={{ padding: "0" }}>
                                                {subItems?.map((subItem) => (
                                                    <ListItem key={subItem.text} disablePadding>
                                                        <ListItemButton
                                                            onClick={() => handleNavigation(subItem.path)}
                                                            sx={{
                                                                backgroundColor:
                                                                    active === subItem.path.substring(1)
                                                                        ? theme.palette.action.selected
                                                                        : "transparent",
                                                                "&:hover": {
                                                                    backgroundColor: theme.palette.action.hover,
                                                                    borderRadius: "100px",
                                                                },
                                                                borderRadius: "100px",
                                                                pl: "36px",
                                                                mb: 1,
                                                            }}
                                                        >
                                                            <FiberManualRecordIcon
                                                                sx={{
                                                                    width: "7px",
                                                                    height: "7px",
                                                                    marginRight: "12px",
                                                                }}
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="body1">
                                                                        {subItem.text}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </AccordionDetails>
                                        {/* End main list item of sidebar  */}

                                    </Accordion>
                                );
                            }
                            // ============ Start list item of sidebar when dropdown ============

                            return (
                                //  Start list item of sidebar 
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
                                //  End list item of sidebar 

                            );
                        })}
                    </List>
                    {/* ============ End list of Sidebar ============ */}
                </Box>
                    
                {/* Start Sidebar footer  */}
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
                {/* End Sidebar footer  */}

            </Drawer>
            {/* ============ End Drawer of Sidebar ============ */}
        </Box>
    );
};

export default Sidebar;
