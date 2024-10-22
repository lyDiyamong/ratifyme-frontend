import { Box, Grid, Typography, Button, Stack, CardContent, Card } from "@mui/material";
import theme from "../../../assets/themes";
import { CalendarMonthOutlined, CheckCircle, LinkedIn, LinkOutlined, Share } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShareSocialModal from "./ShareSocialModal";
import IssuerByCred from "./IssuerByCred";
import BadgeDetailsCred from "./BadgeDetailsCred";
import SkillsCred from "./SkillsCred";
import AchievementTypesCred from "./AchievementTypesCred";

const CredentialContent = ({ earnerData, achieveData, credUrl, credId }) => {
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
                            <ShareSocialModal open={isModalOpen} handleClose={handleCloseModal} credUrl={credUrl} />

                            <Button
                                component="a"
                                variant="outlined"
                                href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${achieveData?.BadgeClass?.name}&certUrl=${credUrl}&certId=${credId}`}
                                target="_blank"
                                startIcon={<LinkedIn />}
                                sx={{
                                    fontWeight: theme.fontWeight.bold,
                                    textTransform: "none",
                                }}
                                fullWidth
                            >
                                Add to LinkedIn Profile
                            </Button>

                            <Typography>Share your success with the world on your social media platforms.</Typography>
                        </Stack>
                    </Stack>

                    <Card
                        sx={{
                            maxWidth: 400,
                            border: "1px solid #EDEDED",
                            borderRadius: "8px",
                            backgroundColor: "#F5FAF9",
                        }}
                    >
                        <CardContent>
                            {/* Icon and Title */}
                            <Box display="flex" alignItems="center" mb={1}>
                                <CheckCircle sx={{ color: "#4CB5AE", mr: 1 }} />
                                <Typography variant="subtitle2" color="#4CB5AE" fontWeight="bold">
                                    CREDENTIAL VERIFICATION
                                </Typography>
                            </Box>

                            {/* Issue Date */}
                            <Typography variant="body2" color="textSecondary" mb={2}>
                                <strong>Issue date:</strong> October 9, 2024
                            </Typography>

                            {/* Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#4CB5AE",
                                    borderRadius: "8px",
                                    textTransform: "none", // keep button text normal case
                                    width: "100%",
                                    padding: "10px 0",
                                    "&:hover": {
                                        backgroundColor: "#3AA092",
                                    },
                                }}
                                startIcon={<CheckCircle />}
                            >
                                Verify Credential
                            </Button>

                            {/* ID */}
                            <Typography variant="caption" color="textSecondary" mt={2} display="block">
                                ID: 04786f98-6f2f-4b2b-8c0b-3cf1853c6bba
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>

            {/* Right Scrollable Section */}
            <Grid item xs={12} md={8}>
                {/* Stack for all content sections */}
                <Stack spacing={2} sx={{ height: "100%", overflowY: "auto" }}>
                    {/* Issuer By Section */}
                    <IssuerByCred IssuerName="Rotha SAMON" />

                    {/* Badge Details card Section */}
                    <BadgeDetailsCred
                        BadgeName="Avdance Java of the RUPP Competitetion"
                        Criteria="Avdance Java"
                        StartDate="22 / 12/ 2024"
                        EndDate="01 / 01/ 2025"
                    />

                    {/* Description Section */}
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

                    {/* Skills Section */}
                    <SkillsCred />

                    {/* Achievement Types Section */}
                    <AchievementTypesCred />

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
