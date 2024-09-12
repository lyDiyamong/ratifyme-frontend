//MUI Import
import { Container, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//Custom Import
import { cardContents } from "../../data/dashboardPage/cardOverviewData";


// ============ Start Cards Component ============
const CardsList = () => {
    const theme = useTheme();

    return (
        //============ Start Cards Container  ============
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: "32px",
                maxWidth: "792px",
                m: "0px",
                px: "0px",
                "@media (max-width:1350px)":{gap: "24px"},
                "@media (min-width: 600px)": { px: "0"},
                "@media (max-width: 600px)": { px: "0", gap: "16px" },
            }}
        >{/* ============ Start Card Overview ============*/}
            {cardContents.map((card) => (
                <Card
                    key={card.id}
                    sx={{
                        
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
                >   {/* Image graph */}
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
                        {/* Display Number Data */}
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
                        {/* Title Card */}
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
            {/* ============ End Card Overview ============*/}
        </Container>
        //============ Start Cards Container  ============
    );
};
// ============ End Cards Component ============

export default CardsList;
