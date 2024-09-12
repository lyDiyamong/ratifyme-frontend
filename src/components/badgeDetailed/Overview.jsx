// React library import
import React from "react";

// MUI Import
import { Box, Stack, Typography } from "@mui/material";

// Custom Import
import DashboardContainer from "../styles/DashboardContainer";
import { BtnAddTo, BtnIssueTo } from "./BarnerButton";
import PageSection from "./PageSection";
import { DetailData } from "../../data/badgeDetail/DataBadgeDetailed";
import facebookIcon from "./../../assets/icons/facebook.svg"
import linkedIcon from "./../../assets/icons/linkedin.svg"


const badgeInfo = {
    padding: "32px",
    // Ensure the Stack takes full width and aligns content to the left
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // Correctly set direction based on screen size
    justifyContent: "flex-start",
};

const badgeImages = {
    width: "100%",
    maxWidth: 250,
    maxHeight: 250,
    mb: 1
};

const Logo = {
    width: "100%",
    maxWidth: 150,
    maxHeight: 150,
    mt: 1
};

const Overview = () => {
    // Destructure the data for easier access
    const { Overview } = DetailData;
    const badge = Overview[0]; // Assuming there's only one badge in the Overview array

    return (
        // ============ Start Overview Section ============
        <DashboardContainer>
            <PageSection>
                <Stack
                    component="div"

                    sx={badgeInfo}
                >
                    <Box
                        component="img"
                        src={badge.BagdeImg} // Use the correct key
                        alt="Badge"
                        sx={badgeImages}
                    />
                    <Box
                        width="800px"
                        sx={{
                            textAlign: "left", // Ensures text alignment to left
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between" // Distributes space evenly between children
                        }}
                    >
                        <Box>
                            <Typography variant="h3" sx={{ mt: 1 }}>
                                {badge.BadgeTitle} {/* Display badge title */}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                Issued to: {badge.Earner} {/* Display earner */}
                            </Typography>
                        </Box>
                        <Stack
                            component="div"
                            spacing={0.5}
                            direction="row"
                            sx={{
                                mt: 1,
                                justifyContent: "space-between", // Space between buttons
                                maxWidth: "350px",
                                width: "100%" // Ensure Stack takes full width of the parent Box
                            }}
                        >
                            <BtnAddTo />
                            <BtnIssueTo />
                        </Stack>
                        <Stack
                            component="div"
                            spacing={0.5}
                            direction="row"
                            sx={{
                                mt: 1,
                                maxWidth: "350px",
                                width: "100%" // Ensure Stack takes full width of the parent Box
                            }}
                        >
                            <Box component="img" src={facebookIcon} />
                            <Box component="img" src={linkedIcon} />
                        </Stack>
                    </Box>

                </Stack>

                <Box
                    component="div"
                    id="1"
                    sx={{
                        padding: "10px",

                        mt: 3,
                        maxWidth: 220,
                        width: "100%",
                        minWidth: 190, // Ensure the box does not shrink below this width
                        boxSizing: 'border-box', // Ensure padding and border are included in the width calculation
                    }}
                >
                    <Typography sx={{ mb: 1 }}>
                        Issued By
                    </Typography>
                    <Box
                        component="img"
                        src={badge.IssuerLogo} // Use the correct key
                        alt="Issuer Logo"
                        sx={Logo}
                    />
                    <Typography sx={{ mt: 1 }}>
                        Issued Date: {badge.IssuedDate} {/* Display issued date */}
                    </Typography>
                </Box>

            </PageSection>
        </DashboardContainer>
        // ============ End Overview Section ============
    );
};

export default Overview;
