import { Box, Stack, Typography } from "@mui/material";
import theme from "../assets/themes/index";
import greetingImg from "../assets/images/Greeting-illu.svg";

const Greeting = () => {
    return (
        <Stack
            component="section"
            flexDirection={{ xs: "column", md: "row" }}
            sx={{
                boxShadow: theme.shadows.default,
                borderRadius : theme.shape.borderRadius.section,
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px",
                bgcolor: theme.palette.background.paper,
            }}
        >
            {/* text container */}
            <Box maxWidth={500}>
                <Typography sx={{ fontSize: theme.typography.h3, marginBottom: 2, color: theme.palette.primary.main }}>
                    Welcome back, John Doe
                </Typography>
                <Typography sx={{ fontSize: theme.typography.body2 }}>
                    You’ve complete 82% of your badges this week! Keep it up, we will help with global standard!
                </Typography>
            </Box>
            {/* img container */}
            <Box
                component="img"
                src={greetingImg}
                alt="greeting"
                sx={{
                    width: "100%",
                    maxWidth: 250,
                    maxHeight: 200,
                }}
            />
        </Stack>
    );
};

export default Greeting;
