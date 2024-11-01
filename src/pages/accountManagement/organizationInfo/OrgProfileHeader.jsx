// React Library Import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUI Import
import { Stack, Box, Typography, IconButton, Button, Avatar } from "@mui/material";
import { CameraAltRounded, FullscreenExitOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Modal, Backdrop } from "@mui/material";
// Custom Import
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import theme from "../../../assets/themes";
import MoreMenu from "../../../components/MoreMenu";
import OrgModalEditProfile from "./OrgModalEditProfile";

// Fetching Data Import
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";
import {
    useDeleteInstitutionImgMutation,
    useUploadInstitutionImgMutation,
} from "../../../store/api/institutionManagement/institutionApi";
import AlertMessage from "../../../components/alert/AlertMessage";
import useCatchStatus from "../../../hooks/useCatchStatus";

// =========== Start Profile Header ===========
const OrgProfileHeader = ({ institutionInfo }) => {
    const { userId } = useSelector((state) => state.global);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedImage, setUpdatedImage] = useState(DefaultProfileSvg);
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;

    const [updateImg, { isSuccess: updateImgSuccess }] = useUploadInstitutionImgMutation();
    const [deleteImg, { isSuccess: deleteImgSuccess }] = useDeleteInstitutionImgMutation();
    const [message, setMessage] = useCatchStatus(
        updateImgSuccess || deleteImgSuccess,
        updateImgSuccess ? "Update Image successfully" : "Delete Image successfully",
    );

    // Utility function to get the first available value from multiple data sources
    const getDynamicValue = (property, ...sources) => {
        for (let source of sources) {
            if (source?.[property] !== undefined) {
                return source[property];
            }
        }
        return null;
    };

    // Use the function to get the institution values dynamically
    const institutionName = getDynamicValue("institutionName", institutionInfo) || "N/A";
    const institutionCode = getDynamicValue("code", institutionInfo) || "N/A";
    const institutionImage = getDynamicValue("institutionProfileImage", institutionInfo) || "N/A";
    const institutionEmail = getDynamicValue("institutionEmail", institutionInfo) || "N/A";

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
            formData.append("institutionImg", file);
            const result = await updateImg({ id: institutionInfo.id, data: formData }).unwrap();
            setUpdatedImage(result?.record.institutionProfileImage);
        }
        event.target.value = "";
    };

    const handleDeleteImage = async () => {
        await deleteImg({ id: institutionInfo.id });
        setUpdatedImage(null);
    };

    useEffect(() => {
        if (institutionImage && updatedImage !== institutionImage) {
            setUpdatedImage(institutionInfo?.institutionProfileImage);
        }
    }, [institutionImage]);

    const userRole = userData?.Role.id;
    const isDisabled = userRole === 3 || userRole === 4;

    const menuItems = [
        {
            label: "View Profile",
            icon: <FullscreenExitOutlined color="primary" />,
            onClick: () => setIsModalOpen(true),
        },
        { label: "Remove Profile", icon: <DeleteForeverIcon color="error" />, onClick: handleDeleteImage },
    ];

    // Get the first letter of orgName for the avatar
    const firstLetter = institutionName ? institutionName.charAt(0).toUpperCase() : "";

    return (
        <>
            <Stack
                direction="column"
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: "16px",
                    p: "24px",
                    width: "100%",
                    alignItems: "center",
                    position: "relative",
                    bgcolor: theme.palette.customColors.white,
                }}
            >
                {message && (
                    <AlertMessage variant="success" onClose={() => setMessage("")}>
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
                            src={institutionImage || "https://www.mylittleadventure.com/images/default/default-img.png"}
                            alt="Image"
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
                        onClick={() => setIsModalOpen(true)}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "100%",
                            cursor: "pointer",
                        }}
                    >
                        {updatedImage ? (
                            <Box
                                component="img"
                                src={updatedImage}
                                alt="Profile"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = "none";
                                    e.target.parentNode.querySelector(".avatar-fallback").style.display = "flex";
                                }}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "100%",
                                }}
                            />
                        ) : null}

                        {/* Avatar as fallback */}
                        <Avatar
                            className="avatar-fallback"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "100%",
                                fontSize: 40,
                                display: updatedImage ? "none" : "flex",
                            }}
                        >
                            {firstLetter || "?"}
                        </Avatar>
                    </Box>

                    {!isDisabled && (
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
                                <IconButton component="span" sx={{ color: theme.palette.customColors.white }}>
                                    <CameraAltRounded />
                                </IconButton>
                            </label>
                        </Box>
                    )}
                </Box>

                {/* User Info */}
                <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                    {institutionName || "N/A"}
                </Typography>
                <Typography sx={{ fontSize: theme.typography.h5, color: theme.palette.text.secondary }}>
                    Code: {institutionCode || "N/A"}
                </Typography>

                <Typography
                    sx={{
                        fontSize: theme.typography.body2,
                        color: "text.secondary",
                        wordBreak: "break-all",
                        whiteSpace: "normal",
                        overflow: "hidden",
                    }}
                >
                    {institutionEmail || "N/A"}
                </Typography>

                {/* Conditionally render the Remove button */}
                {!isDisabled && (
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
                                textTransform: "none",
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
                )}

                {/* Edit Profile Modal */}
                <OrgModalEditProfile open={open} onClose={handleClose} institutionData={institutionInfo} />
            </Stack>
        </>
    );
};

export default OrgProfileHeader;
// =========== End Profile Header ===========
