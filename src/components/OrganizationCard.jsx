// MUI import
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Typography, Card, CardContent, Avatar, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import GmailLogoPng from "../assets/icons/GmailLogoPng.webp";
import LinkIconPng from "../assets/icons/LinkIcon.svg";

// Custom import
import theme from "../assets/themes";
import { EmailRounded, Link } from "@mui/icons-material";

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
    width: theme.spacing(15),
    height: theme.spacing(15),
}));
/**
 * OrganizationCard Component
 *
 * A card component that displays information about an organization, including its logo,
 * title, description, social media links, and date.
 *
 * @param {string} [tag="ORGANIZATION"] - The tag to display on the card.
 * @param {string} [title="Above & Beyond School"] - The title of the organization.
 * @param {string} [description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."] - A brief description of the organization.
 * @param {string} [logoUrl] - The URL of the organization's logo image.
 * @param {string} [date] - The date associated with the organization in "Mon DD, YYYY" format.
 * @param {boolean} [showFacebook=true] - Flag to show or hide the Facebook icon.
 * @param {boolean} [showLinkedIn=true] - Flag to show or hide the LinkedIn icon.
 * @returns {JSX.Element} A styled card displaying organization details.
 *
 * @example
 * ===== Usage =====
 *   <OrganizationCard
 *       title={institution?.institutionName}
 *       description={institution?.institutionBio}
 *       logoUrl={institution?.User.profileImage}
 *   />
 */
const OrganizationCard = ({
    // Default tag
    tag = "ORGANIZATION",
    // Default title
    title = "Above & Beyond School",
    // Default description
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    // Organization logo URL
    logoUrl,
    // Date in Mon DD, YYYY format
    date,
    // Show or hide Facebook logo
    showFacebook = true,
    // Show or hide LinkedIn logo
    showLinkedIn = true,
    // Org link
    email,
    // Org link
    orgLink,
}) => {
    return (
        // ============ Start Organization Card ============ //
        <Box>
            <Card
                sx={{
                    display: "flex",
                    // Stack vertically on mobile, horizontally on larger screens
                    flexDirection: { xss: "column", md: "row" },
                    justifyContent: "space-between",
                    padding: { xs: 2, md: 4 },
                    marginTop: { xs: 2, md: 4, xl: 5 },
                    borderRadius: theme.customShape.section,
                    boxShadow: theme.customShadows.default,
                    alignItems: "center",
                }}
            >
                {/* Content on left side */}
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
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
                                    fontSize: { xs: "1.2rem", md: "1.5rem" },
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
                                    fontSize: { xs: "0.875rem", md: "1rem" },
                                }}
                            >
                                {description}
                            </Typography>
                        )}

                        {/* Social Icons of Organization */}
                        <SocialIconWrapper
                            sx={{
                                justifyContent: { xs: "center", md: "flex-start" },
                                alignItems: "center",
                            }}
                        >
                            {email ? (
                                <Tooltip title={`Email: ${email}`} arrow>
                                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                                        <img src={GmailLogoPng} alt="email" width={40} height={40} />
                                    </a>
                                </Tooltip>
                            ) : (
                                <Tooltip title="No email available" arrow>
                                    <span>
                                        <EmailRounded sx={{ fontSize: { xs: 42 }, color: theme.palette.customColors.gray300 }} />
                                    </span>
                                </Tooltip>
                            )}

                            {orgLink ? (
                                <Tooltip title={`Link: ${orgLink}`} arrow>
                                    <a href={orgLink} target="_blank" rel="noopener noreferrer">
                                        <img src={LinkIconPng} alt="link" width={32} />
                                    </a>
                                </Tooltip>
                            ) : (
                                <Tooltip title="No link available" arrow>
                                    <span>
                                        <Link sx={{ fontSize: { xs: 42 }, color: theme.palette.customColors.gray300 }} />
                                    </span>
                                </Tooltip>
                            )}
                        </SocialIconWrapper>
                    </CardContent>
                </Box>

                {/* Content on right side */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: { xs: "center", md: "flex-end" },
                        justifyContent: "flex-end",
                        flexDirection: "column",
                        padding: 2,
                    }}
                >
                    {/* Organization Logo */}
                    {logoUrl ? (
                        <OrganizationLogo src={logoUrl} alt={title} />
                    ) : (
                        <OrganizationLogo>{title.charAt(0)}</OrganizationLogo>
                    )}

                    {/* Date style */}
                    {date && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                marginTop: { xs: 1, md: 2 },
                                fontSize: { xs: "0.75rem", md: "0.875rem" },
                            }}
                        >
                            {date}
                        </Typography>
                    )}
                </Box>
            </Card>
        </Box>

        // ============ End Organization Card ============ //
    );
};

export default OrganizationCard;
