import { useNavigate } from "react-router-dom";
// MUI import
import { Typography } from "@mui/material";

// Custom import
import { useFetchBadgesByIssuerQuery } from "../../store/api/badgeManagement/badgeApi";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";
import BadgeListCard from "../../components/BadgeListCard";

const BadgeList = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: isAuthLoading } = useCheckAuthQuery();
    const { data, isLoading, isError } = useFetchBadgesByIssuerQuery();
    const badges = data?.data || [];

    const userId = user?.user?.id;
    const roleId = user?.user?.roleId;
    const institutionId = badges.length > 0 ? badges[0]?.Issuer?.institutionId : null;

    console.log(userId, roleId, institutionId);

    // Apply different filtering based on role
    let checkBadge = [];

    if (roleId === 3) {
        // Issuer - Only view their own badges
        checkBadge = badges.filter((badge) => badge?.Issuer?.userId === userId);
    } else if (roleId === 2) {
        // Institution - View all badges of issuers within the same institution
        checkBadge = badges.filter((badge) => badge?.Issuer?.Institution?.id === institutionId);
    } else if (roleId === 1) {
        // Admin - View all badges
        checkBadge = badges; // Admin can see all badges
    }

    console.log(checkBadge);

    // Handle loading, error, and empty state in the parent component
    if (isLoading || isAuthLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error fetching badges</Typography>;

    // Handle view badgeDetail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={checkBadge} onView={handleView} />
        </>
    );
};

export default BadgeList;
