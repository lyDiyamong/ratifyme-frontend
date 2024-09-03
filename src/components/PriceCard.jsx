import { Box, Paper, Typography, Button } from "@mui/material";
import theme from "../assets/themes/index";

const PriceCard = () => {
    // const theme = useTheme();
    const priceTemplate = [
        {
            priceDuration: "Quarterly Quater",
            duration: "3 months",
            price: 299,
        },
        {
            priceDuration: "Midyear Membership",
            duration: "6 months",
            price: 599,
        },
        {
            priceDuration: "Annual Advantage",
            duration: "12 months",
            price: 799,
        },
    ];
    const renderPriceCard = priceTemplate.map((item) => {
        return (
            <Paper
                key={item.price}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 300,
                    height: 282,
                    gap: 5,
                    borderRadius: "16px",
                    px: "14px",
                    boxShadow: theme.shadows.default
                }}
                square={true}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: theme.typography.h3,
                            fontWeight: 500,
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
                            fontWeight: "medium",
                            fontFamily: theme.typography.fontFamily,
                        }}
                    >
                        {item.duration}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: theme.typography.h1,
                        fontWeight: 700,
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    $ {item.price}
                </Typography>
                <Button
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.text.contrastText,
                        width: "100%",
                    }}
                >
                    Subscribe
                </Button>
            </Paper>
        );
    });

    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                maxWidth: 1170,
                mx: "auto",
                gap: "5px",
                justifyContent: "end",
            }}
        >
            {renderPriceCard}
        </Box>
    );
};

export default PriceCard;
