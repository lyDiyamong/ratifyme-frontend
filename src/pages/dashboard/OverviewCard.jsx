
//MUI Import 
import { Container, Card, CardMedia, CardContent, Typography, Box, } from '@mui/material';
import { useTheme } from "@mui/material/styles";
//Custom Import
import { cardContents } from "../../data/dashboardPage/cardOverviewData"


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
                "@media (min-width: 600px)": { px: "0" },
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
                        borderRadius: "16px",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="100px"
                        image={card.image}
                        sx={{ display: "flex", m: "32px", width: "100px" }}
                    />

                    <CardContent sx={{ p: "0", mx: "32px" }}>
                        <Typography variant="h3" sx={{ color: theme.palette.text.disabled, fontSize: theme.typography.h1, fontWeight: theme.fontWeight.semiBold }}>
                            {card.value} <Box component="img" src={card.icon} sx={{ mb: "22px" }}></Box>
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary }} >{card.title}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};
// ============ End Card Component ============

export default CardsList;
