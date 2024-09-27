// React import
import { useEffect, useState } from "react";

// MUI import
import { TextField, Box, Typography, Avatar, Button, Stack, Divider } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";
import { useCheckAuthQuery } from "../../../store/api/auth/authApi";
import { useFetchInfoUserByIdQuery, useUpdateUserProfileMutation } from "../../../store/api/users/userInfoProfileApi";
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import { GridCheckCircleIcon } from "@mui/x-data-grid";

const BioContent = () => {
    const { data: user } = useCheckAuthQuery();
    const userId = user?.user?.id;

    const [bio, setBio] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [originalBio, setOriginalBio] = useState(bio);
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
                    sx={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                >
                    <Typography
                        sx={{
                            fontSize: theme.typography.h4,
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
                            cursor: "pointer",
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
            </Stack>

            <Stack
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    p: { xss: "20px", sm: "24px" },
                    bgcolor: theme.palette.customColors.white,
                    gap: 3,
                }}
            >
                <Stack
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
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

                    <Button
                        startIcon={<GridCheckCircleIcon />}
                        sx={{
                            fontSize: theme.typography.h5,
                            fontWeight: theme.fontWeight.semiBold,
                            backgroundColor: userBio ? theme.palette.customColors.green500 : theme.palette.action.error,
                            p: 1,
                            px: 2,
                            borderRadius: theme.customShape.section,
                            color: userBio ? theme.palette.customColors.green200 : theme.palette.customColors.red200,
                            textTransform: "none",
                        }}
                    >
                        Status
                    </Button>
                </Stack>
                {!isEditing && <Typography width="100%">{userBio || "There is no Bio yet! 💥"}</Typography>}
            </Stack>
        </Stack>
    );
};

export default BioContent;
