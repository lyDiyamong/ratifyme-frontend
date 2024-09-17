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
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Cake as CakeIcon,
    School as SchoolIcon,
    Public as PublicIcon,
    BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";

//The getValue function is a utility function designed to retrieve the value from a nested object using a string-based path.
const getValue = (obj, keyPath) => {
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

// ============ Start Profile Modal ============ 
// Thsi modal is handle on display model when click on view button in table list
const ProfileModal = ({ open, onClose, item, avatarKey, nameKey, roleKey, desKey, details }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <DialogTitle>Personal Information</DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent>
                {/* Info Section */}
                <Stack flexDirection="column" alignItems="center" mb={4}>
                    <Avatar
                        src={getValue(item, avatarKey) || "/placeholder.jpg"}
                        alt={getValue(item, nameKey)}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Typography variant="h4" mt={2}>
                        {getValue(item, nameKey) || "N/A"}
                    </Typography>
                    <Typography variant="body1">
                        <Box display="flex" alignItems="center" mt={1}>
                            <BusinessCenterIcon sx={{ mr: 1 }} fontSize="small" />{" "}
                            <Typography component="h2" sx={{ textTransform: "capitalize" }}>
                                {getValue(item, roleKey) || "No role"}
                            </Typography>
                        </Box>
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 4 }} />
                
                {/* Details Section */}
                <Grid container spacing={2} justifyContent="center">
                    {details.map(({ icon, label, valueKey }, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Box component="span">{icon}</Box>
                                <Typography variant="body2">{label}</Typography>
                            </Stack>

                            <Typography variant="body3" color="textSecondary">
                                {getValue(item, valueKey) || "N/A"}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                {/* Bio Section */}
                <Divider sx={{ mt: 4 }} />
                <Box my={4}>
                    <Typography variant="h6">BIO</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {getValue(item, desKey) || "No bio available"}
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

ProfileModal.defaultProps = {
    avatarKey: "profileImage",
    nameKey: "username",
    roleKey: "role",
    desKey: "boi",
};

export default ProfileModal;
// ============ End Profile Modal ============ 