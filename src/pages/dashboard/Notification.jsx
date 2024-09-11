//Mui import
import { Box, Stack, Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//Custom Import
import { notiCardData } from "../../data/dashboardPage/cardNotification";

// ============ Start Notification Card Component ============ 
const Notification = () => {
    const theme = useTheme();

    return (
        <Box
            maxWidth={500}
            sx={{
                borderRadius: theme.customShape.card,
                boxShadow: theme.customShadows.default,
                pb: "28px",
                px: "20px",
                pt: "12px",
                maxHeight: "279px",
            }}
        >
            <Typography variant="h6" sx={{ mb: "5px" }}>
                Notification
            </Typography>
            <Stack sx={{ justifyContent: "center" }}>
                {notiCardData.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            mb: 2,
                            Width: 475,
                            minWidth: "101px",
                            height: 60,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",

                            borderRadius: "8px",
                        }}
                    >
                        <CardContent
                            sx={{
                                pb: " 15px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignContent: "center",
                                width: "189px",
                            }}
                        >
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 1,
                                    width: "170px",
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
                                    <Typography
                                        variant="body2"
                                        sx={{ width: "136px", "@media (max-width:480px)": { width: "100px" } }}
                                    >
                                        {card.name}
                                    </Typography>
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
                            <Typography variant="body3" sx={{ "@media (max-width:480px)": { display: "none" } }}>
                                {card.type}
                            </Typography>
                            <Link href="#view" underline="hover" sx={{ fontSize: theme.typography.body3 }}>
                                {"View"}
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};

export default Notification;
// ============ End Notification Card Component ============ 