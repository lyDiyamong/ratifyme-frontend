// MUI component
import { Box, Stack, Typography } from "@mui/material";

// Custom theme
import theme from "../../assets/themes";
import GreetingIconSvg from "../../assets/images/Greeting-illu.svg";
import DashboardContainer from "../../components/styles/DashboardContainer";

const Greeting = ({userName}) => {
    return (
        // ============ Start Greeting Section ============
        <DashboardContainer>
            <Stack
                component="section"
                flexDirection={{ xs: "column", md: "row" }}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "32px",
                    bgcolor: theme.palette.customColors.white,
                }}
            >
                {/* Start Text Container */}
                <Box maxWidth={500}>
                    <Typography
                        sx={{ fontSize: theme.typography.h3, 
                            marginBottom: 2, 
                            color: theme.palette.primary.main,
                            fontWeight: theme.fontWeight.semiBold
                        }}
                    >
                        Welcome back, {userName}
                    </Typography>
                    <Typography sx={{ fontSize: theme.typography.body2 }}>
                        You’ve complete 82% of your badges this week! Keep it up, we will help with global standard!
                    </Typography>
                </Box>
                {/* End Text Container */}

                {/* Img Container */}
                <Box
                    component="img"
                    src={GreetingIconSvg}
                    alt="greeting"
                    sx={{
                        width: "100%",
                        maxWidth: 250,
                        maxHeight: 200,
                    }}
                />
            </Stack>
        </DashboardContainer>
        // ============ End Greeting Section ============
    );
};

export default Greeting;
