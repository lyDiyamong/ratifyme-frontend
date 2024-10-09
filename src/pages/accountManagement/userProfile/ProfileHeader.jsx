// React Library Import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUI Import
import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import { CameraAltRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

// Custom Import
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../../assets/images/FemaleUser.svg";
import EditProfileModal from "../ModalEditProfile";
import BioContent from "../BioContent";
// import MoreMenu from "../../../components/MoreMenu";
import theme from "../../../assets/themes";

// Fetching Data Import
import {
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../store/api/users/userInfoProfileApi";

// =========== Start Profile Header ===========
const ProfileHeader = () => {
    const { userId } = useSelector((state) => state.global);
    const [open, setOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(DefaultProfileSvg);
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
            const result = await updateImg({ id: userId, data: formData }).unwrap();
            setUpdateImage(result?.record.profileImage);
        }
        event.target.value = "";
    };

    const handleDeleteImage = async () => {
        await deleteImg({ id: userId });
        setUpdateImage(null);
    };

    useEffect(() => {
        if (userData?.profileImage) {
            setUpdateImage(userData.profileImage);
        } else {
            setUpdateImage(userData?.Gender?.name === "male" ? MaleUserDefault : FemaleUserDefault);
        }
    }, [userData?.profileImage, userData?.Gender?.name]);

    const menuItems = [{ label: "Remove Profile", onClick: handleDeleteImage }];

    return (
        <Stack
            direction="column"
            sx={{
                boxShadow: theme.customShadows.default,
                borderRadius: "16px",
                p: "24px",
                // bgcolor: theme.palette.background.paper,
                background: "linear-gradient(to bottom, #B692C2, #7FA1C3)",
                width: "100%",
                Width: "100%",
                alignItems: "center",
            }}
        >
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
                    src={updateImage || DefaultProfileSvg}
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
                    <input
                        type="file"
                        id="profile-image-upload"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="profile-image-upload">
                        <IconButton component="span" sx={{ color: "#fff" }}>
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
            <Button
                onClick={handleClickOpen}
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                    width: "100%",
                    py: 1,
                    mt: 2,
                    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "30px",
                    "&:hover": {
                        background: "linear-gradient(45deg, #FE6B8B 20%, #FF8E53 80%)",
                    },
                }}
            >
                Edit profile
            </Button>

            {/* Edit Profile Modal */}
            <EditProfileModal open={open} onClose={handleClose} userData={userData} />
            
        </Stack>
    );
};

export default ProfileHeader;
// =========== End Profile Header ===========
