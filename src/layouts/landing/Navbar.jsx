// React import
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// MUI import
import { AppBar, Box, Toolbar, Button, Menu, MenuItem, Slide } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// Custom import
import theme from "../../assets/themes";

//Images import
import VerifyMeLogo from "../../assets/images/VerifyME-Logo.svg";
import LandingContainer from "../../components/styles/LandingContainer";

// ============ Start Navbar scroll function ============
const useHideOnScroll = () => {
    // Custom hook for hiding the navbar on scroll down and showing on scroll up
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            // Scroll down
            setShow(false);
        } else {
            // Scroll up
            setShow(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return show;
};
// ============ End Navbar scroll function ============

// ============ Start Burger modal function ============
const Navbar = () => {
    //  menu function
    const [signUpAnchorEl, setSignupAnchorEl] = useState(null);
    const [navbarAnchorEl, setNavbarAnchorEl] = useState(null);
    const navigate = useNavigate();

    const show = useHideOnScroll();
    const openNavbarMenu = Boolean(navbarAnchorEl);

    const handleMenuOpen = (event, setAnchorEl) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (setAnchorEl) => {
        setAnchorEl(null);
    };

    // ============ End Burger modal function ============

    // ============ Start config style ============
    const buttonStyle = {
        color: "text.primary",
        fontWeight: theme.fontWeight.bold,
        borderRadius: theme.shape.borderRadius.btn,
    };

    const menuResItem = {
        borderRadius: "0px",
        backgroundColor: "inherit",
        color: `${theme.palette.text.primary}`,
        fontWeight: theme.fontWeight.bold,
    };
    // ============ End config style ============

    return (
        //============ Start Navbar ============
        <Slide appear={false} direction="down" in={show}>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: theme.palette.customColors.white,
                    border: `1px solid ${theme.palette.text.light}`,
                }}
            >
                <LandingContainer>
                    <Toolbar disableGutters sx={{ width: "100%" }}>
                        <Box flexGrow={1} display={"flex"}>
                            <Link to={"/"}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: 120,
                                    }}
                                    alt="The house from the offer."
                                    src={VerifyMeLogo}
                                />
                            </Link>
                        </Box>

                        {/* ============ Start Menu navbar ============ */}
                        <Box
                            sx={{
                                display: {
                                    xss: "none",
                                    md: "flex",
                                    gap: "100px",
                                },
                            }}
                        >
                            {/* Menu */}
                            <Box display={"flex"} gap={2}>
                                <Link to="/price">
                                    <Button sx={buttonStyle}>Price</Button>
                                </Link>
                                <Link to="/contactus">
                                    <Button sx={buttonStyle}>Contact Us</Button>
                                </Link>
                            </Box>

                            {/* Sign In/Up buttons */}
                            <Box display={"flex"} gap={2}>
                                <Link to="/login">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderRadius: theme.customShape.btn,
                                            fontWeight: theme.fontWeight.bold,
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/get-started">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: theme.customShape.btn,
                                            color: theme.palette.customColors.white,
                                            fontWeight: theme.fontWeight.bold,
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Link>

                            </Box>
                        </Box>
                        {/* ============ End Menu navbar ============ */}

                        {/* ============ Start Navbar responsive ============ */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            {/* //Burger */}
                            <Button
                                aria-controls="mobile-menu"
                                aria-haspopup="true"
                                onClick={(event) => {
                                    handleMenuOpen(event, setNavbarAnchorEl);
                                }}
                                color="inherit"
                                sx={buttonStyle}
                            >
                                <MenuOpenIcon fontSize="large" color="primary" />
                            </Button>

                            {/* ============ Start Modal Responsive Menu ============ */}
                            <Menu
                                id="mobile-menu"
                                anchorEl={navbarAnchorEl}
                                open={openNavbarMenu}
                                onClose={() => handleMenuClose(setNavbarAnchorEl)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                sx={{
                                    "& .MuiPaper-root": {
                                        borderRadius: theme.customShape.input,
                                        boxShadow: theme.shadows.default,
                                        border: `1px solid ${theme.palette.text.light}`,
                                    },
                                }}
                            >
                                <MenuItem onClick={() => handleMenuClose(setNavbarAnchorEl)}>
                                    <Link to="/price">
                                        <Button variant="text" sx={menuResItem}>
                                            Price
                                        </Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClose(setNavbarAnchorEl)}>
                                    <Link to="/contactus">
                                        <Button variant="text" sx={menuResItem}>
                                            Contact Us
                                        </Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClose(setNavbarAnchorEl)}>
                                    <Link to="/login">
                                        <Button
                                            variant="text"
                                            sx={{
                                                borderRadius: "0px",
                                                backgroundColor: "inherit",
                                                fontWeight: theme.fontWeight.bold,
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuClose(setNavbarAnchorEl)}>
                                    <Link to="/signup">
                                        <Button
                                            variant="text"
                                            sx={{
                                                borderRadius: "0px",
                                                backgroundColor: "inherit",
                                                fontWeight: theme.fontWeight.bold,
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </MenuItem>
                            </Menu>
                            {/* ============ End Modal Responsive Menu ============ */}
                        </Box>
                        {/* ============ End Navbar responsive ============ */}
                    </Toolbar>
                </LandingContainer>
            </AppBar>
        </Slide>
        // ============ End Navbar ============
    );
};

export default Navbar;
