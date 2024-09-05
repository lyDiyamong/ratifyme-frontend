
// Mui Import 
import { Box, Button, TextField } from  "@mui/material";
import { useTheme } from "@mui/material/styles";
//Custom Import
import PosterHeroSvg from "../../assets/images/Poster.svg";
import LandingContainer from "../../components/styles/LandingContainer";



const HeroSection = () => {

    const theme = useTheme();
    return (
        //============ Start Hero Section  ============
        <Box
            component="section"
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop = "32px"
            minHeight="613px"
        >
            {/*  Start Hero Container  */}
            <LandingContainer
                
            >
                <Box
                    component="div"
                    sx={{
                        paddingX: "10px",
                        paddingY: "15px",
                        marginX: "25px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        "@media (max-width:1120px)": {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        },
                        "@media (max-width:480px)": {
                            marginX: "15px",
                        },
                    }}
                >{/* Start Left Content Wrapper */}
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            minHeight: "405px",
                            "@media (max-width:1120px)": {
                                    alignItems: "center",
                                },
                        }}
                    >
                        <Box
                            component="h1"
                            sx={{
                                fontSize: theme.typography.h1.fontSize,
                                "@media (max-width:1120px)": {
                                    maxWidth: "900px",
                                    textAlign: "center"
                                },
                                "@media (max-width:643px)": {
                                    fontSize: "36px",
                                    textAlign: "start"
                                },

                                "@media (max-width:480px)": {
                                    fontSize:
                                        theme.typography.h1[
                                            "@media (max-width:480px)"
                                        ].fontSize,
                                },
                                maxWidth: "609px",
                                height: "auto",
                                my: "0"
                            }}
                        >
                            Unlock the future of credentials with accessible,
                            flexible, and verifiable
                        </Box>
                        <Box
                            component="p"
                            sx={{
                                fontFamily: theme.typography.body1,
                                marginY: "51px",
                                maxWidth: "436px",
                                "@media (max-width:1120px)": {
                                    maxWidth: "600px",
                                },
                                "@media (max-width:480px)": {
                                    fontSize:"12px",
                                    Width: "636px"
                                }
                            }}
                        >
                            Transform the future of education and employment by
                            launching a digital credential business that
                            empowers people to securely showcase their skills in
                            a rapidly evolving world.
                        </Box>
                        <Box component="div">
                            <TextField
                                label="Email"
                                variant="outlined"
                                height="48px"
                                sx={{
                                    maxWidth: "250px",
                                    textTransform: "none",

                                    color: "white",

                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        height: "50px",
                                        padding: "10px",
                                        boxSizing: "border-box",
                                    },
                                    "@media (max-width:480px)": {
                                    display:"none"
                                }
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    maxWidth: "276px",
                                    textTransform: "none",
                                    fontSize: "16px",
                                    color: "white",
                                    borderRadius: "10px",
                                    height: "50px",
                                    marginLeft: "5px",
                                }}
                            >
                                Let's Communicate
                            </Button>
                        </Box>
                    </Box>
                    {/*  End Left Content Wrapper */}
                    {/* Start Right Content Wrapper  */}
                    <Box
                        component="img"
                        src={PosterHeroSvg}
                        alt="Hero"
                        sx={{
                            width: "100%",
                            maxWidth: "539px",
                            minWidth: "200px",
                            
                            height: "auto",
                            "@media (max-width:1120px)": {
                                maxWidth: "639px",
                                minWidth: "200px",
                                height: "auto",
                            },
                        }}
                    />
                </Box>
                {/* End Right Content Wrapper  */}
            </LandingContainer>
            {/* End Hero Container  */}
        </Box> 
    );
    //============ End Hero Section  ============
}

export default HeroSection;