// React library import
import { useState, useEffect } from "react";

// MUI import
import { Stack, Dialog, DialogTitle, DialogContent, Typography, Avatar, IconButton, Box, Grid, Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

// Custom import
import DefaultProfileSvg from "../assets/images/DefaultProfile.svg";
import MaleUserDefault from "../assets/images/MaleUser.svg";
import FemaleUserDefault from "../assets/images/FemaleUser.svg";
import theme from "../assets/themes";

/**
 * ProfileModal Component
 *
 * @param {boolean} open - Controls whether the modal is open or closed.
 * @param {function} onClose - Function to handle closing the modal.
 * @param {object} item - The data object representing the user's profile.
 * @param {string} avatarKey - The key path to the user's avatar image in the item object.
 * @param {string} nameKey - The key path to the user's name in the item object.
 * @param {string} roleKey - The key path to the user's role in the item object.
 * @param {string} desKey - The key path to the user's description or bio in the item object.
 * @param {Array} details - An array of detail objects, where each object contains an icon, label, and valueKey for displaying additional profile information.
 *
 * @returns {JSX.Element} A Material-UI styled Dialog component displaying user profile information with avatar, name, role, bio, and additional details.
 */
const getValue = (obj, keyPath) => {
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

// Style
const StyledDialog = styled(Dialog)(({ theme }) => ({
    ".MuiPaper-root": {
        borderRadius: theme.shape.borderRadius * 2,
        backgroundColor: theme.palette.customColors.white,
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.customColors.white,
    border: "1px solid #E4E5EB",
    boxShadow: "none",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    border: "1px solid #E4E5EB",
    boxShadow: "none",
    padding: "20px",
    height: "100%",
}));

// ============ Start Profile Modal ============
const ProfileModal = ({ open, onClose, item, avatarKey, nameKey, roleKey, desKey, details }) => {
    const [avatarImage, setAvatarImage] = useState(DefaultProfileSvg);

    // UseEffect to set avatar based on user data
    useEffect(() => {
        const profileImage = getValue(item, avatarKey);

        if (profileImage) {
            setAvatarImage(profileImage);
        } else if (getValue(item, "Gender.name") === "male") {
            setAvatarImage(MaleUserDefault);
        } else if (getValue(item, "Gender.name") === "female") {
            setAvatarImage(FemaleUserDefault);
        } else {
            setAvatarImage(DefaultProfileSvg);
        }
    }, [item, avatarKey]);

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* Modal Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} pr={2}>
                <DialogTitle variant="h3" sx={{ fontWeight: theme.fontWeight.bold }}>
                    Personal Information
                </DialogTitle>
                <IconButton onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Card */}
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} mb={2} sx={{ height: "full" }}>
                        {/* Profile Card */}
                        <ProfileCard>
                            <Stack flexDirection="column" alignItems="center" mb={2} sx={{ height: "100%" }}>
                                {/* Avatar */}
                                <Avatar
                                    src={avatarImage}
                                    alt={getValue(item, nameKey)}
                                    sx={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                    }}
                                />
                                <Typography variant="h3" mt={2} sx={{ fontWeight: theme.fontWeight.extraBold }}>
                                    {getValue(item, nameKey) || "N/A"}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            textTransform: "capitalize",

                                        }}
                                    >
                                        Position :
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            textTransform: "capitalize",

                                        }}
                                        mt={1}
                                    >
                                        {getValue(item, roleKey) || "N/A"}
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    mt={4}
                                    sx={{
                                        color: theme.palette.customColors.gray500,
                                        fontSize: "14px",
                                        width: "100%",
                                        height: "100px",
                                        overflowY: "scroll",
                                        wordWrap: "break-word",
                                        whiteSpace: "normal",
                                        "&::-webkit-scrollbar": {
                                            display: "none",
                                        },
                                        "-ms-overflow-style": "none",
                                        "scrollbar-width": "none",
                                    }}
                                >
                                    {getValue(item, desKey) || "No bio available"}
                                </Typography>
                            </Stack>
                        </ProfileCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {/* More Details */}
                        <StyledCard>
                            <Typography
                                variant="h6"
                                mb={5}
                                sx={{
                                    fontWeight: theme.fontWeight.bold,
                                }}
                            >
                                Additional Details
                            </Typography>
                            <Grid container spacing={5}>
                                {details.map(({ icon, label, valueKey }, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Stack direction="row" spacing={1}>
                                            {icon}
                                            <Stack>
                                                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                                                    {label}
                                                </Typography>

                                                <Typography variant="body3" sx={{ color: theme.palette.text.secondary }}>
                                                    {getValue(item, valueKey) || "N/A"}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </StyledCard>

                        {/* Address */}
                        <StyledCard>
                            <Typography variant="h6" mb={5} sx={{ fontWeight: theme.fontWeight.bold }}>
                                Address
                            </Typography>
                            <Typography variant="body3" sx={{ color: theme.palette.customColors.gray500 }}>
                                {(() => {
                                    const addresses = getValue(item, "User.Addresses") || [];
                                    const address = addresses.length > 0 ? addresses[0] : {};
                                    return `Street: ${address.street || "N/A"}, 
                                            City: ${address.city || "N/A"}, 
                                            Country: ${address.country || "N/A"},
                                            Postal Code: ${address.postalCode || "N/A"}`;
                                })()}
                            </Typography>
                        </StyledCard>
                    </Grid>
                </Grid>
            </DialogContent>
        </StyledDialog>
    );
};

export default ProfileModal;
// ============ End Profile Modal ============
