// MUI Import 
import {
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Avatar,
    IconButton,
    Box,
    Grid,
    Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import DefaultProfile from "../assets/images/Malen.webp";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// Styled components to add colors and card-like styles
const StyledDialog = styled(Dialog)(({ theme }) => ({
    ".MuiPaper-root": {
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: "#ffffff",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.15)",
    padding: "20px",
    background: "linear-gradient(to bottom, #ffffff, #e0f7fa)",
    height: "100%",
}));

const getValue = (obj, keyPath) => {
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

// ============ Start Profile Modal ============
const ProfileModal = ({ open, onClose, item, avatarKey, nameKey, roleKey, desKey, details }) => {
    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* Modal Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} pr={2}>
                <DialogTitle variant="h3" sx={{ fontWeight: 600, color: "#0288d1" }}>Personal Information</DialogTitle>
                <IconButton onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} mb={2} sx={{ height: "full"}}>
                        <ProfileCard>
                            <Stack flexDirection="column" alignItems="center" mb={2} sx={{ height: "100%" }}>
                                <Avatar
                                    src={getValue(item, avatarKey) || DefaultProfile}
                                    alt={getValue(item, nameKey)}
                                    sx={{
                                        width: "150px", 
                                        height: "150px",
                                        borderRadius: "50%",
                                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                    }}
                                />
                                <Typography variant="h3" mt={2} fontWeight={700}>
                                    {getValue(item, nameKey) || "N/A"}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <WorkOutlineIcon sx={{color: "#42a5f5"}}/> 
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                        mt={1}
                                        sx={{ textTransform: "capitalize", fontWeight: 600 }} // Emphasize role
                                    >
                                        {getValue(item, roleKey) || "N/A"}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" color="textSecondary" mt={4}>
                                    {getValue(item, desKey) || "No bio available"}
                                </Typography>
                            </Stack>
                        </ProfileCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <StyledCard>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Additional Details
                            </Typography>
                            <Grid container spacing={2}>
                                {details.map(({ icon, label, valueKey }, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            {icon}
                                            <Typography variant="body2">{label}</Typography>
                                        </Stack>
                                        <Typography variant="body3" color="textSecondary">
                                            {getValue(item, valueKey) || "N/A"}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </StyledCard>

                        <StyledCard>
                            <Typography variant="h6" fontWeight={600} mb={2}>
                                Address
                            </Typography>
                            <Typography variant="body3" color="textSecondary">
                                {(() => {
                                    const addresses = getValue(item, "User.Addresses") || [];
                                    const address = addresses.length > 0 ? addresses[0] : {};
                                    return `Street: ${address.street || "N/A"}, 
                                            City: ${address.city || "N/A"}, 
                                            Postal Code: ${address.postalCode || "N/A"}, 
                                            Country: ${address.country || "N/A"}`;
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
