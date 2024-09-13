//MUI Import 
import { Box, Container, Stack, IconButton, Grid, Typography, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
//Custom Import 
import DashboardContainer from "../../../components/styles/DashboardContainer"
import theme from "../../../assets/themes/index"
import EarnerProfileSvg from "../../../assets/images/EarnerProfile.svg"
import PhotoIconSvg from "../../../assets/icons/Photo Icon.svg"
import RoleIconSvg from "../../../assets/icons/Role.svg"
import { ProfileData } from "../../../data/setting/UserProfileDatat"



const UserProfile = () => {
    return (
        <DashboardContainer>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: "32px",
                    bgcolor: theme.palette.customColors.white,
                }}
            >
                <Container sx={{ position: "relative", p: "0", width: "250px", }}>
                    <Box
                        component="img"
                        src={EarnerProfileSvg}
                        alt="person"
                        sx={{ minWidth: "100px", maxWidth: "200px", position: "relative" }}
                    ></Box>
                    <IconButton aria-label="custom-button" sx={{ position: "absolute", bottom: "15px", left: "180px" }}>
                        <Box component="img" alt="icon" src={PhotoIconSvg}></Box>
                    </IconButton>
                </Container>
                <Container sx={{ p: "0","@media (min-width: 600px)" : {padding: "0px",}}}>
                    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                        <Stack gap={"22px"} sx={{ p: "0px" }}>
                            <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                                John Smith
                            </Typography>
                            <Box component={"div"} sx={{ display: "flex", gap: 1 }}>
                                <Box component={"img"} src={RoleIconSvg} sx={{ width: "24px" }}></Box>
                                <Typography
                                    sx={{ fontSize: theme.typography.h5, fontWeight: theme.fontWeight.semiBold }}
                                >
                                    Student
                                </Typography>
                            </Box>
                        </Stack>
                        <Box component={"div"}>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                sx={{
                                    color: theme.palette.customColors.white,
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: theme.customShape.btn,
                                    textTransform: "none",
                                }}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Stack>
                    <Grid container   sx={{ mt : "50px", justifyContent: "center"}}>
                        {ProfileData.map((info,) => (
                            <Grid key={info.id} direction sx={{ width: "200px", height: "50px", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                <Box component={"img"} src={info.icon}></Box>
                                <Box>
                                    {info.title}
                                </Box>
                                <Box>
                                    {info.content}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Stack>
        </DashboardContainer>
    );
};

export default UserProfile;