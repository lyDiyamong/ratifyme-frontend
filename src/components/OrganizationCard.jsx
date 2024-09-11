// MUI import
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/material/styles";

// Custom import
import DashboardContainer from "./styles/DashboardContainer";
import theme from "../assets/themes";


// Styled tag component
const Tag = styled(Typography)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.customColors.white,
    borderRadius: theme.customShape.section,
    padding: theme.spacing(0.7, 1.5),
    fontSize: theme.typography.body2.fontSize,
    display: "inline-block",
    marginBottom: theme.spacing(2),
    fontWeight: theme.fontWeight.bold,
}));

// Styled Social media icon component
const SocialIconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
    gap: theme.spacing(2),
    color: theme.palette.primary.dark,
}));

// Styled oraganization logo component
const OrganizationLogo = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
}));

export default function OrganizationCard({
    tag = "ORGANIZATION", // Default tag
    title = "Above & Beyond School", // Default title
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // Default description
    logoUrl, // Organization logo URL
    date, // Date in Mon DD, YYYY format
    showFacebook = true, // Show or hide Facebook logo
    showLinkedIn = true, // Show or hide LinkedIn logo
}) {
    return (
        // ============ Start organization card component ============
        <DashboardContainer>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" }, // Stack vertically on mobile, horizontally on larger screens
                    justifyContent: "space-between",
                    padding: { xs: 2, md: 4 }, // Less padding on mobile
                    marginTop: 2,
                    borderRadius: theme.customShape.section,
                    boxShadow: 3,
                    alignItems: "center",
                }}
            >
                {/* Content on left side */}
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}> {/* Center content on mobile */}
                    <CardContent>
                        {/* Tag */}
                        {tag && <Tag>{tag}</Tag>}

                        {/* Title style */}
                        {title && (
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    fontWeight: theme.fontWeight.bold,
                                    fontSize: { xs: "1.2rem", md: "1.5rem" }, // Adjust font size for mobile screen
                                }}
                            >
                                {title}
                            </Typography>
                        )}

                        {/* Description style */}
                        {description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    maxWidth: 600,
                                    width: "100%",
                                    fontWeight: theme.fontWeight.semiBold,
                                    fontSize: { xs: "0.875rem", md: "1rem" }, // Adjust font size for mobile screen
                                }}
                            >
                                {description}
                            </Typography>
                        )}

                        {/* Social Icons style */}
                        <SocialIconWrapper
                            sx={{
                                justifyContent: { xs: "center", md: "flex-start" }, // Center icons on mobile
                            }}
                        >
                            {showFacebook && <FacebookIcon sx={{ fontSize: { xs: 40, md: 50 } }} />} {/* Smaller icons on mobile */}
                            {showLinkedIn && <LinkedInIcon sx={{ fontSize: { xs: 40, md: 50 } }} />} {/* Smaller icons on mobile */}
                        </SocialIconWrapper>
                    </CardContent>
                </Box>

                {/* Content on right side */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "center", md: "flex-end" }, // Center content on mobile
                        justifyContent: "flex-end",
                        flexDirection: "column",
                        padding: 2,
                    }}
                >
                    {/* Organization Logo */}
                    {logoUrl ? (
                        <OrganizationLogo src={logoUrl} alt={title} />
                    ) : (
                        <OrganizationLogo>{title.charAt(0)}</OrganizationLogo> // Fallback to first letter if no logo
                    )}

                    {/* Date style */}
                    {date && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                marginTop: { xs: 1, md: 2 },
                                fontSize: { xs: "0.75rem", md: "0.875rem" }, // Smaller font on mobile
                            }}
                        >
                            {date}
                        </Typography>
                    )}
                </Box>
            </Card>
        </DashboardContainer>

        // ============ End organization card component ============

    );
}
