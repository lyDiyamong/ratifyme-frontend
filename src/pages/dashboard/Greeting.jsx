// MUI component
import { Box, Stack, Typography } from "@mui/material";

// Custom theme
import theme from "../../assets/themes";
import GreetingIconSvg from "../../assets/images/Greeting-illu.svg";

//Fetching Data
import { useCheckAuthQuery } from "../../store/api/auth/authApi";
import { useFetchInfoUserByIdQuery } from "../../store/api/users/userInfoProfileApi";

const Greeting = () => {
    const { data: user } = useCheckAuthQuery();
    const userId = user.user.id;

    const { data: info, isLoading, isError } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;
    return (
        // ============ Start Greeting Section ============

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
                    sx={{
                        fontSize: theme.typography.h3,
                        marginBottom: 2,
                        color: theme.palette.primary.main,
                        fontWeight: theme.fontWeight.semiBold,
                    }}
                >
                   Welcome back, {userData?.firstName || "No"} {userData?.lastName || "Name"} 👋

                </Typography>
                <Typography sx={{ fontSize: theme.typography.body2 }}>
                Just wanted to say I’m really looking forward to working with you.
                    
                Let’s rock this!
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
        // ============ End Greeting Section ============
    );
};

export default Greeting;
