import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import VerifyMeLogo from "../../assets/images/VerifyME-Logo.svg";
import Facebook from "../../assets/icons/facebok-svg.svg";
import Instagram from "../../assets/icons/instagram-svg.svg";
import Twiiter from "../../assets/icons/twitter-svg.svg";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();

  const linkItemStyle = {
      color: "text.disabled",
      textDecoration: "none",
      fontFamily: theme.typography.fontFamily,
      marginTop: "20px",
      fontSize: `${theme.typography.body1.fontSize}`,
  };

  const copyrightItem = {
      textDecoration: "none",
      color: "text.disabled",
  };

  const SubListItemStyle = {
      padding: "0px",
      fontStyle: theme.typography.fontFamily,
      // fontWeight: theme.fontWeight.semiBold,
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
                  sx={{ display: "flex", justifyContent: "space-between",  }}
              >
                  <Grid item xs={12} md={3}>
                      <Box
                          component="img"
                          sx={{
                              width: 160,
                          }}
                          alt="The house from the offer."
                          src={VerifyMeLogo}
                      />
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
                              <Link sx={linkItemStyle}>About Us</Link>
                          </ListItem>

                          <ListItem sx={SubListItemStyle}>
                              <Link sx={linkItemStyle}>Support</Link>
                          </ListItem>

                          <ListItem sx={SubListItemStyle}>
                              <Link sx={linkItemStyle}>Careers</Link>
                          </ListItem>

                          <ListItem sx={SubListItemStyle}>
                              <Link sx={linkItemStyle}>For Developers</Link>
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
                              <Link sx={linkItemStyle}>Tech A Workforce</Link>
                          </ListItem>

                          <ListItem sx={SubListItemStyle}>
                              <Link sx={linkItemStyle}>Help</Link>
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
                                  src={Twiiter}
                              />
                          </Link>
                      </List>
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
                          <Link sx={copyrightItem}>Terms of Use</Link>
                          <Link sx={copyrightItem}>Privacy Policy</Link>
                          <Link sx={copyrightItem}>Cookies</Link>
                      </List>
                  </Typography>
              </Container>
          </Box>
      </Box>
  );
};

export default Footer;
