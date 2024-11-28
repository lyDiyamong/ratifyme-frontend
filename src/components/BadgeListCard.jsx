// React Import
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// MUI import
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Stack, Tooltip, useMediaQuery } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorIcon from "@mui/icons-material/Error";

// Custom import
import theme from "../assets/themes";
import StatusCode from "../assets/images/NoData.svg";
import GoldBadge from "../assets/images/DiamondBadge.svg";

const BadgeListCard = ({ badges, onView, total, refetch }) => {
    const handleView = (id) => {
        onView(id);
        // Trigger refetch after viewing the badge to update the data
        refetch();
    };

    const { roleId } = useSelector((state) => state.global);
    const totalBadge = typeof total === "number" ? total : total?.length;

    const [afterCheck, setAfterCheck] = useState([]);

    useEffect(() => {
        const processBadges = (badges) => {
            if (!badges || badges.length === 0) return { issuedBadge: [], claimedBadge: [] };

            // This will store one issuedOn and one claimedOn value per badge
            const processedBadges = badges.map((badge) => {
                let issuedOnValue = null;
                let claimedOnValue = null;

                // Iterate through each Achievement in the current badge
                for (const achievement of badge?.Achievements || []) {
                    if (achievement.Earners.length > 0) {
                        for (const earner of achievement.Earners) {
                            const issuedOn = earner.EarnerAchievements?.issuedOn;
                            const claimedOn = earner.EarnerAchievements?.claimedOn;

                            // Capture the first valid issuedOn
                            if (!issuedOnValue && issuedOn && issuedOn !== "null") {
                                issuedOnValue = issuedOn;
                            }

                            // Capture the first valid claimedOn
                            if (!claimedOnValue && claimedOn && claimedOn !== "null") {
                                claimedOnValue = claimedOn;
                            }

                            // Stop further checks if both issuedOn and claimedOn are found
                            if (issuedOnValue && claimedOnValue) break;
                        }
                    }

                    // Exit if both values are found for this badge
                    if (issuedOnValue && claimedOnValue) break;
                }

                return { issuedOn: issuedOnValue, claimedOn: claimedOnValue };
            });

            // Separate arrays for issued and claimed values
            const issuedBadge = processedBadges.map((badge) => badge.issuedOn);
            const claimedBadge = processedBadges.map((badge) => badge.claimedOn);

            return { issuedBadge, claimedBadge };
        };

        const { issuedBadge, claimedBadge } = processBadges(badges);

        // Set afterCheck based on roleId
        setAfterCheck(roleId === 4 ? claimedBadge : issuedBadge);
    }, [badges, roleId]);

    return (
        <Box my={3}>
            {totalBadge === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center" p={4}>
                    <CardMedia component="img" image={StatusCode} alt="No badges found" sx={{ maxWidth: 400, width: "100%" }} />
                    <Typography variant="h6" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                        No badges Found
                    </Typography>
                </Box>
            ) : (
                <>
                    <Typography variant="h6" sx={{ pb: 2 }}>
                        Total Badges: {total || 0}
                    </Typography>
                    <Grid container spacing={2}>
                        {badges?.map((badge, index) => (
                            <Grid item xss={12} sm={6} md={4} lg={3} xl={2.4} key={badge?.id}>
                                <Card
                                    sx={{
                                        maxWidth: { xss: "100%", lg: 360 },
                                        width: "100%",
                                        height: "100%",
                                        boxShadow: theme.customShadows.default,
                                        borderRadius: theme.shape.borderRadius,
                                        padding: 2,
                                        transition: "transform 0.3s ease",
                                        "&:hover": { transform: "scale(1.02)" },
                                    }}
                                >
                                    <Stack alignItems="center" position="relative">
                                        <Box
                                            minHeight={140}
                                            minWidth={140}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "100%",
                                                height: "100%",
                                                maxWidth: 170,
                                                maxHeight: 170,
                                                m: 3
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={badge?.imageUrl || GoldBadge}
                                                alt={badge?.name || "Badge Image"}
                                                sx={{
                                                    width: "100%",
                                                    height: "auto",
                                                    minHeight: 170,
                                                    objectFit: "contain",
                                                }}
                                            />
                                            {(roleId === 3 || roleId === 4) &&
                                                (typeof afterCheck?.[index] === "string" ? (
                                                    <CheckCircleRoundedIcon
                                                        sx={{
                                                            display: "block",
                                                            position: "absolute",
                                                            right: "1px",
                                                            top: "1px",
                                                            color: theme.palette.primary.main,
                                                        }}
                                                    />
                                                ) : (
                                                    <Tooltip
                                                        title={roleId === 4 ? "Not yet claimed" : "Not issued yet"}
                                                        arrow
                                                        placement="right-end"
                                                    >
                                                        <ErrorIcon
                                                            sx={{
                                                                position: "absolute",
                                                                right: "1px",
                                                                top: "1px",
                                                                color: theme.palette.customColors.gray300,
                                                            }}
                                                        />
                                                    </Tooltip>
                                                ))}
                                        </Box>
                                    </Stack>
                                    <CardContent>
                                        <Stack>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: theme.fontWeight.bold,
                                                    overflow: "hidden",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                }}
                                            >
                                                {badge?.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    pt: 1,
                                                    color: theme.palette.text.disabled,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {`${badge?.Issuer?.User?.firstName} ${badge?.Issuer?.User?.lastName} | ${badge?.Institution?.institutionName}`}
                                            </Typography>
                                            <Typography
                                                variant="body3"
                                                sx={{
                                                    pt: 1,
                                                    color: theme.palette.text.disabled,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {`${badge?.description}`}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <Box display="flex" justifyContent="flex-end" p={1}>
                                        <Button
                                            sx={{
                                                color: theme.palette.customColors.white,
                                                backgroundColor: theme.palette.primary.main,
                                                textTransform: "none",
                                                fontWeight: theme.fontWeight.bold,
                                                borderRadius: theme.customShape.btn,
                                            }}
                                            onClick={() => handleView(badge?.id)}
                                        >
                                            Visit
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default BadgeListCard;
