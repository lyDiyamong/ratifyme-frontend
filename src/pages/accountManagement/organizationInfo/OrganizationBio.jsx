// React imports
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// MUI imports
import { TextField, Box, Typography, Avatar, Button, Stack, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Custom imports
import DefaultProfileSvg from "../../../assets/images/DefaultProfile.svg";
import theme from "../../../assets/themes";

// Fetching data imports
import { useFetchInfoUserByIdQuery } from "../../../store/api/users/userInfoProfileApi";
import { useUpdateInstitutionMutation } from "../../../store/api/institutionManagement/institutionApi";

// =========== Start BioContent in profile page ===========
const OrganizationBio = ({ institutionInfo }) => {
    const { userId, institutionData } = useSelector((state) => state.global);

    const [institutionBio, setInstitutionBio] = useState(""); // Initialize as empty string
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(DefaultProfileSvg);

    const bioRef = useRef(null);

    // Fetch user data and bio
    const { data: info } = useFetchInfoUserByIdQuery(userId, { skip: !userId });

    // Utility function to get the first available value from multiple data sources
    const getDynamicValue = (property, ...sources) => {
        for (let source of sources) {
            if (source?.[property] !== undefined) {
                return source[property] || ""; // Return empty string if undefined
            }
        }
        return ""; // Return empty string as fallback
    };

    // Use institutionBio instead of bio
    const institutionBioText = getDynamicValue("institutionBio", institutionInfo);
    const institutionName = getDynamicValue("institutionName", institutionInfo) || "N/A";

    const userRole = info?.data?.Role?.id;
    const isDisabled = userRole === 3 || userRole === 4;

    useEffect(() => {
        // Set profile image and institutionBio if institutionInfo is available
        if (institutionInfo) {
            const imageUrl = institutionInfo?.institutionProfileImage;
            setProfileImage(imageUrl || DefaultProfileSvg); // Fallback to default image
            setInstitutionBio(institutionBioText);
        }
    }, [institutionInfo, institutionBioText]);

    // Update user institutionBio mutation
    const [updateOrgProfile, { isLoading, isError }] = useUpdateInstitutionMutation();

    // Handle edit mode
    const handleTextClick = () => setIsEditing(true);

    // Handle form submit to update the bio
    const handleSubmit = async () => {
        if (userId) {
            try {
                await updateOrgProfile({ id: institutionData?.id, updatedData: { institutionBio } }).unwrap();
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to update institutionBio:", error);
                setIsEditing(false);
            }
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        setInstitutionBio(institutionBioText);
        setIsEditing(false);
    };

    const firstLetter = institutionName ? institutionName.charAt(0).toUpperCase() : "";

    return (
        <Stack>
            <Stack
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: "14px",
                    p: { xss: "20px", sm: "16px" },
                    bgcolor: theme.palette.customColors.white,
                    gap: 2,
                    height: "260px",
                    position: "relative",
                }}
            >
                {/* Header with "Bio" and Status */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" gap={3} alignItems="center">
                        <Typography
                            sx={{
                                fontSize: theme.typography.h5,
                                fontWeight: theme.fontWeight.semiBold,
                            }}
                        >
                            Bio Summary
                        </Typography>
                        {!isDisabled && (
                            <Chip
                                label={institutionBio ? "Active" : "No Bio"}
                                icon={<CheckCircleOutlineIcon color="green" />}
                                sx={{
                                    backgroundColor: institutionBio
                                        ? theme.palette.customColors.green100
                                        : theme.palette.customColors.red100,
                                    color: institutionBio
                                        ? theme.palette.customColors.green300
                                        : theme.palette.customColors.red300,
                                    fontWeight: "bold",
                                    py: 0.5,
                                    px: 1,
                                    borderRadius: theme.customShape.btn,
                                    textTransform: "uppercase",
                                    fontSize: "12px",
                                }}
                            />
                        )}
                    </Stack>
                </Stack>
                {!isDisabled && (
                    <Stack direction="row" alignItems="center" spacing={3} sx={{ width: "100%" }}>
                        {profileImage ? (
                            <Avatar alt="Organization Avatar" src={profileImage} sx={{ width: 50, height: 50 }} />
                        ) : (
                            <Avatar
                                className="avatar-fallback"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    objectFit: "cover",
                                    borderRadius: "100%",
                                    fontSize: 24,
                                    display: profileImage ? "none" : "flex",
                                }}
                            >
                                {firstLetter || "?"}
                            </Avatar>
                        )}

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
                                py: 1,
                                width: "100%",
                                overflow: "hidden",
                                borderRadius: theme.customShape.input,
                            }}
                            onClick={handleTextClick}
                        >
                            {isEditing ? (
                                <Stack width="100%" alignItems="end">
                                    <TextField
                                        value={institutionBio}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 500) {
                                                setInstitutionBio(e.target.value);
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
                                        {`${institutionBio.length}/500 `}
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
                                    title={institutionBio}
                                >
                                    Describe your institution here...
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                )}
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
                        title={institutionBio}
                    >
                        {institutionBio || "There are no bio yet!"}
                    </Typography>
                )}

                {/* Save and Cancel Buttons */}
                {isEditing && (
                    <Stack direction="row" gap={1} justifyContent="flex-end" width="100%" position="absolute" bottom={16} px={2}>
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
                            variant="text"
                            onClick={handleCancel}
                            sx={{
                                borderRadius: "30px",
                                fontWeight: "bold",
                                color: theme.palette.secondary.light,
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

export default OrganizationBio;
// =========== End BioContent in profile page ===========
