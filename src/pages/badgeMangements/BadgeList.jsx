import { useNavigate } from "react-router-dom";
// MUI import
import { Typography } from "@mui/material";

//Custom import
import { useFetchBadgesByIssuerQuery } from "../../store/api/badgeManagement/badgeApi";
import { useCheckAuthQuery } from "../../store/api/auth/authApi";
import BadgeListCard from "../../components/BadgeListCard";

const BadgeList = () => {
    const navigate = useNavigate();
    const { data: user, isLoading: isAuthLoading } = useCheckAuthQuery();

    const userId = user?.user?.id;
    console.log(userId);
    console.log(user.user);
    const { data, isLoading, isError } = useFetchBadgesByIssuerQuery();
    // const { data: oneBadge } = useCheckAuthQuery();
    const badges = data?.data || [];

    // Ensure data is available before filtering
    const checkBadge = userId ? badges.filter((badge) => badge?.Issuer?.userId === userId) : [];
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
