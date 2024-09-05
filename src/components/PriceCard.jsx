// import from materialUI
import { Box, Paper, Typography, Button } from "@mui/material";

// import config style
import theme from "../assets/themes/index";

// import data
import { priceTemplate } from "../data/pricePage/priceData";

const PriceCard = () => {
    // ============ Start renderedCardfunction ============
    const renderPriceCard = priceTemplate.map((item) => {
        return (
            // Paper that refer as section
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
                    boxShadow: theme.shadows.default,
                }}
                square={true}
            >
                {/* Box that contain price duration and duration together */}
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

                {/* Typography refer to the price */}
                <Typography
                    sx={{
                        fontSize: theme.typography.h1,
                        fontWeight: 700,
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    $ {item.price}
                </Typography>

                {/* Button that refer to subscribe the plan */}
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
    // ============ End renderedCardfunction  ============

    return (
        // ============ Start priceCardSection ============
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
        // ============ End priceCardSection ============
    );
};

export default PriceCard;
