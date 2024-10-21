import { Box, Grid, Typography, Button, Stack, Avatar, CardContent, Card, Tooltip } from "@mui/material";
import theme from "../../../assets/themes";
import IssuerSvg from "../../../assets/icons/IssuerSvg.svg";
import {
    AccountBalanceOutlined,
    CalendarMonthOutlined,
    EmojiEventsOutlined,
    EventAvailableOutlined,
    LinkedIn,
    LinkOutlined,
    PendingActionsOutlined,
    Share,
    VerifiedRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShareSocialModal from "./ShareSocialModal";

const CustomTooltip = ({ title, children }) => {
    return (
        <Tooltip
            title={
                <Typography variant="body2" sx={{ color: "white" }}>
                    {title}
                </Typography>
            }
            arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: "black",
                        borderRadius: "8px",
                        p: 1,
                    },
                },
                arrow: {
                    sx: {
                        color: "black",
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

const CredentialContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Grid container spacing={2} my={2}>
            {/* Left Sticky Section */}
            <Grid item xs={12} md={4}>
                <Box
                    sx={{
                        position: "sticky",
                        top: 20,
                    }}
                >
                    <Stack
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            // boxShadow: theme.customShadows.default,
                            // border: `1px solid ${theme.palette.customColors.gray200}`,
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack>
                                <Typography variant="body3" fontWeight="bold" color="primary" gutterBottom>
                                    ISSUER TO
                                </Typography>

                                <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} gutterBottom>
                                    Sreang Lyhour
                                </Typography>
                            </Stack>

                            {/* Share Award Button */}
                            <Button
                                variant="contained"
                                startIcon={<Share />}
                                sx={{
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.palette.customColors.white,
                                    textTransform: "none",
                                }}
                                onClick={handleOpenModal}
                                fullWidth
                            >
                                Share Award
                            </Button>

                            {/* Share Modal Component */}
                            <ShareSocialModal open={isModalOpen} handleClose={handleCloseModal} />

                            <Button
                                component="a"
                                variant="outlined"
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://directly-upload-s3-bucket-test.s3.ap-southeast-2.amazonaws.com/Certificate/certificate.png&text=Thrilled%20to%20have%20earned%20my%20Unity%20Pro%3A%20Advanced%20Game%20Development%20Techniques%20credential%20from%20CodeDevs!%20Grateful%20for%20the%20opportunity%20to%20grow%20and%20achieve%20this%20milestone.%20%23lifelonglearning%20%23achievement`}
                                target="_blank"
                                startIcon={<LinkedIn />}
                                sx={{
                                    fontWeight: theme.fontWeight.bold,
                                    textTransform: "none",
                                }}
                                fullWidth
                            >
                                LinkedIn Profile
                            </Button>

                            <Typography>Share your success with the world on your social media platforms.</Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Grid>

            {/* Right Scrollable Section */}
            <Grid item xs={12} md={8}>
                {/* Stack for all content sections */}
                <Stack spacing={2} sx={{ height: "100%", overflowY: "auto" }}>
                    {/* Section 1 */}
                    <Box
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            border: "1px solid #F5F5F7",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 1,
                        }}
                    >
                        <Stack flexDirection="row" alignItems="center" gap={1}>
                            <Avatar src={IssuerSvg} alt="Profile" sx={{ width: 56, height: 56 }} />
                            <Stack>
                                <Typography variant="body3" fontWeight="bold" color="primary" gutterBottom>
                                    ISSUER BY
                                </Typography>

                                <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} gutterBottom>
                                    Rotha SAMON
                                </Typography>
                            </Stack>
                        </Stack>

                        <CustomTooltip title="RatifyMe confirms that this issuer is an officially registered organization.">
                            <Button
                                startIcon={<VerifiedRounded />}
                                variant="text"
                                sx={{
                                    color: "#0AA4A5",
                                    backgroundColor: "#F3FAFA",
                                    border: "1px solid #0AA4A5",
                                    maxHeight: 25,
                                    cursor: "default",
                                    "&:hover": {
                                        cursor: "help",
                                    },
                                }}
                            >
                                Verified
                            </Button>
                        </CustomTooltip>
                    </Box>

                    <Box
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack>
                                <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                    Badge Details
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    This Badge Details is related to the Badge.
                                </Typography>
                            </Stack>

                            <Card
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#fff",
                                    border: "1px solid #F5F5F7",
                                }}
                            >
                                <CardContent
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    <AccountBalanceOutlined
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: 30,
                                        }}
                                    />
                                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                        Badge Name
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Avdance Java of the RUPP Competitetion
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Stack
                                sx={{
                                    justifyContent: "start",
                                    gap: 4,
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    "& > *": {
                                        flexBasis: "calc(33.33% - 24px)",
                                        "@media (max-width: 1500px)": {
                                            flexBasis: "calc(33.33% - 24px)",
                                        },
                                        "@media (max-width: 1200px)": {
                                            flexBasis: "calc(50% - 24px)",
                                        },
                                        "@media (max-width: 600px)": {
                                            flexBasis: "100%",
                                        },
                                    },
                                }}
                            >
                                <Card
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 2,
                                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#fff",
                                        border: "1px solid #F5F5F7",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <EmojiEventsOutlined
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: 30,
                                            }}
                                        />
                                        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                            Criteria
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Avdance Java
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Card
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 2,
                                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#fff",
                                        border: "1px solid #F5F5F7",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <PendingActionsOutlined
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: 30,
                                            }}
                                        />
                                        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                            Start Date
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            22 / 12/ 2024
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Card
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 2,
                                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#fff",
                                        border: "1px solid #F5F5F7",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <EventAvailableOutlined
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: 30,
                                            }}
                                        />
                                        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                            End Date
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            01 / 01/ 2025
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Section 2 */}
                    <Box
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack>
                                <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                    Description
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    This Description is related to the Badge.
                                </Typography>
                            </Stack>

                            <Typography>
                                Unity Pro: Advanced Game Development Techniques is an intensive training program designed to
                                elevate intermediate Unity developers into expert game creators 🎮 This advanced course delves
                                deep into the intricacies of Unity, exploring sophisticated techniques that will push your game
                                development skills to the next level. Participants will master complex scripting, optimize game
                                performance, and implement advanced AI and procedural generation.
                            </Typography>
                        </Stack>
                    </Box>

                    <Box
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            // boxShadow: theme.customShadows.default,
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack>
                                <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                    Skills
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    This Skills is related to the Badge.
                                </Typography>
                            </Stack>

                            <Stack
                                sx={{
                                    justifyContent: "start",
                                    gap: 4,
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    "& > *": {
                                        flexBasis: "calc(33.33% - 24px)",
                                        "@media (max-width: 1500px)": {
                                            flexBasis: "calc(33.33% - 24px)",
                                        },
                                        "@media (max-width: 1200px)": {
                                            flexBasis: "calc(50% - 24px)",
                                        },
                                        "@media (max-width: 600px)": {
                                            flexBasis: "100%",
                                        },
                                    },
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Java
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Python
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    JavaScript
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Agular
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    React Native
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Node Js
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack>
                                <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                    Achievement Types
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    This Achievement Types is related to the Badge.
                                </Typography>
                            </Stack>

                            <Stack
                                sx={{
                                    justifyContent: "start",
                                    gap: 4,
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    "& > *": {
                                        flexBasis: "calc(33.33% - 24px)",
                                        "@media (max-width: 1500px)": {
                                            flexBasis: "calc(33.33% - 24px)",
                                        },
                                        "@media (max-width: 1200px)": {
                                            flexBasis: "calc(50% - 24px)",
                                        },
                                        "@media (max-width: 600px)": {
                                            flexBasis: "100%",
                                        },
                                    },
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Certificate
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Award
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ pointerEvents: "none", borderRadius: theme.customShape.btn, borderColor: "#C7E4FF" }}
                                >
                                    Competition
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.customColors.white,
                            borderRadius: theme.customShape.input,
                            border: "1px solid #F5F5F7",
                        }}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h4" fontWeight={theme.fontWeight.semiBold}>
                                Addition Element
                            </Typography>

                            <Link to="http://localhost:5173/credential">
                                <Stack flexDirection="row" gap={1}>
                                    <LinkOutlined />
                                    <Typography>Addition Link</Typography>
                                </Stack>
                            </Link>

                            <Stack flexDirection="row" gap={1}>
                                <CalendarMonthOutlined />
                                <Typography>Expiration Date: 22/ 12/ 2030</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default CredentialContent;
