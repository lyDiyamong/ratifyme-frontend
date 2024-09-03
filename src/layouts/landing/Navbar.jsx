import { useState, useEffect } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Menu,
    MenuItem,
    Container,
    Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import verifyMe from "../../assets/images/VerifyME-Logo.svg";
import { useTheme } from "@emotion/react";

// Custom hook for hiding the navbar on scroll down and showing on scroll up
function useHideOnScroll() {
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
}

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const show = useHideOnScroll();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();

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

    return (
        <Slide appear={false} direction="down" in={show}>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: "white",
                    border: `1px solid ${theme.palette.text.light}`,
                    boxShadow: theme.shadows.default,
                    borderRadius: "0px 0px 12px 12px",
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{ maxWidth: "1600px", mx: "auto" }}
                >
                    <Toolbar disableGutters sx={{ width: "100%" }}>
                        <Box flexGrow={1} display={"flex"}>
                            <Link to={"/"}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: 120,
                                    }}
                                    alt="The house from the offer."
                                    src={verifyMe}
                                />
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    gap: "100px",
                                },
                            }}
                        >
                            <Box display={"flex"} gap={2}>
                                <Link
                                    to="/price"
                                    // sx={{
                                    //     borderRadius: "0px",
                                    // }}
                                >
                                    <Button sx={buttonStyle}>Price</Button>
                                </Link>
                                <Link to="/contactus">
                                    <Button sx={buttonStyle}>Contact Us</Button>
                                </Link>
                            </Box>

                            <Box display={"flex"} gap={2}>
                                <Link to="/login">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderRadius: `${theme.shape.borderRadius.btn}`,
                                            fontWeight: theme.fontWeight.bold,
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius:
                                                theme.shape.borderRadius.btn,
                                            color: theme.palette.text
                                                .contrastText,
                                            fontWeight: theme.fontWeight.bold,
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <Button
                                aria-controls="mobile-menu"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                sx={buttonStyle}
                            >
                                <MenuOpenIcon
                                    fontSize="large"
                                    color="primary"
                                />
                            </Button>
                            <Menu
                                id="mobile-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                sx={{
                                    "& .MuiPaper-root": {
                                        borderRadius:
                                            theme.shape.borderRadius.card,
                                        boxShadow: theme.shadows.default,
                                        border: `1px solid ${theme.palette.text.light}`,
                                    },
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to="/signup">
                                        <Button
                                            variant="text"
                                            sx={menuResItem}
                                        >
                                            Price
                                        </Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to="/signup">
                                        <Button
                                            variant="text"
                                            sx={menuResItem}
                                        >
                                            Contact Us
                                        </Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to="/login">
                                        <Button
                                            variant="text"
                                            sx={{
                                              borderRadius: "0px",
                                              backgroundColor: "inherit",
                                              fontWeight:
                                                  theme.fontWeight.bold,
                                          }}
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to="/signup">
                                        <Button
                                            variant="text"
                                            sx={{
                                                borderRadius: "0px",
                                                backgroundColor: "inherit",
                                                fontWeight:
                                                    theme.fontWeight.bold,
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Slide>
    );
}

export default Navbar;
