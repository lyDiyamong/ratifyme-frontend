// React import
import { useEffect, useState } from "react";

// MUI import
import { TextField, Box, Typography, Avatar, Button, Stack } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import { useCheckAuthQuery } from "../../../store/api/auth/authApi";
import { useFetchInfoUserByIdQuery, useUpdateUserProfileMutation } from "../../../store/api/users/userInfoProfileApi";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";

const BioContent = () => {
    const { data: user } = useCheckAuthQuery();
    const userId = user?.user?.id;

    const [bio, setBio] = useState("Share more about yourself");
    const [isEditing, setIsEditing] = useState(false);
    const [originalBio, setOriginalBio] = useState(bio); // Store original bio
    const [profileImage, setProfileImage] = useState(DefaultProfileSvg);

    // Fetch user data and bio
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });
    const userBio = info?.data?.bio || bio;

    // Update user bio mutation
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

    useEffect(() => {
        if (info?.data?.profileImage && info.data.profileImage !== profileImage) {
            setProfileImage(info.data.profileImage);
        } else if (!info?.data?.profileImage && profileImage !== DefaultProfileSvg) {
            setProfileImage(DefaultProfileSvg);
        }

        if (info?.data?.bio && info.data.bio !== bio) {
            setBio(info.data.bio);
            setOriginalBio(info.data.bio);
        }
    }, [info]);

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

    return (
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
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Typography
                    sx={{
                        fontSize: theme.typography.h5,
                        fontWeight: theme.fontWeight.semiBold,
                    }}
                >
                    Bio Summary
                </Typography>
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
                        // border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.secondary,
                        px: 3,
                        py: 2,
                        width: "100%",
                    }}
                    onClick={handleTextClick}
                >
                    {isEditing ? (
                        <TextField
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            onKeyDown={handleKeyDown}
                            variant="outlined"
                            autoFocus
                            fullWidth
                            InputProps={{
                                sx: {
                                    border: "none",
                                    "& fieldset": { border: "none" },
                                    outline: "none",
                                },
                            }}
                        />
                    ) : (
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: "16px",
                                width: "100%",
                            }}
                        >
                            What is on your mind?
                        </Typography>
                    )}
                </Box>
            </Stack>

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

            {!isEditing && (
                <Typography maxWidth={600} width="100%" textAlign="center">
                    {userBio || "No Bio yet! 💥"}
                </Typography>
            )}
        </Stack>
    );
};

export default BioContent;
