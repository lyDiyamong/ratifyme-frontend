// React Import
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

// MUI Import
import { Box, Typography, Chip, Stack, Button, Modal, useMediaQuery } from "@mui/material";
import theme from "../../../assets/themes";
import { BorderColorRounded, ConfirmationNumber, Delete, DeleteForeverOutlined } from "@mui/icons-material";

// Custom Import
import IssuerBadgeButton from "../IssuerBadgeButton";
import IssueToEarnerButton from "../IssueToEarnerButton";
import ClaimBadgeButton from "../../../components/ClaimBadgeButton";
import MoreMenu from "../../../components/MoreMenu";
import FormatDate from "../../../utils/formatDate";

// Api Import
import { useDeleteBadgeMutation } from "../../../store/api/badgeManagement/badgeApi";
import AlertMessage from "../../../components/alert/AlertMessage";
import AlertConfirmation from "../../../components/alert/AlertConfirmation";

const BadgeInfo = ({ badge, userRole, activeUserId, emails, onGetEmails }) => {
    // define breakpoint of the screen
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
    const navigate = useNavigate();

    // Delete Modal confirmation
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const [deleteBadge, { refetch }] = useDeleteBadgeMutation();

    const badgeEarner = badge?.Achievements[0]?.Earners?.length !== 0 ? null : true;

    const [hasEarner, setHasEarner] = useState(badgeEarner);

    const { control } = useForm();

    // assign variable from props that has fetch value
    const result = badge;

    // assign variable to get achievement id to update
    const achieveId = badge?.Achievements?.find(({ badgeClassId }) => badgeClassId === badge.id)?.id;
    // assign variables for date

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
        { label: "Delete badge", icon: <Delete color="error" />, onClick: () => setIsDeleteModal(true) },
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
        <>
            <Stack sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
                {/* Start badge overview info card  */}
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
                                <Typography
                                    variant="h3"
                                    color={theme.palette.text.primary}
                                    fontWeight={theme.fontWeight.semiBold}
                                >
                                    {result?.name}
                                </Typography>

                                <Typography sx={{ fontSize: theme.typography.body1 }} color={theme.palette.text.secondary}>
                                    Issued By {`${result?.Issuer?.User?.firstName} ${result?.Issuer?.User?.lastName}`}
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
                                                setHasEarner={setHasEarner}
                                                onGetEmail={onGetEmails}
                                                control={control}
                                                issuerId={activeUserId}
                                                badgeId={result?.id}
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
                    <AlertConfirmation
                        open={isDeleteModal}
                        title="Delete your Badge"
                        message="Are you sure you want to delete this badge? If you delete this badge you will not be able to restore this badge. Click 'Delete' button to delete you badge"
                        onClose={() => setIsDeleteModal(false)}
                        onConfirm={() => handleDeleteBadge(result?.id)}
                        confirmText="Delete"
                        cancelText="Cancel"
                        iconBgColor={theme.palette.customColors.red100}
                        iconColor={theme.palette.customColors.red200}
                        confirmButtonColor={theme.palette.customColors.red300}
                        confirmButtonColorHover={theme.palette.customColors.red400}
                        icon={DeleteForeverOutlined}
                    />
                    {hasEarner && (
                        <MoreMenu
                            menuItems={menuItems}
                            iconStyles={{
                                color: "black",
                                position: "absolute",
                                right: { md: "3%", xss: "5%" },
                                display: userRole !== "issuer" ? "none" : "block",
                            }}
                        />
                    )}
                </Box>
                {/* End badge overview info card  */}

                {/* Start badge details info card  */}
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
                                label="Start Date"
                                // value={result.createdAt ? result.createdAt.split("T")[0] : "N/A"}
                                value={FormatDate(result?.startedDate)}
                                isSmallScreen={isSmallScreen}
                            />
                            <DetailItem
                                label="End Date"
                                value={FormatDate(result?.endDate) || "No end date"}
                                isSmallScreen={isSmallScreen}
                            />
                            <DetailItem
                                label="Duration"
                                value={days === 1 ? `${days} day` : days ? `${days} days` : "No duration available"}
                                isSmallScreen={isSmallScreen}
                            />
                            <DetailItem
                                label="Achievement Type"
                                value={
                                    result?.Achievements?.length
                                        ? result?.Achievements.map((achievement, index) => (
                                              <Chip
                                                  key={index}
                                                  label={achievement.AchievementType?.name}
                                                  sx={{
                                                      marginRight: 1,
                                                      marginBottom: 1,
                                                      backgroundColor: theme.palette.primary.light,
                                                      color: theme.palette.primary.main,
                                                      fontWeight: theme.fontWeight.bold,
                                                  }}
                                              />
                                          ))
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
                {/* End badge details info card  */}
            </Stack>
        </>
    );
};

export default BadgeInfo;
