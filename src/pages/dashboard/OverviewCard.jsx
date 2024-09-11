//MUI Import
import { Container, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//Custom Import
import { cardContents } from "../../data/dashboardPage/cardOverviewData";

// ============ Start Card Component ============
const CardsList = () => {
    const theme = useTheme();

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: "32px",
                maxWidth: "792px",
                m: "0px",
                "@media (max-width: 600px)": { px: "0", gap: "22px" },
            }}
        >
            {cardContents.map((card) => (
                <Card
                    key={card.id}
                    sx={{
                        mb: 2,
                        width: 243,
                        height: 277,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "2px",
                        borderRadius: theme.customShape.card,
                        boxShadow: theme.customShadows.default,
                        minWidth: "137px",

                        "@media (max-width: 650px)": { height: "186px" },
                        "@media (max-width: 600px)": { height: "156px", width: "137px", minWidth: "60px" },
                    }}
                >
                    <CardMedia
                        component="img"
                        height="100px"
                        image={card.image}
                        sx={{
                            display: "flex",
                            m: "32px",
                            width: "100px",
                            "@media (max-width: 650px)": { width: "76px", m: "20px", mb: "12px", minWidth: "10px" },
                            "@media (max-width: 600px)": { width: "56px", m: "18px", mb: "12px" },
                        }}
                    />

                    <CardContent
                        sx={{
                            p: "0",
                            mx: "32px",
                            "@media (max-width: 650px)": { mx: "22px" },
                            "@media (max-width: 600px)": { mx: "20px" },
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                color: theme.palette.text.disabled,
                                fontWeight: theme.fontWeight.semiBold,
                                "@media (max-width: 650px)": {
                                    fontSize: theme.typography.h2,
                                    fontWeight: theme.fontWeight.semiBold,
                                },
                            }}
                        >
                            {card.value}
                            <Box
                                component="img"
                                src={card.icon}
                                sx={{
                                    mb: "22px",
                                    "@media (max-width: 650px)": { mb: "12px" },
                                    "@media (max-width: 400px)": { display: "none" },
                                }}
                            ></Box>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.primary,
                                "@media (max-width: 600px)": { fontSize: theme.typography.body3 },
                            }}
                        >
                            {card.title}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};
// ============ End Card Component ============

export default CardsList;
