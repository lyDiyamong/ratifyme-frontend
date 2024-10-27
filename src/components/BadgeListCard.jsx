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
    };
    const { roleId } = useSelector((state) => state.global);
    const totalBadge = typeof total === "number" ? total : total?.length;

    const [afterCheck, setAfterCheck] = useState([]);

    useEffect(() => {
        const processBadges = (badges) => {
            if (!badges) return { issuedBadge: [], claimedBadge: [] };

            const achievements = badges.flatMap(({ Achievements }) => Achievements) || [];
            const uniqueBadges = [];
            const seenBadgeIds = new Set();
            for (const achievement of achievements) {
                if (!seenBadgeIds.has(achievement.badgeClassId)) {
                    uniqueBadges.push(achievement);
                    seenBadgeIds.add(achievement.badgeClassId);
                }
            }

            const issuedBadge = uniqueBadges.map((item) => {
                if (!item.Earners || item.Earners.length === 0) return null;
                return item.Earners.some((earner) => earner.EarnerAchievements?.issuedOn !== null)
                    ? item.Earners.find((earner) => earner.EarnerAchievements?.issuedOn)?.EarnerAchievements?.issuedOn
                    : null;
            });
            console.log(issuedBadge);

            const claimedBadge = uniqueBadges.map((item) =>
                item.Earners
                    ? item.Earners.some((earner) => earner.EarnerAchievements?.claimedOn !== null)
                        ? item.Earners.find((earner) => earner.EarnerAchievements?.claimedOn)?.EarnerAchievements?.claimedOn
                        : null
                    : null,
            );

            return { issuedBadge, claimedBadge };
        };

        // Process badges based on current badges and set `afterCheck` accordingly
        const { issuedBadge, claimedBadge } = processBadges(badges);
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
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={badge?.id}>
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
                                            {/* {(roleId === 3 || roleId === 4) &&
                                                (afterCheck[index] === null ? (
                                                    <Tooltip title={roleId === 4 ? "Not yet claimed" : "Not issued yet"} arrow>
                                                        <ErrorIcon />
                                                    </Tooltip>
                                                ) : (
                                                    <CheckCircleRoundedIcon />
                                                ))} */}
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
                                            {/* Issuer Name and Instituton Name */}
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
