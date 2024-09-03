// MUI import
import {
    Box,
    Typography,
    Container,
    Grid,
    Divider,
    List,
    ListItem,
} from "@mui/material";

// React Router library import
import { Link } from "react-router-dom";

// Icons and Images import
import VerifyMeLogo from "../../assets/images/VerifyME-Logo.svg";
import Facebook from "../../assets/icons/facebook.svg";
import Instagram from "../../assets/icons/instagram.svg";
import LinkedIn from "../../assets/icons/linkedin.svg";

// Config themes import
import theme from "../../assets/themes";

const Footer = () => {
    // Copyright item style
    const copyrightItem = {
        textDecoration: "none",
        color: theme.palette.text.disabled,
    };

    // Sub List item style
    const SubListItemStyle = {
        padding: "0px",
        fontStyle: theme.typography.fontFamily,
    };

    // Footer list item style
    const linkItemStyle = {
        color: theme.palette.text.disabled,
        textDecoration: "none",
        fontFamily: theme.typography.fontFamily,
        marginTop: "20px",
        fontSize: `${theme.typography.body1.fontSize}`,
    };

    //============ start mapping the dubplicate section ============
    // Learn More section mapping
    const learnMoreLinks = [
        { to: "/", text: "About Us" },
        { to: "/", text: "Support" },
        { to: "/", text: "Careers" },
        { to: "/", text: "For Developers" },
    ];

    // Other Solutions section mapping
    const otherSolutionsLinks = [
        { to: "/", text: "Tech A Workforce" },
        { to: "/", text: "Help" },
    ];

    // Social Media section mapping
    const socialMediaLinks = [
        { src: Facebook, alt: "Facebook" },
        { src: Instagram, alt: "Instagram" },
        { src: LinkedIn, alt: "LinkedIn" },
    ];

    // Copyright section mapping
    const copyrightLinks = [
        { to: "/", text: "Terms of Use" },
        { to: "/", text: "Privacy Policy" },
        { to: "/", text: "Cookies" },
    ];
    //============ end mapping the dubplicate section ============

    return (
        <Box sx={{ bgcolor: "inherit", py: 2 }}>
            {/* ============ start main footer ============ */}
            <Container
                maxWidth={false}
                sx={{ maxWidth: "1600px", mx: "auto", py: 1, mb: 3 }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Grid item xs={12} md={3}>
                        <Link to="/">
                            <Box
                                component="img"
                                sx={{
                                    width: 140,
                                }}
                                alt="VerifyME Logo"
                                src={VerifyMeLogo}
                            />
                        </Link>
                        <Typography
                            variant="body2"
                            color="text.disabled"
                            sx={{ marginBottom: "20px" }}
                        >
                            VerifyME by TechA is a digital credential network.
                            We help the people speak a common language of
                            verified knowledge, skills, and abilities.
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontStyle: theme.typography.fontFamily,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            Learn More
                        </Typography>

                        <List>
                            {learnMoreLinks.map((link, index) => (
                                <ListItem key={index} sx={SubListItemStyle}>
                                    <Link to={link.to} style={linkItemStyle}>
                                        {link.text}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontStyle: theme.typography.fontFamily,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            Other Solutions
                        </Typography>
                        <List>
                            {otherSolutionsLinks.map((link, index) => (
                                <ListItem key={index} sx={SubListItemStyle}>
                                    <Link to={link.to} style={linkItemStyle}>
                                        {link.text}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontStyle: theme.typography.fontFamily,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            Social Media
                        </Typography>

                        <List sx={{ display: "flex", gap: 2 }}>
                            {socialMediaLinks.map((link, index) => (
                                <Link key={index} sx={linkItemStyle}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: 30,
                                        }}
                                        alt={link.alt}
                                        src={link.src}
                                    />
                                </Link>
                            ))}
                        </List>
                        <Typography variant="body2" color="text.disabled">
                            Join the{" "}
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    color: theme.palette.primary.main,
                                    px: "2px",
                                }}
                            >
                                VerifyME
                            </Typography>{" "}
                            revolution. Follow us on [Social media platforms]
                            for updates and insights.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            {/* ============ end main footer ============ */}

            <Divider
                maxWidth={false}
                sx={{ maxWidth: "1600px", mx: "auto", py: 1, mb: 3 }}
            />

            {/* ============ start copyright section ============ */}
            <Box sx={{ bgcolor: "inherit", color: "inherit", py: 1, mt: 2 }}>
                <Container
                    maxWidth={false}
                    sx={{ maxWidth: "1600px", mx: "auto", py: 1, mb: 3 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            display: { xs: "block", sm: "flex" },
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: "text.disabled",
                        }}
                    >
                        <Typography>
                            © Copyright -{" "}
                            <Typography
                                component="span"
                                sx={{ color: theme.palette.primary.main }}
                            >
                                Tech A
                            </Typography>
                        </Typography>

                        <List
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            {copyrightLinks.map((link, index) => (
                                <Link key={index} to={link.to} style={copyrightItem}>
                                    {link.text}
                                </Link>
                            ))}
                        </List>
                    </Typography>
                </Container>
            </Box>
            {/* ============ end copyright section ============ */}
        </Box>
        // ============ end footer ============
    );
};

export default Footer;
