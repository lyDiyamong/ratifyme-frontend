//MUI Import
import { Box, Container, Stack, IconButton, Grid, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
//Custom Import
import DashboardContainer from "../../../components/styles/DashboardContainer";
import theme from "../../../assets/themes/index";
import PhotoIconSvg from "../../../assets/icons/Photo Icon.svg";
import RoleIconSvg from "../../../assets/icons/Role.svg";
import { ProfileInfoData } from "../../../data/setting/UserProfileData";
import { ProfileIdentityData } from "../../../data/setting/UserProfileData";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";


//============ Start User Profile Component ============
const UserProfile = () => {
    return (
        <DashboardContainer>

            {/*============ Start  User Data Container "Card"  ============*/}
            <Stack
                direction={{ sm: "column", md: "row" }}
                justifyContent={"flex-start"}
                spacing={2}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: { xss: "24px", sm: "32px" },
                    bgcolor: theme.palette.customColors.white,
                }}
            >
                {/*============ Start Image Profile User Data ============*/}
                <Container sx={{ p: "0", width: "250px", marginRight: "280px", marginLeft: "18px" }}>
                    <Box sx={{ position: "relative" }}>

                        {/*Profile Image */}
                        <Box
                            component="img"
                            src={ProfileIdentityData.profilepic || DefaultProfileSvg}
                            alt="person"
                            sx={{ width: { xss: "100px", sm: "200px" }, position: "relative" }}
                        ></Box>

                        {/* Input Image Button */}
                        <IconButton
                            aria-label="custom-button"
                            sx={{
                                position: "absolute",
                                bottom: { xss: "3px", sm: "15px" },
                                left: { xss: "70px", sm: "160px" },
                            }}
                        >
                            <Box component="img" alt="icon" src={PhotoIconSvg}></Box>
                        </IconButton>
                    </Box>
                </Container>

                {/*============ End Image Profile User Data ============*/}
                <Container >

                    {/*============ Start Upper User Data ============*/}
                    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                        <Stack gap={"22px"} sx={{ p: "0px" }}>

                            {/* User Name Data */}
                            <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                                {ProfileIdentityData.username}
                            </Typography>
                            <Box component={"div"} sx={{ display: "flex", gap: 1 }}>
                                <Box component={"img"} src={RoleIconSvg} sx={{ width: "24px" }}></Box>

                                {/* User Role Data */}
                                <Typography
                                    sx={{ fontSize: theme.typography.h5, fontWeight: theme.fontWeight.semiBold }}
                                >
                                    {ProfileIdentityData.role}
                                </Typography>
                            </Box>
                        </Stack>
                        <Box component={"div"} sx={{ mt: { xss: "30px", sm: "0" } }}>
                            
                            {/* Edit Button */}
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
                    {/*============ End Upper User Data ============*/}

                    {/*============ Start Grid User Data ============*/}
                    <Grid
                        container
                        sx={{
                            mt: "50px",
                            justifyContent: "flex-start",
                            columnGap: { xs: "22px", sm: "32px" },
                            rowGap: { xs: "22px", sm: "32px" },
                        }}
                    >
                        {ProfileInfoData.map((info) => (
                            <Grid
                                key={info.id}
                                direction={"row"}
                                xs={4}
                                sm={4}
                                md={4}
                                lg={3}
                                sx={{
                                    gap: "12px",
                                    minWidth: { xs: "170px", sm: "200px" },
                                    "@media(max-width: 480px)": { minWidth: "145px", height: "35px" },
                                    height: "60px",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Box component={"img"} src={info.icon}></Box>
                                <Stack gap={"5px"} sx={{ textAlign: "left" }}>
                                    <Box sx={{ fontSize: theme.typography.h6, fontWeight: theme.fontWeight.bold }}>
                                        {info.title}
                                    </Box>
                                    <Box sx={{ fontSize: theme.typography.h6, fontWeight: theme.fontWeight.semiBold }}>
                                        {info.content}
                                    </Box>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                    {/*============ End Grid User Data ============*/}
                </Container>

            </Stack>
            {/*============ End User Data Container "Card"  ============*/}

        </DashboardContainer>
    );
};
//============ End User Profile Component ============
export default UserProfile;
