// React Library Import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUI Import
import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import { CameraAltRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import { borderRadius } from "@mui/system";

// =========== Start Profile Header ===========
const OrgProfileHeader = () => {
    const { userId } = useSelector((state) => state.global);
    const [open, setOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(DefaultProfileSvg);
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const { data: issuers, isLoading: isLoadingIssuer } = useGetIssuersQuery();
    const { data: institutions, isLoading: isLoadingInstitution } = useGetInstitutionQuery();
    const userData = info?.data;

    const [updateImg] = useUploadUserPfMutation();
    const [deleteImg] = useDeleteUserPfMutation();

    const issuerData = issuers?.data?.find((issuer) => issuer.userId === userId) || {};

    const institutionData = institutions?.data?.find((institution) => institution.userId === userId) || {};

    // All data to fetch, NOTE: cannot use dinamically cuz the fetching data is different
    const institutionName = institutionData?.institutionName || issuerData.Institution?.institutionName;
    const institutionCode = institutionData?.code || issuerData.Institution?.code;
    const institutionImage =
        institutionData?.institutionProfileImage || issuerData.Institution?.institutionProfileImage;
    const institutionEmail = institutionData?.institutionEmail || issuerData.Institution?.institutionEmail;

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
        { label: "Remove Profile", onClick: {handleClickOpen} },
        { label: "View Profile", onClick: {} },
    ];

    return (
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
            <Typography sx={{ fontSize: theme.typography.h5, color: theme.palette.text.disabled }}>
                Code: {institutionCode || "N/A"}
            </Typography>

            <Typography sx={{ fontSize: theme.typography.body2, color: "text.secondary" }}>
                {institutionEmail || "N/A"}
            </Typography>

            {/* Conditionally render the Remove button */}
            {!isDisabled && (
                <Stack direction={{ sm: "row", xss: "column" }} spacing={0.5} mt={2}>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{
                            px: 2,
                            mt: 2,
                            background: theme.palette.secondary.light,
                            color: theme.palette.customColors.white,
                            fontWeight: "bold",
                            borderRadius: "30px",
                        }}
                    >
                        Edit profile
                    </Button>

                    <Button
                        onClick={handleDeleteImage}
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        color="error"
                        sx={{
                            px: 2,
                            mt: 2,
                            fontWeight: "bold",
                            borderRadius: "30px",
                        }}
                    >
                        Remove
                    </Button>
                    <MoreMenu
                        menuItems={menuItems}
                        iconStyles={{
                            color: "black",
                            backgroundColor: theme.palette.background.secondary,
                            borderRadius: theme.customShape.section,
                        }}
                    />
                </Stack>
            )}

            {/* Edit Profile Modal */}
            <EditProfileModal open={open} onClose={handleClose} userData={userData} />
        </Stack>
    );
};

export default OrgProfileHeader;
// =========== End Profile Header ===========
