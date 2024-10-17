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
import MaleUserDefault from "../../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../../assets/images/FemaleUser.svg";
import EditProfileModal from "../ModalEditProfile";
import theme from "../../../assets/themes";

// Fetching Data Import
import {
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../store/api/users/userInfoProfileApi";
import { useGetIssuersQuery } from "../../../store/api/issuerManagement/issuerApi";
import { useGetInstitutionQuery } from "../../../store/api/institutionManagement/institutionApi";
import MoreMenu from "../../../components/MoreMenu";
import OrgModalEditProfile from "./OrgModalEditProfile";

// =========== Start Profile Header ===========
const OrgProfileHeader = ({ institutionInfo }) => {
    const { userId } = useSelector((state) => state.global);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(DefaultProfileSvg);
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const { data: issuers, isLoading: isLoadingIssuer } = useGetIssuersQuery();
    const { data: institutions, isLoading: isLoadingInstitution } = useGetInstitutionQuery();
    const userData = info?.data;

    const [updateImg] = useUploadUserPfMutation();
    const [deleteImg] = useDeleteUserPfMutation();

    // const issuerDataInsti = issuers?.data?.filter((issuer) => issuer?.userId === userId) || {};

    const issuerData = issuers?.data?.find((issuer) => issuer?.userId === userId) || {};

    // Data for view profile
    const institutionData = institutions?.data?.find((institution) => institution.userId === userId) || {};
    console.log("Institution data", institutionData);

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
    const institutionName = getDynamicValue("institutionName", institutionData, institutionInfo?.Institution) || "N/A";
    const institutionCode = getDynamicValue("code", institutionData, institutionInfo?.Institution) || "N/A";
    const institutionImage =
        getDynamicValue("institutionProfileImage", institutionData, institutionInfo?.Institution) || "N/A";
    const institutionEmail =
        getDynamicValue("institutionEmail", institutionData, institutionInfo?.Institution) || "N/A";

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

    // console.log("my insti", issuerData?.Institution.institutionName);
    // console.log("my insti data👨🏻‍💻", issuerData?.Institution);

    useEffect(() => {
        // Update the image based on the issuer data if available
        if (institutionImage) {
            setUpdateImage(institutionImage);
        } else if (userData?.profileImage) {
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
    }, [issuerData, userData?.profileImage, userData?.Gender?.name]);

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
                        {updateImage ? (
                            <Box
                                component="img"
                                src={updateImage}
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
                                display: updateImage ? "none" : "flex",
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
                <OrgModalEditProfile open={open} onClose={handleClose} institutionData={institutionData} />
            </Stack>
        </>
    );
};

export default OrgProfileHeader;
// =========== End Profile Header ===========
