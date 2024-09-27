// MUI Import
import { Box, Stack, Typography, CircularProgress } from "@mui/material";

// Custom Import
import theme from "../../assets/themes";
import GreetingIconSvg from "../../assets/images/Greeting-illu.svg";

// Fetching Data
import { useFetchInfoUserByIdQuery } from "../../store/api/users/userInfoProfileApi";
import { useSelector } from "react-redux";

// ============ Start Greeting Section ============
const Greeting = () => {
    const {userId} = useSelector((state)=> state.global)

    const { data: info, isLoading, isError } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    
    const userData = info?.data;
    console.log("usserDatasdjfkasjf", userData);

    return (
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
            {/* Conditional rendering based on loading and error states */}
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Typography color="error">Error fetching user data</Typography>
            ) : (
                <>
                    {/* Start Text Container */}
                    <Box maxWidth={500}>
                        <Typography
                            variant="h3"
                            sx={{
                                marginBottom: 2,
                                color: theme.palette.primary.main,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            Welcome back, {userData?.firstName || "No"} {userData?.lastName || "Name"} 👋
                        </Typography>
                        <Typography variant="body2">
                            Just wanted to say I’m really looking forward to working with you. Let’s rock this!
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
                </>
            )}
        </Stack>
    );
};

export default Greeting;
// ============ End Greeting Section ============
