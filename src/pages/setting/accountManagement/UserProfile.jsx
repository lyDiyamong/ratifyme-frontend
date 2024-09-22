//React Import
import { useEffect, useState } from "react";
//MUI Import
import { Box, Container, Stack, IconButton, Grid, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
//Custom Import
import DashboardContainer from "../../../components/styles/DashboardContainer";
import theme from "../../../assets/themes/index";
import PhotoIconSvg from "../../../assets/icons/Photo Icon.svg";
import RoleIconSvg from "../../../assets/icons/Role.svg";
import { ProfileInfoData } from "../../../data/setting/UserProfileData";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import EditProfileModal from "./ModalEditProfile";
import {
    useFetchUserQuery,
    useUploadUserPfMutation,
    useDeleteUserPfMutation,
} from "../../../store/api/users/userProfileApi";

//============ Start User Profile Component ============
const UserProfile = () => {
    const [open, setOpen] = useState(false);
    const { data: response } = useFetchUserQuery(13);
    const user = response?.data;
    const [updateImage, setUpdateImage] = useState(null);

    useEffect(() => {
        setUpdateImage(user?.profileImage);
    }, [user]);

    const [updateImg] = useUploadUserPfMutation();
    const [deleteImg] = useDeleteUserPfMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const result = await updateImg({ id: 13, data: formData }).unwrap();
                setUpdateImage(result?.data?.profileImage);
                console.log("Image updated successfully:", result?.data?.profileImage);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        event.target.value = "";
    };

    // Handle delete image
    const handleDeleteImage = async () => {
        try {
            await deleteImg({ id: 13 }).unwrap();
            // Reset the image state
            setUpdateImage(null);
            console.log("Image deleted successfully");
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <DashboardContainer>
            {/*============ Start User Data Container "Card" ============*/}
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
                <Box>
                    <Box sx={{ position: "relative" }}>
                        {/* Profile Image */}
                        <Box
                            component="img"
                            src={updateImage || DefaultProfileSvg}
                            alt="person"
                            sx={{
                                width: { xss: "100px", sm: "200px" },
                                borderRadius: "100%",
                                objectFit: "cover",
                                height: { xss: "100px", sm: "200px" },
                            }}
                        ></Box>

                        {/* Input Image Button */}
                        <input
                            type="file"
                            id="icon-button-photo"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {/* Label linked to the file input */}
                        <label htmlFor="icon-button-photo">
                            <IconButton
                                aria-label="upload"
                                component="span"
                                sx={{
                                    position: "absolute",
                                    bottom: { xss: "3px", sm: "15px" },
                                    left: { xss: "70px", sm: "160px" },
                                }}
                            >
                                <Box component="img" alt="Upload Icon" src={PhotoIconSvg} />
                            </IconButton>
                        </label>
                    </Box>
                </Box>
                {/*============ End Image Profile User Data ============*/}

                <Container>
                    {/*============ Start Upper User Data ============*/}
                    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                        <Stack gap={"22px"} sx={{ p: "0px" }}>
                            {/* User Name Data */}
                            <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                                {user?.username}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Box component="img" src={RoleIconSvg} sx={{ width: "24px" }} />
                                <Typography
                                    sx={{ fontSize: theme.typography.h5, fontWeight: theme.fontWeight.semiBold }}
                                >
                                    {/* {profileData?.role} */}
                                </Typography>
                            </Box>
                        </Stack>
                        <Box component={"div"} sx={{ mt: { xss: "30px", sm: "0" } }}>
                            {/* Edit Button */}
                            <Button
                                variant="contained"
                                onClick={handleClickOpen}
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
                            <EditProfileModal open={open} onClose={handleClose} />
                            {/* Delete Button */}
                            <Button
                                variant="contained"
                                onClick={handleDeleteImage}
                                startIcon={<DeleteIcon />}
                                sx={{
                                    color: theme.palette.customColors.white,
                                    bgcolor: theme.palette.error.main,
                                    borderRadius: theme.customShape.btn,
                                    textTransform: "none",
                                    ml: 1,
                                }}
                            >
                                Delete Image
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
                            columnGap: { xss: "22px", sm: "32px" },
                            rowGap: { xss: "22px", sm: "32px" },
                        }}
                    >
                        {ProfileInfoData.map((info) => (
                            <Grid
                                item
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
