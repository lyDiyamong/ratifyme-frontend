//React Import
import { useEffect, useState } from "react";
//MUI Import
import { Box, Stack, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Menu, MenuItem } from "@mui/material";
import { AssignmentIndOutlined, CameraAltRounded, MoreHorizRounded } from "@mui/icons-material";
//Custom Import
import theme from "../../../assets/themes/index";
import ProfileInfo from "./ProfileInfo";
// Import the config function
import { getProfileInfo } from "../../../data/setting/profileInfoData";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import EditProfileModal from "./ModalEditProfile";
import {
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../store/api/users/userInfoProfileApi";
import { useCheckAuthQuery } from "../../../store/api/auth/authApi";
import BioContent from "./BioContent";

//============ Start User Profile Component ============
const UserProfile = () => {
    const { data: user } = useCheckAuthQuery();
    const userId = user.user.id;
    const [open, setOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(DefaultProfileSvg);
    const { data: info, isLoading, isError } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;
    console.log(userData);

    const [updateImg] = useUploadUserPfMutation();
    const [deleteImg] = useDeleteUserPfMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Inside the UserProfile component
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMoreMenu = () => {
        setAnchorEl(null);
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
            setUpdateImage(null);
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    useEffect(() => {
        if (userData?.profileImage) {
            setUpdateImage(userData?.profileImage);
        } else {
            setUpdateImage(DefaultProfileSvg);
        }
    }, [userData?.profileImage]);

    return (
        <Stack gap={3}>
            <Stack
                direction={{ sm: "column", md: "row" }}
                gap={4}
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: { xss: "24px", sm: "32px" },
                    bgcolor: theme.palette.customColors.white,
                    justifyContent: "space-between",
                    alignItems: { md: "end", xss: "center" },
                }}
            >
                <Stack direction={{ sm: "column", md: "row" }} gap={3} alignItems="center">
                    <Box
                        sx={{
                            position: "relative",
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            overflow: "hidden",
                            "&:hover .hover-overlay": {
                                visibility: "visible",
                                opacity: 1,
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={updateImage || DefaultProfileSvg}
                            alt="person"
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />

                        <Box
                            className="hover-overlay"
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "100%",
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                visibility: "hidden",
                                opacity: 0,
                                transition: "visibility 0.2s, opacity 0.3s ease-in-out",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="file"
                                id="icon-button-photo"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="icon-button-photo">
                                <IconButton
                                    aria-label="upload"
                                    component="span"
                                    sx={{
                                        color: theme.palette.customColors.white,
                                    }}
                                >
                                    <CameraAltRounded />
                                </IconButton>
                            </label>
                            <Typography variant="body3" color={theme.palette.customColors.white}>
                                Update Profile
                            </Typography>
                        </Box>
                    </Box>

                    <Stack sx={{ alignItems: { md: "start", xss: "center" }, gap: 1 }}>
                        <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                            {`${userData?.firstName || ""} ${userData?.lastName || ""}`}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: theme.typography.h5,
                                color: theme.palette.text.disabled,
                            }}
                        >
                            @ {userData?.username || "N/A"}
                        </Typography>

                        <Box
                            sx={{
                                bgcolor: theme.palette.action.hover,
                                color: theme.palette.primary.main,
                                p: 1,
                                px: 2,
                                borderRadius: theme.customShape.section,
                                display: "flex",
                                justifyContent: "center",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <AssignmentIndOutlined sx={{ color: theme.palette.primary.main }} />
                            <Typography sx={{ fontSize: theme.typography.h5, color: theme.palette.primary.main }}>
                                {userData?.Role?.name || "N/A"}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

                <Stack flexDirection="row" gap={1}>
                    <Button
                        onClick={handleClickOpen}
                        onChange={handleFileChange}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.customColors.white,
                            borderRadius: theme.customShape.btn,
                            cursor: "pointer",
                            px: 2,
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                bgcolor: theme.palette.primary.dark,
                            },
                        }}
                        startIcon={<EditIcon />}
                    >
                        Edit Profile
                    </Button>
                    <MoreHorizRounded
                        sx={{
                            bgcolor: theme.palette.grey[200],
                            color: theme.palette.text.primary,
                            borderRadius: theme.customShape.input,
                            p: 1,
                            fontSize: "36px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                            width: 40,
                            "&:hover": {
                                bgcolor: theme.palette.grey[300],
                            },
                        }}
                        onClick={handleMoreClick}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleCloseMoreMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                boxShadow: theme.customShadows.default,
                            },
                        }}
                    >
                        <MenuItem>Update Profile</MenuItem>
                        <MenuItem onClick={handleDeleteImage} onChange={handleClose}>
                            Remove Profile
                        </MenuItem>
                    </Menu>
                    <EditProfileModal open={open} onClose={handleClose} userData={userData} />
                </Stack>
            </Stack>

            <BioContent />

            <Stack
                flexDirection="row"
                alignItems="start"
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: { xss: "24px", sm: "32px" },
                    bgcolor: theme.palette.customColors.white,
                }}
            >
                <Stack direction="column" justifyContent={"center"} width="100%">
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: theme.fontWeight.semiBold, mb: 1 }}>
                            Personal Information
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.disabled }}>
                            Your personal information is crucial for us to provide you with tailored services.
                        </Typography>
                    </Box>

                    <Stack justifyContent={"center"} alignItems="start" width="100%">
                        <ProfileInfo item={userData} details={getProfileInfo(userData?.Role?.name)} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default UserProfile;
