// React Library Import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUI Import
import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AssignmentIndOutlined, CameraAltRounded } from "@mui/icons-material";

// Custom Import
import DefaultProfileSvg from "../../../../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../../../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../../../assets/images/FemaleUser.svg";
import EditProfileModal from "../ModalEditProfile";
import MoreMenu from "../../../../components/MoreMenu";
import theme from "../../../../assets/themes";

// Fetching Data Import
import {
useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../../store/api/users/userInfoProfileApi";

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
                                sx={{ color: theme.palette.customColors.white }}
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
                    <Typography sx={{ fontSize: theme.typography.h5, color: theme.palette.text.disabled }}>
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
            <Stack flexDirection="row" gap={1} alignItems="center" justifyContent="center">
                <Button
                    onClick={handleClickOpen}
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
                <MoreMenu menuItems={menuItems} />
                <EditProfileModal open={open} onClose={handleClose} userData={userData} />
            </Stack>
        </Stack>
    );
};

export default ProfileHeader;
// =========== End Profile Header ===========