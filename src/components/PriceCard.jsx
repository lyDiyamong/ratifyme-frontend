// MUI import
import { Box, Paper, Typography, Button } from "@mui/material";

// Custom import
import theme from "../assets/themes";

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
                boxShadow: theme.customShadows.default
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
            <Button
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.customColors.white,
                    width: "100%",
                    fontSize: theme.typography.body1,
                    fontWeight: theme.fontWeight.semiBold,
                    borderRadius: theme.customShape.btn,
                }}
            >
                Subscribe
            </Button>
        </Paper>
    );
};

export default PriceCard;
