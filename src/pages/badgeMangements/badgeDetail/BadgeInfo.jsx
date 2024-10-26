// React Import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// MUI Import
import { Box, Typography, Chip, Stack, Button, Modal, useMediaQuery } from "@mui/material";
import theme from "../../../assets/themes";
import { BorderColorRounded, ConfirmationNumber, Delete } from "@mui/icons-material";

// Custom Import
import IssuerBadgeButton from "../IssuerBadgeButton";
import IssueToEarnerButton from "../IssueToEarnerButton";
import ClaimBadgeButton from "../../../components/ClaimBadgeButton";
import MoreMenu from "../../../components/MoreMenu";

// Api Import
import { useDeleteBadgeMutation } from "../../../store/api/badgeManagement/badgeApi";

const BadgeInfo = ({ badge, userRole, activeUserId, emails, onGetEmails }) => {
    // define breakpoint of the screen
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
    const navigate = useNavigate();

    const [deleteBadge, { refetch }] = useDeleteBadgeMutation();

    const { control } = useForm();

    // assign variable from props that has fetch value
    const result = badge;

    // assign variable to get achievement id to update
    const achieveId = badge?.Achievements?.find(({ badgeClassId }) => badgeClassId === badge.id).id;
    // assign variables for date
    const createdAt = result?.createdAt ? result.createdAt.split("T")[0] : "N/A";
    const expiredDate = result?.expiredDate ? result.expiredDate.split("T")[0] : "N/A";

    // convert duration from milli second into date
    const durationInMs = result?.duration || 0;
    const days = durationInMs / (1000 * 60 * 60 * 24);

    // Define role-based access for tab content
    const hasAccess = ["issuer", "earner"].includes(userRole);

    const handleDeleteBadge = async (id) => {
        try {
            await deleteBadge(id).unwrap();
            navigate("/dashboard/management/badges");
            refetch();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // More Menu props
    const menuItems = [
        {
            label: "Update badge",
            icon: <BorderColorRounded color="primary" />,
            onClick: () => navigate(`/dashboard/management/badges/editBadge/${result?.id}`),
        },
        { label: "Delete badge", icon: <Delete color="error" />, onClick: () => handleDeleteBadge(result?.id) },
    ];

    // Define sub-component to use in tab content
    const DetailItem = ({ label, value, isSmallScreen }) => (
        <Stack sx={{ flexDirection: isSmallScreen ? "column" : "row", gap: { md: 5, sm: 3, xss: 1 } }}>
            <Typography
                sx={{
                    fontSize: theme.typography.h5,
                    fontWeight: theme.fontWeight.bold,
                    width: isSmallScreen ? "100%" : "180px",
                    textAlign: { sm: "end", xss: "start" },
                }}
                color={theme.palette.text.primary}
            >
                {label}:
            </Typography>
            <Typography
                sx={{ fontSize: theme.typography.h5, width: isSmallScreen ? "100%" : "500px" }}
                color={theme.palette.text.secondary}
            >
                {value}
            </Typography>
        </Stack>
    );
    return (
        <Stack sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            <Box
                sx={{
                    position: "relative",
                    padding: 3,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.card,
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: theme.palette.customColors.white,
                }}
            >
                <Stack
                    direction={{ xss: "column", md: "row" }}
                    gap={2}
                    sx={{
                        width: "100%",
                    }}
                >
                    {/* Badge/Logo Image */}
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 260,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        component="img"
                        src={result?.imageUrl}
                    />

                    {/* Badge Details */}
                    <Stack sx={{ gap: 2, justifyContent: "center" }}>
                        <Stack sx={{ gap: 1 }}>
                            <Typography variant="h3" color={theme.palette.text.primary} fontWeight={theme.fontWeight.semiBold}>
                                {result?.name}
                            </Typography>

                            <Typography sx={{ fontSize: theme.typography.body1 }} color={theme.palette.text.secondary}>
                                Issued By {`${result?.Issuer?.User?.firstName} ${result?.Issuer?.User?.lastName}`}
                            </Typography>

                            <Typography sx={{ fontSize: theme.typography.body1 }} color={theme.palette.text.secondary}>
                                Created Date: {createdAt}
                            </Typography>
                        </Stack>

                        {/* Action Buttons */}
                        {hasAccess && (
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: "flex",
                                    gap: 1,
                                    flexDirection: { sm: "row", xs: "column" },
                                }}
                            >
                                {userRole === "issuer" ? (
                                    <>
                                        <IssuerBadgeButton
                                            onGetEmail={onGetEmails}
                                            control={control}
                                            issuerId={activeUserId}
                                            badgeId={result.id}
                                            achievementId={achieveId || []}
                                        />
                                        {/* <IssueToEarnerButton emails={selectedEmails} badgeId={result?.id || []} /> */}
                                        <IssueToEarnerButton achievementId={achieveId || []} />
                                    </>
                                ) : (
                                    <ClaimBadgeButton
                                        badgeClassId={result?.id || ""}
                                        earnerId={activeUserId || ""}
                                        achievementIds={achieveId}
                                    />
                                )}
                            </Box>
                        )}
                    </Stack>
                </Stack>
                <MoreMenu
                    menuItems={menuItems}
                    iconStyles={{
                        color: "black",
                        position: "absolute",
                        right: { md: "3%", xss: "5%" },
                        display: userRole !== "issuer" ? "none" : "block",
                    }}
                />
            </Box>

            <Box
                sx={{
                    backgroundColor: theme.palette.customColors.white,
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.card,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        margin: isSmallScreen ? 1 : 3,
                        gap: isSmallScreen ? 2 : 1,
                        flexWrap: "wrap",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            flex: 1,
                            width: "100%",
                        }}
                    >
                        <DetailItem
                            label="Description"
                            value={result?.description || "No description available"}
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Issuer"
                            value={`${result?.Issuer?.User?.firstName} ${result?.Issuer?.User?.lastName}` || "Unknown Issuer"}
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Criteria"
                            value={
                                result?.Criterias?.length
                                    ? result?.Criterias.map((item, index) => (
                                          <Typography component="span" key={index}>
                                              {item.narrative}
                                          </Typography>
                                      ))
                                    : "No criteria provided"
                            }
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Issued Date"
                            value={result.createdAt ? result.createdAt.split("T")[0] : "N/A"}
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Badge’s Expiry Date"
                            value={expiredDate || "No expiry date"}
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Duration"
                            value={days ? `${days} days` : "No duration available"}
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Achievement Type"
                            value={
                                result?.Achievements?.length
                                    ? result?.Achievements.map((achievement) => achievement.AchievementType?.name).join(", ")
                                    : "No achievement type available"
                            }
                            isSmallScreen={isSmallScreen}
                        />
                        <DetailItem
                            label="Tags"
                            value={
                                result?.tags
                                    ? result.tags.split(",").map((tag, index) => (
                                          <Chip
                                              key={index}
                                              label={tag}
                                              sx={{
                                                  marginRight: 1,
                                                  marginBottom: 1,
                                                  backgroundColor: theme.palette.primary.light,
                                                  color: theme.palette.primary.main,
                                                  fontWeight: theme.fontWeight.bold,
                                              }}
                                          />
                                      ))
                                    : "No tags"
                            }
                            isSmallScreen={isSmallScreen}
                        />
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
};

export default BadgeInfo;
