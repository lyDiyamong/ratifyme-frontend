// React Library Import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUI import
import { Stack, Box, Typography, IconButton, Button, Modal, Backdrop } from "@mui/material";
import { CameraAltRounded, FullscreenExitOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Custom import
import EditProfileModal from "../ModalEditProfile";
import MoreMenu from "../../../components/MoreMenu";
import AlertMessage from "../../../components/alert/AlertMessage";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../../assets/images/FemaleUser.svg";
import theme from "../../../assets/themes";

// API import
import {
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../store/api/users/userInfoProfileApi";

// =========== Start Profile Header ===========
const ProfileHeader = ({onEditSuccess}) => {
    const { userId } = useSelector((state) => state.global);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(DefaultProfileSvg);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;

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
                setMessage("Profile image updated successfully!");
                setIsError(false);
            } catch (error) {
                setMessage(error.data.message || "Failed to update profile image.");
                setIsError(true);
            }
        }
        event.target.value = "";
    };

    const handleDeleteImage = async () => {
        try {
            await deleteImg({ id: userId }).unwrap();
            setUpdateImage(null);
            setMessage("Profile image deleted successfully!");
            setIsError(false);
        } catch (error) {
            setMessage(error.data.message || "Failed to delete profile image.");
            setIsError(true);
        }
    };

    useEffect(() => {
        if (userData?.profileImage) {
            setUpdateImage(userData?.profileImage);
        } else {
            // Set based on gender if no profile image exists
            if (userData?.Gender?.name === "male") {
                setUpdateImage(MaleUserDefault);
            } else if (userData?.Gender?.name === "female") {
                setUpdateImage(FemaleUserDefault);
            } else {
                setUpdateImage(DefaultProfileSvg);
            }
        }
    }, [userData?.profileImage, userData?.Gender?.name]);

    const menuItems = [
        {
            label: "View Profile",
            icon: <FullscreenExitOutlined color="primary" />,
            onClick: () => setIsModalOpen(true),
        },
        { label: "Remove Profile", icon: <DeleteForeverIcon color="error" />, onClick: handleDeleteImage },
    ];

    return (
        <Stack
            direction="column"
            sx={{
                boxShadow: theme.customShadows.default,
                borderRadius: "16px",
                p: "24px",
                width: "100%",
                Width: "100%",
                alignItems: "center",
                position: "relative",
                bgcolor: theme.palette.customColors.white,
            }}
        >
            {message && (
                <AlertMessage variant={isError ? "error" : "success"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}

            {/* The image view */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                closeAfterTransition
                BackdropComponent={(props) => (
                    <Backdrop
                        {...props}
                        sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                        }}
                    />
                )}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { md: "40%", xss: "70%" },
                        p: 4,
                    }}
                >
                    <Box
                        component="img"
                        src={updateImage || "https://www.mylittleadventure.com/images/default/default-img.png"}
                        alt="Full size badge"
                        sx={{ width: "100%", height: "auto", borderRadius: "10px", cursor: "pointer" }}
                    />
                </Box>
            </Modal>

            {/* Profile Image Section */}
            <Box
                sx={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                    borderRadius: "100%",
                    overflow: "hidden",
                    mb: 2,
                }}
            >
                <Box
                    component="img"
                    src={updateImage || (userData?.Gender?.name === "male" ? MaleUserDefault : FemaleUserDefault)}
                    alt="Profile"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "100%",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        "&:hover": {
                            opacity: 1,
                        },
                    }}
                >
                    <input type="file" id="profile-image-upload" style={{ display: "none" }} onChange={handleFileChange} />
                    <label htmlFor="profile-image-upload">
                        <IconButton component="span" sx={{ color: theme.palette.customColors.white }}>
                            <CameraAltRounded />
                        </IconButton>
                    </label>
                </Box>
            </Box>

            {/* User Info */}
            <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                {`${userData?.firstName || ""} ${userData?.lastName || ""}`}
            </Typography>
            <Typography sx={{ fontSize: theme.typography.h5, color: theme.palette.text.disabled }}>
                @{userData?.username || "N/A"}
            </Typography>

            <Typography sx={{ fontSize: theme.typography.body2, color: "text.secondary", mt: 1 }}>
                Position: {userData?.Role.name || "N/A"}
            </Typography>

            {/* Save Button */}
            <Stack direction="row" mt={2} alignItems="center" justifyContent="center" gap={1}>
                <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                        px: 2,
                        background: theme.palette.secondary.light,
                        color: theme.palette.customColors.white,
                        fontWeight: "bold",
                        borderRadius: theme.customShape.btn,
                        textTransform: 'none'
                    }}
                >
                    Edit profile
                </Button>
                <MoreMenu
                    menuItems={menuItems}
                    iconStyles={{
                        color: "black",
                        // backgroundColor: theme.palette.background.secondary,
                        borderRadius: theme.customShape.section,
                    }}
                />
            </Stack>
            {/* Edit Profile Modal */}
            <EditProfileModal open={open} onSuccess={onEditSuccess} onClose={handleClose} userData={userData} />
        </Stack>
    );
};

export default ProfileHeader;
// =========== End Profile Header ===========
