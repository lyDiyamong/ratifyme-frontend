// React import
import { Link } from "react-router-dom";

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

// Icons and Images import
import VerifyMeLogo from "../../assets/images/VerifyME-Logo.svg";

// Custom import
import theme from "../../assets/themes";
import LandingContainer from "../../components/styles/LandingContainer";
import FlexBetween from "../../components/styles/FlexBetween";

// Data import
import {learnMoreLinks, otherSolutionsLinks, copyrightLinks, socialMediaLinks} from "../../data/footerData";

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

    return (
        <LandingContainer>
            <Box sx={{ bgcolor: "inherit", mt: 6 }}>
                {/* ============ Start main footer ============ */}
                <Container sx={{ py: "32px" }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Start the Logo and Info */}
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

                            <Typography variant="body2" color="text.disabled">
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        marginBottom: "20px",
                                    }}
                                >
                                    {" VerifyME "}
                                </Typography>{" "}
                                by TechA is a digital credential network. We
                                help the people speak a common language of
                                verified knowledge, skills, and abilities.
                            </Typography>
                        </Grid>

                        {/* Start Learn More section */}
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
                                        <Link
                                            to={link.to}
                                            style={linkItemStyle}
                                        >
                                            {link.text}
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Start Other Solutions section */}
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
                                        <Link
                                            to={link.to}
                                            style={linkItemStyle}
                                        >
                                            {link.text}
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Start Social Media section */}
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

                            <List sx={{ display: "flex", gap: 2, my: 2 }}>
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
                                    }}
                                >
                                    {" VerifyME "}
                                </Typography>{" "}
                                revolution. Follow us on [Social media
                                platforms] for updates and insights.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                {/* ============ End main footer ============ */}

                {/* Divder line */}
                <Divider />

                {/* ============ Start copyright section ============ */}
                <Box
                    sx={{ bgcolor: "inherit", color: "inherit", my: 2}}
                >
                    <Container>
                        <FlexBetween
                            variant="body2"
                            sx={{
                                display: { sm: "flex", xss: 'block',  },
                                color: "text.disabled",
                            }}
                        >
                            {/* Start Copyright text */}
                            <Typography >
                                © Copyright -{" "}
                                <Typography
                                    component="span"
                                    sx={{ color: theme.palette.primary.main }}
                                >
                                    Tech A
                                </Typography>
                            </Typography>

                            {/* Start the Policy items */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                    flexDirection: { xss: 'column', sm: 'row' },
                                    mt: { xss: 2, sm: 0}
                                }}
                            >
                                {copyrightLinks.map((link, index) => (
                                    <Link
                                        variant="body2"
                                        key={index}
                                        to={link.to}
                                        style={copyrightItem}
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </Box>
                        </FlexBetween>
                    </Container>
                </Box>
                {/* ============ End copyright section ============ */}
            </Box>
            {/* // ============ End footer ============ */}
        </LandingContainer>
    );
};

export default Footer;

