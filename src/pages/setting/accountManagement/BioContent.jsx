// React import
import { useEffect, useState } from "react";

// MUI import
import { TextField, Box, Typography, Avatar, Button, Stack, Divider, Chip } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import { useFetchInfoUserByIdQuery, useUpdateUserProfileMutation } from "../../../store/api/users/userInfoProfileApi";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../../assets/images/FemaleUser.svg";

import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import MoreMenu from "../../../components/MoreMenu";

const BioContent = () => {
    const { userId } = useSelector((state) => state.global);

    const [bio, setBio] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [originalBio, setOriginalBio] = useState(bio);
    const [profileImage, setProfileImage] = useState(DefaultProfileSvg);

    // Fetch user data and bio
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userBio = info?.data?.bio || bio;
    const gender = info?.data?.Gender?.name;

    // Update user bio mutation
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

    useEffect(() => {
        // Set profile image based on gender
        if (info?.data?.profileImage && info.data.profileImage !== profileImage) {
            setProfileImage(info.data.profileImage);
        } else if (gender === "male") {
            setProfileImage(MaleUserDefault);
        } else if (gender === "female") {
            setProfileImage(FemaleUserDefault);
        } else {
            setProfileImage(DefaultProfileSvg);
        }

        if (info?.data?.bio && info.data.bio !== bio) {
            setBio(info.data.bio);
            setOriginalBio(info.data.bio);
        }
    }, [info, gender]);

    // Handle edit mode
    const handleTextClick = () => {
        setOriginalBio(bio);
        setIsEditing(true);
    };

    // Handle the Enter
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await handleSubmit();
        }
    };

    // Handle form submit to update the bio
    const handleSubmit = async () => {
        if (bio && userId) {
            try {
                await updateUserProfile({
                    id: userId,
                    data: { bio },
                }).unwrap();

                setIsEditing(false);
            } catch (error) {
                console.error("Failed to update bio:", error);
                setIsEditing(false);
            }
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        setBio(originalBio);
        setIsEditing(false);
    };

    // More Menu props
    const menuItems = [{ label: "Update Bio", onClick: handleTextClick },];

    return (
        <Stack gap={3}>
            <Stack
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: { xss: "20px", sm: "24px" },
                    bgcolor: theme.palette.customColors.white,
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <Stack
                    sx={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        // gap: 1,
                    }}
                >
                    <Stack
                        sx={{
                            flexDirection: { xs: "row", xss: "column" },
                            alignItems: { xs: "center", xss: "start" },
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h4,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            About Me
                        </Typography>

                        <Chip
                            icon={<GridCheckCircleIcon color={theme.palette.customColors.green300} />}
                            label="Status"
                            sx={{
                                fontSize: theme.typography.h5,
                                fontWeight: theme.fontWeight.semiBold,
                                backgroundColor: userBio
                                    ? theme.palette.customColors.green100
                                    : theme.palette.action.error,
                                py: 2.5,
                                borderRadius: theme.customShape.section,
                                color: userBio
                                    ? theme.palette.customColors.green300
                                    : theme.palette.customColors.red200,
                                textTransform: "none",
                            }}
                        />
                    </Stack>
                    <MoreMenu menuItems={menuItems} />
                </Stack>

                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2, width: "100%" }}>
                    {/* Start Profile Status */}
                    <Avatar alt="User Avatar" src={profileImage} sx={{ width: 40, height: 40 }} />

                    {/* Start Editable Text Field */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 2,
                            borderRadius: theme.customShape.btn,
                            flexGrow: 1,
                            cursor: "pointer",
                            backgroundColor: theme.palette.background.secondary,
                            px: 3,
                            py: 2,
                            width: "100%",
                        }}
                        onClick={handleTextClick}
                    >
                        {isEditing ? (
                            <Stack width="100%" px={1} alignItems="end">
                                <TextField
                                    value={bio}
                                    onChange={(e) => {
                                        // Update bio only if the length is less than or equal to 500
                                        if (e.target.value.length <= 500) {
                                            setBio(e.target.value);
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                    variant="outlined"
                                    autoFocus
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    InputProps={{
                                        sx: {
                                            border: "none",
                                            "& fieldset": { border: "none" },
                                            outline: "none",
                                        },
                                    }}
                                />
                                <Typography
                                    sx={{ color: theme.palette.text.secondary, px: 2 }}
                                >{`${bio.length}/500 `}</Typography>
                            </Stack>
                        ) : (
                            <Typography
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: "16px",
                                    width: "100%",
                                }}
                            >
                                Describe your thought!
                            </Typography>
                        )}
                    </Box>
                </Stack>

                <Typography
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "16px",
                        width: "100%",
                    }}
                >
                    {userBio || "There is no bio yet!"}
                </Typography>

                {/* Start Save and Cancel Buttons */}
                {isEditing && (
                    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                        <Stack direction="row" gap={1}>
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.customColors.white,
                                    borderRadius: theme.customShape.btn,
                                    "&:hover": {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                {isLoading ? "Saving..." : "Save Bio"}
                            </Button>
                            <Button
                                variant="text"
                                onClick={handleCancel}
                                sx={{
                                    borderRadius: theme.customShape.btn,
                                    "&:hover": {
                                        bgcolor: theme.palette.background.default,
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Stack>
    );
};

export default BioContent;
