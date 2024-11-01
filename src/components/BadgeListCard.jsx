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

            const issuedBadge = [];
            const claimedBadge = [];

            badges.forEach((badge) => {
                if (badge.Achievements && badge.Achievements.length > 0) {
                    badge.Achievements.forEach((achievement) => {
                        if (achievement.Earners && achievement.Earners.length > 0) {
                            achievement.Earners.forEach((earner) => {
                                const earnerAchievements = earner.EarnerAchievements;

                                // Process issuedOn dates
                                if (earnerAchievements && earnerAchievements.issuedOn) {
                                    issuedBadge.push(earnerAchievements.issuedOn);
                                }

                                // Process claimedOn dates (assuming you want to do this as well)
                                if (earnerAchievements.claimedOn) {
                                    claimedBadge.push(earnerAchievements.claimedOn);
                                }
                            });
                        }
                    });
                }
            });

            // Get unique dates for issued and claimed badges
            const uniqueIssuedBadge = [...new Set(issuedBadge)];
            const uniqueClaimedBadge = [...new Set(claimedBadge)];

            return { issuedBadge: uniqueIssuedBadge, claimedBadge: uniqueClaimedBadge };
        };
        const result = processBadges(badges);
        console.log(result);
        // Output will display arrays of unique issued and claimed badges based on the provided data.

        // Process badges based on current badges and set `afterCheck` accordingly
        const { issuedBadge, claimedBadge } = processBadges(badges);
        setAfterCheck(roleId === 4 ? claimedBadge : issuedBadge);
    }, [badges, roleId]);
    console.log(afterCheck);
    console.log(badges);


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
