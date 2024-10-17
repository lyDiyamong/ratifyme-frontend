// React Import
import { useState, useEffect } from "react";

// MUI import
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Stack,
    Pagination,
    useMediaQuery,
} from "@mui/material";

// Custom import
import theme from "../assets/themes";
import StatusCode from "../assets/images/NoData.svg";
import GoldBadge from "../assets/images/DiamondBadge.svg";

const BadgeListCard = ({ badges, onView, roleId, onPage, onNextPage, onPrevPage, total }) => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Dynamically set items per page based on screen size
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        setItemsPerPage(isLargeScreen ? 8 : isMediumScreen ? 6 : 4);
    }, [isLargeScreen, isMediumScreen]);

    // Pagination handling

    const handleView = (id) => {
        onView(id);
    };

    return (
        <Box my={3}>
            <Typography variant="h6" sx={{ pb: 2 }}>
                Total Badges: {total || 0}
            </Typography>

            {total === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center" p={4}>
                    <CardMedia
                        component="img"
                        image={StatusCode}
                        alt="No badges found"
                        sx={{ maxWidth: 400, width: "100%" }}
                    />
                    <Typography variant="h6" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                        No badges available
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {badges?.map((badge) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={badge?.id}>
                            <Card
                                sx={{
                                    // maxWidth: { xss: "100%", lg: 280 },
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
                                                height: "auto", // Maintain aspect ratio
                                                maxHeight: 170,
                                                objectFit: "contain", // Ensures the image fits without cropping
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
            )}
        </Box>
    );
};

export default BadgeListCard;
