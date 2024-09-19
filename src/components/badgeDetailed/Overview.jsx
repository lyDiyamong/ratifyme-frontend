// React library import
import React from "react";

// MUI Import
import { Box, Stack, Typography} from "@mui/material";
import IconButton from '@mui/material/IconButton';
// Custom Import
import DashboardContainer from "../styles/DashboardContainer";
import OverviewButton  from "./smallComponent/OverviewButton";
import PageSection from "./smallComponent/PageSection";
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

/**
 * Overview Component
 *
 * A reusable Overview component that displays different buttons
 *
 * Please modify button action in here "./smallComponent/OverviewButton" as button component is called <OverviewButton />
 *
 * based on the status of the user (Admin, Issuer, Earner).
 *
 * @param {string} btnstatus - The status of the user (e.g., 'Admin', 'Issuer', 'Earner').
 * @param {function} btnaction - The action to trigger on button click.
 * @returns {JSX.Element} The rendered Overview component.
 */

const Overview = ({btnstatus,data}) => {
    // Destructure the data for easier access
    const { Overview } = data;
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
                        sx={{
                            textAlign: "left", // Ensures text alignment to left
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            maxWidth: "800px",
                            width: "100%" // Distributes space evenly between children
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
                        <OverviewButton btnstatus={btnstatus} />
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
                            <IconButton
                                aria-label="Facebook"
                                onClick={() => console.log('Facebook clicked')}
                                sx={{ color: 'blue' }}
                            >
                                <Box component="img" src={facebookIcon} alt="Facebook" />
                            </IconButton>
                            <IconButton
                                aria-label="LinkedIn"
                                onClick={() => console.log('LinkedIn clicked')}
                                sx={{ color: 'blue' }}
                            >
                                <Box component="img" src={linkedIcon} alt="LinkedIn" />
                            </IconButton>
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
                        boxSizing: 'border-box',
                        pr:10 // Ensure padding and border are included in the width calculation
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
