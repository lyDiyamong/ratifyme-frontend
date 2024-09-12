//Mui import
import { Box, Stack, Card, CardMedia, CardContent, Typography, Link } from "@mui/material";

//Custom Import
import { notiCardData } from "../../data/dashboardPage/cardNotification";
import theme from "../../assets/themes";


// ============ Start Notification Card Component ============
const Notification = () => {
    return (
        //============ Start Card Container  ============
        <Box
            sx={{
                borderRadius: theme.customShape.card,
                boxShadow: theme.customShadows.default,
                pb: "28px",
                px: "20px",
                pt: "12px",
                maxHeight: "279px",
                width: "100%",
                maxWidth: "517px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                "@media (max-width: 1650px)": { minWidth: "200px" },
            }}
        >
            {/* Title of Card Container */}
            <Typography variant="h6" sx={{ mb: "5px" }}>
                Notification
            </Typography>
            {/* ============ Start Card Wraper ============ */}
            <Stack sx={{ justifyContent: "center", minWidth: "100px" }}>
                {notiCardData.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            mb: 2,
                            width: "100%",
                            Width: 475,
                            minWidth: "80px",
                            height: 60,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: theme.shape.borderRadius,
                        }}
                    >
                        <CardContent
                            sx={{
                                pb: " 15px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignContent: "center",
                                minWidth: "100px",
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 1,
                                    width: "100%",

                                    "@media (max-width:480px)": { width: "140px" },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={card.image}
                                    sx={{
                                        display: "flex",
                                        width: "33px",
                                        height: "33px",
                                        my: "3px",
                                        justifyContent: "center",
                                    }}
                                />
                                <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
                                    {/*  Company Name */}
                                    <Typography
                                        variant="body2"
                                        sx={{ Width: "136px", "@media (max-width:480px)": { width: "100px" } }}
                                    >
                                        {card.name}
                                    </Typography>
                                    {/*  Company Email */}
                                    <Typography variant="body3" sx={{ color: theme.palette.text.disabled }}>
                                        {card.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        <CardContent
                            sx={{
                                py: "20px",
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                                "@media (max-width:480px)": { gap: 1, px: "10px" },
                            }}
                        >
                            {/* Date of Notification */}
                            <Typography
                                variant="body3"
                                sx={{
                                    color: theme.palette.text.disabled,
                                    width: "73px",
                                    "@media (max-width:480px)": { width: "53px" },
                                }}
                            >
                                {card.date}
                            </Typography>

                            {/*  Type of Notification */}
                            <Typography variant="body3" sx={{ "@media (max-width:380px)": { display: "none" } }}>
                                {card.type}
                            </Typography>

                            {/*  Link to View Detail Notification */}
                            <Link
                                underline="hover"
                                to="/view"
                                sx={{ fontSize: theme.typography.body3, cursor: "pointer" }}
                            >
                                View
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            {/* ============ End Card Wraper ============ */}
        </Box>
        //============ End Card Container  ============
    );
};

export default Notification;
// ============ End Notification Card Component ============
