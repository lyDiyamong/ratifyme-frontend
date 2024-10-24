// MUI import
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Stack } from "@mui/material";

// Custom import
import StatusCode from "../assets/images/NoData.svg";
import GoldBadge from "../assets/images/DiamondBadge.svg";
import theme from "../assets/themes";

// =========== Start BadgeListCard ===========
const BadgeListCard = ({ badges, onView, total }) => {
    const handleView = (id) => {
        onView(id);
    };
    const totalBadge = typeof total === "number" ? total : total.length;

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
                        {badges?.map((badge) => (
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
                                    <Stack alignItems="center">
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
                                                    maxHeight: 170,
                                                    objectFit: "contain",
                                                }}
                                            />
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
// =========== End BadgeListCard ===========
