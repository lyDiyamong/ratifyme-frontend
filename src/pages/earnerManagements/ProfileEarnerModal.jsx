// MUI Import 
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Cake as CakeIcon,
    School as SchoolIcon,
    Public as PublicIcon,
    BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";

// Custom Import
import ProfileModal from "../../components/ProfileModal";
import FormatDate from "../../utils/formatDate";

// Fetching Data Import
import { useFetchEarnerByIdQuery } from "../../store/api/earnerManagement/earnerApis";

/**
 * ProfileEarnerModal Component
 *
 * This component is responsible for displaying detailed profile information about a specific earner 
 * in a modal using the `ProfileModal` component. It fetches data based on the `userId` and displays 
 * personal details such as phone, email, organization, and more.
 *
 * @param {boolean} open - Controls whether the modal is open or closed.
 * @param {function} onClose - Callback function to close the modal.
 * @param {string|null} userId - The ID of the user to fetch data for. If null, the modal doesn't fetch any data.
 *
 * @returns {JSX.Element} A modal component displaying earner profile information.
 */

// ============ Start Profile Earner Modal Custom Button ============
const ProfileEarnerModal = ({ open, onClose, userId }) => {
    // Prevent the API query from running if userId is null or undefined
    const { data: user, isLoading, isError } = useFetchEarnerByIdQuery(userId, { skip: !userId });

    let earnerData = user?.data;

    // Preprocess the dateOfBirth by formatting it
    if (earnerData && earnerData.User && earnerData.User.dateOfBirth) {
        earnerData = {
            ...earnerData,
            User: {
                ...earnerData.User,
                formattedDateOfBirth: FormatDate(earnerData.User.dateOfBirth),
                fullName: `${earnerData.User.firstName} ${earnerData.User.lastName}`
            }
        };
    }

    return (
        // Call Profile Modal
        <ProfileModal
            open={open}
            onClose={onClose}
            item={earnerData}
            avatarKey="User.profileImage"
            nameKey="User.fullName"
            roleKey="User.Role.name"
            desKey="User.bio"
            details={[
                { 
                    icon: <PhoneIcon fontSize="small" sx={{ color: "#ff6f61" }}/>, 
                    label: "Phone", 
                    valueKey: "User.phoneNumber" 
                },
                { 
                    icon: <CakeIcon fontSize="small" sx={{ color: "#f48fb1" }} />, 
                    label: "Date of Birth",
                    valueKey: "User.formattedDateOfBirth" 
                },
                { 
                    icon: <EmailIcon fontSize="small" sx={{ color: "#42a5f5" }} />,  
                    label: "Email", 
                    valueKey: "User.email" 
                },
                {
                    icon: <BusinessCenterIcon fontSize="small" sx={{ color: "#9575cd" }} />,
                    label: "Organization", 
                    valueKey: "Issuer.Institution.institutionName" 
                },
                {
                    icon: <SchoolIcon fontSize="small" sx={{ color: "#4db6ac" }} />,
                    label: "Education", 
                    valueKey: "AcademicBackground.AcademicLevel.name" 
                },
                { 
                    icon: <PublicIcon fontSize="small" sx={{ color: "#81c784" }} />,
                    label: "Nationality", 
                    valueKey: "User.nationality" 
                },
            ]}
        >
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching data</p>}
        </ProfileModal>
    );
};

export default ProfileEarnerModal;
// ============ End Profile Earner Modal Custom Button ============