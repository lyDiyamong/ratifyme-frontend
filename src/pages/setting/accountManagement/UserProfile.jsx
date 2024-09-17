//React Import
import { useEffect, useState } from "react";
//MUI Import
import { Box, Container, Stack, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { PersonRemoveRounded } from "@mui/icons-material";
//Custom Import
import theme from "../../../assets/themes/index";
import PhotoIconSvg from "../../../assets/icons/Photo Icon.svg";
import RoleIconSvg from "../../../assets/icons/Role.svg";
import ProfileInfo from "./ProfileInfo";
import BirthDateIcon from "../../../assets/icons/DateOfBirth.svg";
import CountryIcon from "../../../assets/icons/Country.svg";
import EmailIcon from "../../../assets/icons/Email.svg";
import OrganizationIcon from "../../../assets/icons/Organization.svg";
import PhoneIcon from "../../../assets/icons/Phone.svg";
import GenderIcon from "../../../assets/icons/Gender.svg";
import EducationIcon from "../../../assets/icons/Education.svg";

// import { ProfileInfoData } from "../../../data/setting/UserProfileData";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import EditProfileModal from "./ModalEditProfile";
import {
    useFetchInfoUserByIdQuery,
    useDeleteUserPfMutation,
    useUploadUserPfMutation,
} from "../../../store/api/users/userInfoProfileApi";
import { useCheckAuthQuery } from "../../../store/api/auth/authApi";
import MakeSureModal from "../../../components/MakeSureModal";
import { borderColor, color } from "@mui/system";

//============ Start User Profile Component ============
const UserProfile = () => {
    const { data: user } = useCheckAuthQuery();

    const userId = user.user.id;

    const [open, setOpen] = useState(false);
    const [updateImage, setUpdateImage] = useState(DefaultProfileSvg);

    // Fetch data
    const { data: info, isLoading, isError } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userData = info?.data;
    console.log(userData);

    const [updateImg] = useUploadUserPfMutation();
    const [deleteImg] = useDeleteUserPfMutation();

    const handleClickOpen = () => {
        console.log("User ID:", userData?.id);
        console.log("Date of birth:", userData.dateOfBirth);
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
        } else {
            setUpdateImage(DefaultProfileSvg);
        }
    }, [userData?.profileImage]);

    return (
        <Box>
            {/*============ Start User Data Container "Card" ============*/}
            <Stack
                direction={{ sm: "column", md: "row" }}
                justifyContent={"center"}
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
                                border: `solid 1px ${theme.palette.cardBorder}`,
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
                    <Stack direction={{ sm: "row", xss: "column" }} sx={{ justifyContent: "space-between", gap: 1 }}>
                        <Stack sx={{ p: "0px", gap: 2 }}>
                            {/* User Name Data */}
                            <Typography sx={{ fontSize: theme.typography.h4, fontWeight: theme.fontWeight.bold }}>
                                {/* {userData?.username} */}
                                {`${userData?.firstName || ""} ${userData?.lastName || ""}`}
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
                            sx={{ mt: { xss: "30px", sm: "0" }, gap: 1, flexDirection: { sm: "column", xs: "row" } }}
                        >
                            {/* Edit profile Button */}
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
                            {/* Edit profile modal */}
                            <EditProfileModal open={open} onClose={handleClose} userData={userData} />

                            {/* Delete profile button */}
                            <MakeSureModal
                                openBtnSx={{
                                    color: theme.palette.customColors.red300,
                                    borderColor: theme.palette.customColors.red300,
                                    "&:hover": {
                                        backgroundColor: theme.palette.action.error,
                                    },
                                }}
                                icon={<PersonRemoveRounded />}
                                variant="outlined"
                                title="Remove Your Profile Image?"
                                message="This will remove your profile picture from the application and set it to the default picture. You can also add a new one later! 👋"
                                agreeBtn={
                                    <Button
                                        sx={{
                                            color: theme.palette.customColors.red300,
                                            borderRadius: theme.customShape.btn,
                                            "&:hover": {
                                                color: theme.palette.customColors.red300,
                                                backgroundColor: theme.palette.action.error,
                                            },
                                        }}
                                    >
                                        Remove profile
                                    </Button>
                                }
                                onAgree={handleDeleteImage}
                            />
                        </Stack>
                    </Stack>
                    {/*============ End Upper User Data ============*/}

                    {/*============ Start User Data ============*/}
                    <ProfileInfo
                        item={userData}
                        details={[
                            {
                                icon: <Box component="img" src={PhoneIcon} alt="Phone Icon" />,
                                label: "Phone",
                                valueKey: "phoneNumber",
                            },
                            {
                                icon: <Box component="img" src={EmailIcon} alt="Email Icon" />,
                                label: "Email",
                                valueKey: "email",
                            },
                            {
                                icon: <Box component="img" src={BirthDateIcon} alt="Date of Birth Icon" />,
                                label: "Date of Birth",
                                valueKey: "dateOfBirth",
                            },
                            {
                                icon: <Box component="img" src={GenderIcon} alt="Gender Icon" />,
                                label: "Gender",
                                valueKey: "Gender.name",
                            },
                            {
                                icon: <Box component="img" src={EducationIcon} alt="Education Icon" />,
                                label: "Education",
                                valueKey: "edu",
                            },
                            {
                                icon: <Box component="img" src={CountryIcon} alt="Nationality Icon" />,
                                label: "Nationality",
                                valueKey: "nationality",
                            },
                        ]}
                    />
                    {/*============ End User Data ============*/}
                </Container>
            </Stack>
            {/*============ End User Data Container "Card"  ============*/}
        </Box>
    );
};
//============ End User Profile Component ============
export default UserProfile;
