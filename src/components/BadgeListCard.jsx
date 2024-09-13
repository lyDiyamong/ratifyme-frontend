// React import
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

const BadgeListCard = ({ badges = [] }) => {
    // Current page number
    const [page, setPage] = useState(1);
    // Items per page, defaults to 6 for medium screens
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Detect screen size using MUI's useMediaQuery
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // Dynamically update itemsPerPage based on screen size
    useEffect(() => {
        if (isLargeScreen) {
            // Show 8 items per page for large screens
            setItemsPerPage(8);
        } else if (isMediumScreen) {
            // Show 6 items per page for medium screens
            setItemsPerPage(6);
        } else {
            // Show 4 items per page for small screens
            setItemsPerPage(4);
        }
    }, [isLargeScreen, isMediumScreen]);
    // Calculate total number of pages
    const pageCount = Math.ceil(badges.length / itemsPerPage);

    const handleChangePage = (event, value) => {
        // Update page number when pagination is clicked
        setPage(value);
    };

    // Get the items for the current page
    const currentBadges = badges.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box>
            <Typography variant="h6" sx={{ padding: 2 }}>
                Total Badges: {badges.length}
            </Typography>

            {badges.length === 0 ? (
                // This Show placeholder image and message if no badges
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 4,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={StatusCode}
                        alt="No badges found"
                        sx={{ objectFit: "cover", maxWidth: 400, width: "100%" }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: 2,
                            textAlign: "center",
                            color: theme.palette.text.secondary,
                        }}
                    >
                        No badges available
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {currentBadges.map((badge) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={badge.id}>
                            <Card
                                sx={{
                                    maxWidth: { xs: "100%", sm: 320, md: 340, lg: 350 },
                                    height: { xs: "auto", md: 400 },
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: theme.customShadows.default,
                                    borderRadius: theme.shape.borderRadius,
                                    padding: 1.5,
                                    transition: "transform 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={badge.imageUrl}
                                    alt={badge.title}
                                    sx={{
                                        objectFit: "cover",
                                    }}
                                />
                                <CardContent>
                                    <Stack>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: {
                                                    xs: theme.typography.h5.fontSize,
                                                    sm: theme.typography.h4.fontSize,
                                                },
                                                fontWeight: theme.fontWeight.bold,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {badge.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                paddingTop: 1,
                                                color: theme.palette.text.disabled,
                                                fontSize: {
                                                    xs: theme.typography.h6.fontSize,
                                                    md: theme.typography.h5.fontSize,
                                                },
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {badge.institution}
                                        </Typography>
                                    </Stack>
                                </CardContent>

                                {/*  Visit button  */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        padding: 1,
                                    }}
                                >
                                    <Button
                                        sx={{
                                            color: theme.palette.customColors.white,
                                            backgroundColor: theme.palette.primary.main,
                                            padding: "6px 16px",
                                            borderRadius: theme.customShape.btn,
                                            textTransform: "none",
                                        }}
                                    >
                                        Visit
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Pagination */}
            {pageCount > 1 && badges.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 3,

                        // Responsive pagination box for mobile screens
                        overflowX: isSmallScreen ? "auto" : "unset",
                        padding: isSmallScreen ? "0 8px" : "0",
                    }}
                >
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        // Smaller pagination size for mobile
                        size={isSmallScreen ? "small" : "large"}
                        // Show fewer pagination numbers on mobile
                        siblingCount={isSmallScreen ? 0 : 1}
                        // Limit the boundary buttons on mobile
                        boundaryCount={isSmallScreen ? 1 : 2}
                    />
                </Box>
            )}
        </Box>
    );
};

export default BadgeListCard;
