// MUI Import 
import { Box, Typography, CircularProgress } from "@mui/material";
import ProfileModal from "../../components/ProfileModal";
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Cake as CakeIcon,
    School as SchoolIcon,
    Public as PublicIcon,
    BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";

// Fetching Data Import
import { useFetchEarnerByIdQuery } from "../../store/api/earnerManagement/earnerApis";

// ============ Start Profile Earner Modal Custom Button ============
const ProfileEarnerModal = ({ open, onClose, userId }) => {
    // Prevent the API query from running if userId is null or undefined
    const { data, isLoading, isError } = useFetchEarnerByIdQuery(userId, { skip: !userId });

    const earner = data?.data;

    return (
        <ProfileModal
            open={open}
            onClose={onClose}
            item={earner}
            avatarKey="User.profileImage"
            nameKey="User.username"
            roleKey="User.Role.name"
            desKey="User.bio"
            details={[
                { icon: <PhoneIcon fontSize="small" />, label: "Phone", valueKey: "User.phoneNumber" },
                { icon: <CakeIcon fontSize="small" />, label: "Date of Birth", valueKey: "User.dob" },
                { icon: <EmailIcon fontSize="small" />, label: "Email", valueKey: "User.email" },
                {
                    icon: <BusinessCenterIcon fontSize="small" />,
                    label: "Organization",
                    valueKey: "AcademicBackground.Institution.name",
                },
                {
                    icon: <SchoolIcon fontSize="small" />,
                    label: "Education",
                    valueKey: "AcademicBackground.AcademicLevel.name",
                },
                { icon: <PublicIcon fontSize="small" />, label: "Country", valueKey: "User.nationality" },
            ]}
        >
            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            )}
            {isError && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography color="error">Error fetching data</Typography>
                </Box>
            )}
        </ProfileModal>
    );
};

export default ProfileEarnerModal;
// ============ End Profile Earner Modal Custom Button ============
