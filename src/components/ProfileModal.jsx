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

/**
 * ProfileModal Component
 * 
 * @param {boolean} open - Controls whether the modal is open or closed.
 * @param {function} onClose - Function to handle closing the modal.
 * @param {object} item - The data object representing the user's profile.
 * @param {string} avatarKey - The key path to the user's avatar image in the `item` object.
 * @param {string} nameKey - The key path to the user's name in the `item` object.
 * @param {string} roleKey - The key path to the user's role in the `item` object.
 * @param {string} desKey - The key path to the user's description or bio in the `item` object.
 * @param {Array} details - An array of detail objects, where each object contains an icon, label, and valueKey for displaying additional profile information.
 * 
 * @returns {JSX.Element} A Material-UI styled Dialog component displaying user profile information with avatar, name, role, bio, and additional details.
*/

// The getValue function is a utility function designed to retrieve the value from a nested object using a string-based path.
const getValue = (obj, keyPath) => {
    return keyPath.split(".").reduce((o, k) => (o || {})[k], obj);
};

// ============ Start Profile Modal ============ 
// This modal handles displaying profile information when clicking the view button in the table list
const ProfileModal = ({ open, onClose, item, avatarKey, nameKey, roleKey, desKey, details }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <DialogTitle>Personal Information</DialogTitle>
                <IconButton onClick={onClose} aria-label="Close">
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
                    <Box mt={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                                {getValue(item, roleKey) || "No role"}
                            </Typography>
                        </Stack>
                    </Box>
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
                            <Typography variant="body2" color="textSecondary">
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

export default ProfileModal;
// ============ End Profile Modal ============
