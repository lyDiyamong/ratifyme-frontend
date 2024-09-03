import {
    Box,
    Typography,
    Container,
    Grid,
    Divider,
    List,
    ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import VerifyMeLogo from "../../assets/images/VerifyME-Logo.svg";
import Facebook from "../../assets/icons/facebok-svg.svg";
import Instagram from "../../assets/icons/instagram-svg.svg";
import LinkedIn from "../../assets/icons/logos_linkedin-icon.svg";
import theme from "../../assets/themes";

const Footer = () => {

    // Copyright item style
    const copyrightItem = {
        textDecoration: "none",
        color: theme.palette.text.disabled,
    };

    // Sub List ite style
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
        <Box sx={{ bgcolor: "inherit", py: 2 }}>
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
                        <Link to={"/"}>
                            <Box
                                component="img"
                                sx={{
                                    width: 140,
                                }}
                                alt="The house from the offer."
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
                            <ListItem sx={SubListItemStyle}>
                                <Link to="/" style={linkItemStyle}>
                                    About Us
                                </Link>
                            </ListItem>

                            <ListItem sx={SubListItemStyle}>
                                <Link to="/" style={linkItemStyle}>
                                    Support
                                </Link>
                            </ListItem>

                            <ListItem sx={SubListItemStyle}>
                                <Link to="/" style={linkItemStyle}>
                                    Careers
                                </Link>
                            </ListItem>

                            <ListItem sx={SubListItemStyle}>
                                <Link to="/" style={linkItemStyle}>
                                    For Developers
                                </Link>
                            </ListItem>
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
                            <ListItem sx={SubListItemStyle}>
                                <Link style={linkItemStyle} >
                                    Tech A Workforce
                                </Link>
                            </ListItem>

                            <ListItem sx={SubListItemStyle}>
                                <Link style={linkItemStyle}>Help</Link>
                            </ListItem>
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
                            <Link sx={linkItemStyle}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: 30,
                                    }}
                                    alt="The house from the offer."
                                    src={Facebook}
                                />
                            </Link>

                            <Link sx={linkItemStyle}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: 30,
                                    }}
                                    alt="The house from the offer."
                                    src={Instagram}
                                />
                            </Link>

                            <Link sx={linkItemStyle}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: 30,
                                    }}
                                    alt="The house from the offer."
                                    src={LinkedIn}
                                />
                            </Link>
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
                            </Typography>
                            revolution. Follow us on [Social media platforms]
                            for updates and insights.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <Divider
                maxWidth={false}
                sx={{ maxWidth: "1600px", mx: "auto", py: 1, mb: 3 }}
            />

            <Box sx={{ bgcolor: "inherit", color: "inherit", py: 1, mt: 2 }}>
                <Container
                    maxWidth={false}
                    sx={{ maxWidth: "1600px", mx: "auto", py: 1, mb: 3 }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            display: { xs: "block", sm: "flex" }, // Disable flex below 538px
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
                            <Link style={copyrightItem}>Terms of Use</Link>
                            <Link style={copyrightItem}>Privacy Policy</Link>
                            <Link style={copyrightItem}>Cookies</Link>
                        </List>
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
