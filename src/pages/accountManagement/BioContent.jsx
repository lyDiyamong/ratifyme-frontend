// React imports
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// MUI imports
import { TextField, Box, Typography, Avatar, Button, Stack, Chip } from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";

// Custom imports
import DefaultProfileSvg from "../../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../../assets/images/MaleUser.svg";
import FemaleUserDefault from "../../assets/images/FemaleUser.svg";
import MoreMenu from "../../components/MoreMenu";
import theme from "../../assets/themes";

// Fetching data imports
import { useFetchInfoUserByIdQuery, useUpdateUserProfileMutation } from "../../store/api/users/userInfoProfileApi";

// =========== Start BioContent in profile page ===========
// BioContent component with status chip and updated styles
const BioContent = () => {
    const { userId } = useSelector((state) => state.global);

    const [bio, setBio] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(DefaultProfileSvg);

    const bioRef = useRef(null); // Reference to the Typography component

    // Fetch user data and bio
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });

    useEffect(() => {
        // Set profile image based on gender and bio
        if (info?.data) {
            setProfileImage(
                info.data.profileImage ||
                    (info.data.Gender?.name === "male" ? MaleUserDefault : FemaleUserDefault) ||
                    DefaultProfileSvg,
            );
            setBio(info.data.bio || "");
        }
    }, [info]);

    // Update user bio mutation
    const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

    // Handle edit mode
    const handleTextClick = () => setIsEditing(true);

    // Handle form submit to update the bio
    const handleSubmit = async () => {
        if (bio && userId) {
            try {
                await updateUserProfile({ id: userId, data: { bio } }).unwrap();
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to update bio:", error);
                setIsEditing(false);
            }
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        setBio(info?.data?.bio || "");
        setIsEditing(false);
    };

    // More Menu props
    const menuItems = [{ label: "Update Bio", onClick: handleTextClick }];

    return (
        <Stack>
            <Stack
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: "16px",
                    p: { xs: "20px", sm: "16px" },
                    bgcolor: theme.palette.customColors.white,
                    alignItems: "center",
                    gap: 3,
                    width: "100%",
                    height: "290px",
                    position: "relative",
                }}
            >
                {/* Header with "About Me" and Status */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                    <Stack direction="row" gap={3} alignItems="center">
                        <Typography
                            sx={{
                                fontSize: theme.typography.h5,
                                fontWeight: theme.fontWeight.semiBold,
                                color: theme.palette.customColors.red400,
                            }}
                        >
                            Bio
                        </Typography>
                        {/* Status Chip */}
                        <Chip
                            label={bio ? "Active" : "No Bio"}
                            icon={<GridCheckCircleIcon />}
                            sx={{
                                backgroundColor: bio
                                    ? theme.palette.customColors.green100
                                    : theme.palette.customColors.red100,
                                color: bio ? theme.palette.customColors.green300 : theme.palette.customColors.red300,
                                fontWeight: "bold",
                                py: 0.5,
                                px: 2,
                                borderRadius: "8px",
                                textTransform: "uppercase",
                                fontSize: "12px",
                            }}
                        />
                    </Stack>
                    <MoreMenu menuItems={menuItems} />
                </Stack>

                {/* Bio Input */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%" }}>
                    {/* Bio Text / Editable Input */}
                    <Avatar alt="User Avatar" src={profileImage} sx={{ width: 50, height: 50 }} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            gap: 2,
                            flexGrow: 1,
                            cursor: "pointer",
                            backgroundColor: theme.palette.background.secondary,
                            px: 2,
                            py: 0.5,
                            width: "100%",
                            overflow: "hidden",
                        }}
                        onClick={handleTextClick}
                    >
                        {isEditing ? (
                            <Stack width="100%" alignItems="end">
                                <TextField
                                    value={bio}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 500) {
                                            setBio(e.target.value);
                                        }
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    variant="outlined"
                                    autoFocus
                                    fullWidth
                                    multiline
                                    maxRows={3}
                                    InputProps={{
                                        sx: {
                                            border: "none",
                                            "& fieldset": { border: "none" },
                                        },
                                    }}
                                />
                                <Typography sx={{ color: theme.palette.text.secondary }}>
                                    {`${bio.length}/500 `}
                                </Typography>
                            </Stack>
                        ) : (
                            <Typography
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: "16px",
                                    width: "100%",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                                title={bio}
                            >
                                Describe yourself here...
                            </Typography>
                        )}
                    </Box>
                </Stack>
                {isEditing ? null : (
                    <Typography
                    ref={bioRef}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "16px",
                      width: "100%",
                      height: "100px", 
                      overflowY: "auto", 
                      wordWrap: "break-word", 
                      whiteSpace: "normal",
                    }}
                    title={bio}
                  >
                    {bio || "Describe yourself here..."}
                  </Typography>
                  
                )}

                {/* Save and Cancel Buttons */}
                {isEditing && (
                    <Stack
                        direction="row"
                        gap={1}
                        justifyContent="flex-end"
                        width="100%"
                        position="absolute"
                        bottom={16}
                        px={2}
                    >
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            variant="contained"
                            sx={{
                                background: theme.palette.secondary.light,
                                color: theme.palette.customColors.white,
                                borderRadius: "30px",
                                fontWeight: "bold",
                            }}
                        >
                            {isLoading ? "Saving..." : "Save Bio"}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCancel}
                            sx={{
                                borderRadius: "30px",
                                fontWeight: "bold",
                                color: theme.palette.customColors.white,
                                background: theme.palette.customColors.red400,

                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default BioContent;
// =========== End BioContent in profile page ===========
