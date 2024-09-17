// MUI import
import { Box, Paper, Typography, Button } from "@mui/material";

// Custom import
import theme from "../assets/themes";
import CheckoutButton from "./CheckoutButton";

const PriceCard = ({ item }) => {
    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 280,
                gap: 5,
                borderRadius: theme.customShape.section,
                px: 2,
                boxShadow: theme.customShadows.default,
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize: theme.typography.h3,
                        fontWeight: theme.fontWeight.semiBold,
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    {item.priceDuration}
                </Typography>
                <Typography
                    sx={{
                        fontSize: theme.typography.body1,
                        textAlign: "center",
                        color: theme.palette.text.disabled,
                        fontWeight: theme.fontWeight.semiBold,
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    {item.duration}
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontSize: theme.typography.h2,
                    fontWeight: 700,
                    fontFamily: theme.typography.fontFamily,
                }}
            >
                $ {item.price}
            </Typography>
            <CheckoutButton id={item.productId} />
        </Paper>
    );
};

export default PriceCard;
