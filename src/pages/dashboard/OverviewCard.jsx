//MUI Import
import { CardMedia, Typography, Box } from "@mui/material";

//Custom Import
import { cardContents } from "../../data/dashboardPage/cardOverviewData";
import theme from "../../assets/themes";

// ============ Start Cards Component ============
const CardsList = () => {

    return (
        //============ Start Cards Container  ============
        <Box
            sx={{
                display: "flex",
                gap: 3,
                flexDirection: {
                    sm: "row",
                    xss: "column",
                },
            }}
        >
            {/* ============ Start Card Overview ============*/}
            {cardContents.map((card) => (
                <Box
                    key={card.id}
                    sx={{
                        flex: 1,
                        p: 3,
                        py: 5,
                        display: "flex",
                        gap: 2,
                        flexDirection: {
                            sm: "column",
                            xss: "row",
                        },
                        alignItems: {
                            sm: "flex-start",
                            xss: "center",
                        },
                        borderRadius: theme.customShape.card,
                        boxShadow: theme.customShadows.default,
                        backgroundColor: theme.palette.customColors.white,
                    }}
                >
                    
                    {/* Image graph */}
                    <CardMedia
                        component="img"
                        image={card.image}
                        sx={{
                            maxWidth: 100,
                            width: "100%",
                        }}
                    />
                    <Box>
                        {/* Display Number Data */}
                        <Typography
                            variant="h2"
                            sx={{
                                color: theme.palette.text.disabled,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            {card.value}
                            <Box
                                component="img"
                                src={card.icon}
                                sx={{
                                    mb: "22px",
                                    "@media (max-width: 650px)": { mb: "12px" },
                                }}
                            />
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
                    </Box>
                </Box>
            ))}
            {/* ============ End Card Overview ============*/}
        </Box>
        //============ Start Cards Container  ============
    );
};
// ============ End Cards Component ============

export default CardsList;
