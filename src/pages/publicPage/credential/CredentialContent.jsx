// React library import
import { useState } from "react";

// MUI import
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import { CalendarMonthOutlined, LinkedIn, Share, VerifiedUserOutlined, VerifiedUserRounded } from "@mui/icons-material";

// Custom import
import AchievementTypesCred from "./AchievementTypesCred";
import BadgeDetailsCred from "./BadgeDetailsCred";
import IssuerByCred from "./IssuerByCred";
import ShareSocialModal from "./ShareSocialModal";
import SkillsCred from "./SkillsCred";
import FormatDate from "../../../utils/formatDate";
import theme from "../../../assets/themes";

const CredentialContent = ({ earnerData, achieveData, credUrl, credId, verifyCred }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Grid container spacing={2} my={2}>
            {/* Left Sticky Section */}
            <Grid item xss={12} md={4}>
                <Stack
                    sx={{
                        position: "sticky",
                        top: 20,
                        gap: 2,
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
                                    ISSUED TO
                                </Typography>

                                <Typography variant="h3" fontWeight={theme.fontWeight.semiBold} gutterBottom>
                                    {earnerData?.User?.firstName} {earnerData?.User?.lastName}
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
                            <ShareSocialModal
                                open={isModalOpen}
                                handleClose={handleCloseModal}
                                credUrl={credUrl}
                                badgeImg={achieveData?.BadgeClass?.imageUrl}
                            />

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

                    <Stack
                        elevation={3}
                        sx={{
                            p: 2,
                            backgroundColor: "#F3FAFA",
                            borderRadius: theme.customShape.input,
                            border: "1px solid #C5E3E3",
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack gap={1}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <VerifiedUserRounded sx={{ fontSize: 16, color: "#0AA4A5" }} />
                                    <Typography variant="body2" color="#0AA4A5" fontWeight="bold">
                                        Credential Verification
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="body2" fontWeight="bold">
                                        Issue On:{"  "}
                                    </Typography>
                                    <Typography variant="body2">{FormatDate(achieveData?.BadgeClass?.startedDate)}</Typography>
                                </Box>
                            </Stack>

                            {/* Share Award Button */}
                            <Button
                                variant="contained"
                                startIcon={<VerifiedUserOutlined />}
                                sx={{
                                    backgroundColor: "#0AA4A5",
                                    fontWeight: theme.fontWeight.bold,
                                    color: theme.palette.customColors.white,
                                    textTransform: "none",
                                }}
                                onClick={verifyCred}
                                open={open}
                                // handleClose={handleOpen}
                                fullWidth
                            >
                                Verify Credential
                            </Button>

                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body3" fontWeight="bold">
                                    ID:{"  "}
                                </Typography>
                                <Typography variant="body3" color="#0AA4A5" fontWeight="bold">
                                    {credId}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>

            {/* Right Scrollable Section */}
            <Grid item xss={12} md={8}>
                {/* Stack for all content sections */}
                <Stack spacing={2} sx={{ height: "100%", overflowY: "auto" }}>
                    {/* Issuer By Section */}
                    <IssuerByCred
                        IssuerName={`${achieveData?.BadgeClass?.Issuer?.User?.firstName} ${achieveData?.BadgeClass?.Issuer?.User?.lastName}`}
                        institutionName={earnerData?.Issuer?.Institution?.institutionName}
                    />

                    {/* Badge Details card Section */}
                    <BadgeDetailsCred
                        BadgeName={achieveData?.BadgeClass?.name}
                        StartDate={FormatDate(achieveData?.BadgeClass?.startedDate)}
                        EndDate={FormatDate(achieveData?.BadgeClass?.endDate)}
                        ExpiredDate={FormatDate(achieveData?.BadgeClass?.expiredDate)}
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

                            <Typography>{achieveData?.BadgeClass?.description}</Typography>
                        </Stack>
                    </Box>

                    {/* Criteria Section */}
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
                                    Criteria
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    This Criteria is related to the Badge.
                                </Typography>
                            </Stack>

                            <Typography>{achieveData?.BadgeClass?.Criterias[0]?.narrative}</Typography>
                        </Stack>
                    </Box>

                    {/* Skills Section */}
                    <SkillsCred tags={achieveData?.BadgeClass?.tags} />

                    {/* Achievement Types Section */}
                    <AchievementTypesCred achievementTypes={achieveData?.BadgeClass?.Achievements} />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default CredentialContent;
