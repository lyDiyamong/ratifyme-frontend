import { Box, Typography, Grid, Paper } from "@mui/material";

const BenefitGrid = () => {
    return (
        <Box>
            {/* Header */}
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
                ToDesktop handles the details 🚀
            </Typography>

            {/* Card Grid */}
            <Grid container spacing={3}>
                {/* Card 1 */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))", // Softer gradient for hover effect
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Native Notifications
                        </Typography>
                        <Box mt={2}>
                            <Box
                                component="img"
                                src="https://www.todesktop.com/cdn-cgi/image/width=320,height=105,f=auto,fit=cover/feature-images/look-and-feel@3x.png"
                                alt="Customization Icon"
                                width="100%"
                            />
                        </Box>
                        <Typography variant="body1" mt={2}>
                            New event! <br /> test@gmail.com
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card 2 */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))", // Softer gradient for hover effect
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Auto Updates
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            We’ll ensure the underlying browser is up to date and deliver performance improvements, security
                            patches, & additional features.
                        </Typography>
                        <Box mt={2}>
                            <Box
                                component="img"
                                src="https://www.todesktop.com/cdn-cgi/image/width=320,height=105,f=auto,fit=cover/feature-images/look-and-feel@3x.png"
                                alt="Customization Icon"
                                width="100%"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 3 */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))", // Softer gradient for hover effect
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Plugins
                        </Typography>
                        <Box mt={2}>
                            <Box
                                component="img"
                                src="https://www.todesktop.com/cdn-cgi/image/width=320,height=88,f=auto,fit=cover/feature-images/plugins@3x.png"
                                alt="Plugin Icon"
                                sx={{ width: "100%" }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 4 */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))", // Softer gradient for hover effect
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Access to Native APIs
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            ToDesktop ensures the underlying browser, performance improvements, security patches, and additional
                            features are always up to date.
                        </Typography>
                        <Box mt={2}>
                            <Box
                                component="img"
                                src="https://www.todesktop.com/cdn-cgi/image/width=320,height=105,f=auto,fit=cover/feature-images/look-and-feel@3x.png"
                                alt="Customization Icon"
                                width="100%"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 5 */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))", // Softer gradient for hover effect
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Customizable look and feel
                        </Typography>
                        <Box mt={2}>
                            <Box
                                component="img"
                                src="https://www.todesktop.com/cdn-cgi/image/width=320,height=105,f=auto,fit=cover/feature-images/look-and-feel@3x.png"
                                alt="Customization Icon"
                                width="100%"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 6 */}
                <Grid item xss={12} sm={6} md={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign: "center",
                            height: "100%",
                            background: "linear-gradient(135deg, #f5f7fa, #e2e8f0)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, rgba(240, 230, 250, 0.3), rgba(230, 240, 255, 0.3), rgba(255, 240, 245, 0.3), rgba(255, 250, 220, 0.3))", // Softer gradient for hover effect
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Native Installers
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            We even provide a magic link that detects your users' OS & downloads the most up-to-date version of
                            your app.
                        </Typography>
                        <Box mt={2}>
                            <Box
                                component="img"
                                src="https://www.todesktop.com/cdn-cgi/image/width=320,height=105,f=auto,fit=cover/feature-images/look-and-feel@3x.png"
                                alt="Customization Icon"
                                width="100%"
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BenefitGrid;
