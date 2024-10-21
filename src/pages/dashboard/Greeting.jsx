// MUI Import
import { Box, Stack, Typography, CircularProgress } from "@mui/material";

// Custom Import
import theme from "../../assets/themes";
import GreetingMaleIconSvg from "../../assets/images/GreetingMale.png";
import GreetingFemaleIconSvg from "../../assets/images/GreetingFemale.png";

// Fetching Data
import { useFetchInfoUserByIdQuery } from "../../store/api/users/userInfoProfileApi";
import { useSelector } from "react-redux";

// ============ Start Greeting Section ============
const Greeting = () => {
    const { userId, userInfo } = useSelector((state) => state.global);

    const { data: info, isLoading, isError } = useFetchInfoUserByIdQuery(userId, { skip: !userId });

    const userData = info?.data;

    return (
        <Stack
            component="section"
            flexDirection="row"
            sx={{
                boxShadow: theme.customShadows.default,
                borderRadius: theme.customShape.section,
                justifyContent: "space-between",
                alignItems: "center",
                padding: { xss: "16px", sm: "32px" },
                background: "linear-gradient(109.6deg, rgb(120, 143, 251) 11.2%, #7CB9E8 91.1%)",
                width: "100%",
                height: "240px",
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
                        <Stack direction={{ xss: "column", lg: "row" }}>
                            <Typography
                                sx={{
                                    color: theme.palette.customColors.white,
                                    fontWeight: theme.fontWeight.bold,
                                    fontSize: { xs: "18px", sm: "24px", md: "28px", lg: "32px" },
                                    mr: '12px',
                                    textWrap: 'nowrap'
                                }}
                            >
                                Hi!
                            </Typography>
                            <Typography
                                sx={{
                                    marginBottom: 1,
                                    color: theme.palette.customColors.white,
                                    fontWeight: theme.fontWeight.bold,
                                    fontSize: { xs: "18px", sm: "24px", md: "28px", lg: "32px" },
                                    textWrap: 'nowrap'
                                }}
                            >
                                {userData?.firstName || "No"} {userData?.lastName || "Name"}
                            </Typography>
                        </Stack>

                        <Typography variant="body2" sx={{ color: theme.palette.customColors.white }}>
                            Just wanted to say I’m really looking forward to working with you. Let’s rock this!
                        </Typography>
                    </Box>
                    {/* End Text Container */}

                    {/* Img Container */}
                    <Box
                        component="img"
                        src={userInfo?.genderId === 1 ? GreetingMaleIconSvg : GreetingFemaleIconSvg}
                        alt="greeting"
                        sx={{
                            width: "100%",
                            maxWidth: {
                                xs: 70,
                                sm: 150,
                                md: 160,
                                lg: 200,
                                '@media (max-width: 1245px)': {
                                  maxWidth: '175px',
                                },
                              },
                            maxHeight: 450,
                        }}
                    />
                </>
            )}
        </Stack>
    );
};

export default Greeting;
// ============ End Greeting Section ============
