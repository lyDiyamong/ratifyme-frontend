// MUI import 
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Cake as CakeIcon,
    BusinessCenter as BusinessCenterIcon,
} from "@mui/icons-material";

// Custom import
import ProfileModal from "../../components/ProfileModal";
import FormatDate from "../../utils/formatDate";

// API import
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
                    icon: <PhoneIcon fontSize="small" />, 
                    label: "Phone", 
                    valueKey: "User.phoneNumber" 
                },
                { 
                    icon: <CakeIcon fontSize="small"  />, 
                    label: "Date of Birth",
                    valueKey: "User.formattedDateOfBirth" 
                },
                { 
                    icon: <EmailIcon fontSize="small"  />,  
                    label: "Email", 
                    valueKey: "User.email" 
                },
                {
                    icon: <BusinessCenterIcon fontSize="small"  />,
                    label: "Organization", 
                    valueKey: "Issuer.Institution.institutionName" 
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