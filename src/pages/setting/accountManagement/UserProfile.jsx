//React Import
import { useEffect, useState } from "react";
//MUI Import
import { Box, Container, Stack, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
    Phone,
    Email,
    Cake,
    ApartmentRounded,
    SchoolRounded,
    PublicRounded,
    PersonRemoveRounded,
} from "@mui/icons-material";
//Custom Import
import theme from "../../../assets/themes/index";
import PhotoIconSvg from "../../../assets/icons/Photo Icon.svg";
import RoleIconSvg from "../../../assets/icons/Role.svg";
import ProfileInfo from "./ProfileInfo";
import { ProfileInfoData } from "../../../data/setting/UserProfileData";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import EditProfileModal from "./ModalEditProfile";
import {
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../store/api/users/userInfoProfileApi";
import { useCheckAuthQuery } from "../../../store/api/auth/authApi";

//============ Start User Profile Component ============
const UserProfile = () => {
    const { data: user } = useCheckAuthQuery();

    const userId = user.user.id;

    const [open, setOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(null);

    // Fetch data
    const { data :info, isLoading, isError } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;
    console.log(userData)

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
                const result = await updateImg({ id: userId, data: formData }).unwrap();
                setUpdateImage(result?.record.profileImage);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        event.target.value = "";
    };

    // Handle delete image
    const handleDeleteImage = async () => {
        try {
            await deleteImg({ id: userId }).unwrap();
            // Reset the image state
            setUpdateImage(null);
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };
    useEffect(() => {
        if (userData?.profileImage) {
            setUpdateImage(userData?.profileImage);
        }
    }, [userData?.profileImage]);

    return (
        <Box>
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
                    <Stack direction={{ xs: "row", xss: "column" }} sx={{ justifyContent: "space-between", gap: 1 }}>
                        <Stack sx={{ p: "0px", gap: 2 }}>
                            {/* User Name Data */}
                            <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.bold }}>
                                {userData?.username}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Box component="img" src={RoleIconSvg} sx={{ width: "24px" }} />
                                <Typography
                                    sx={{ fontSize: theme.typography.h5, fontWeight: theme.fontWeight.semiBold }}
                                >
                                    {userData?.Role?.name || "N/A"}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            sx={{ mt: { xss: "30px", sm: "0" }, gap: 1, flexDirection: { sm: "column", xss: "row" } }}
                        >
                            {/* Edit Button */}
                            <Button
                                variant="contained"
                                onClick={handleClickOpen}
                                sx={{
                                    color: theme.palette.customColors.white,
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: theme.customShape.btn,
                                    maxWidth: 30,
                                    textTransform: "none",
                                }}
                            >
                                <EditIcon />
                            </Button>
                            <EditProfileModal open={open} onClose={handleClose} />
                            {/* Delete profile button */}
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteImage}
                                sx={{
                                    borderRadius: theme.customShape.btn,
                                    textTransform: "none",
                                    maxWidth: 30,
                                }}
                            >
                                <PersonRemoveRounded />
                            </Button>
                        </Stack>
                    </Stack>
                    {/*============ End Upper User Data ============*/}

                    {/*============ Start Grid User Data ============*/}
                    {/* <Grid
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
                    </Grid> */}

                    <ProfileInfo
                        item={userData}
                        details={[
                            {
                                icon: <Phone fontSize="medium" />,
                                label: "Phone",
                                valueKey: "phoneNumber",
                            },
                            {
                                icon: <Email fontSize="medium" />,
                                label: "Email",
                                valueKey: "email",
                            },
                            {
                                icon: <Cake fontSize="medium" />,
                                label: "Date of Birth",
                                valueKey: "dateOfBirth",
                            },
                            {
                                icon: <ApartmentRounded fontSize="medium" />,
                                label: "Organization",
                                valueKey: "org",
                            },
                            {
                                icon: <SchoolRounded fontSize="medium" />,
                                label: "Education",
                                valueKey: "edu",
                            },
                            {
                                icon: <PublicRounded fontSize="medium" />,
                                label: "Nationality",
                                valueKey: "nationality",
                            },
                        ]}
                    />
                    {/*============ End Grid User Data ============*/}
                </Container>
            </Stack>
            {/*============ End User Data Container "Card"  ============*/}
        </Box>
    );
};
//============ End User Profile Component ============
export default UserProfile;
