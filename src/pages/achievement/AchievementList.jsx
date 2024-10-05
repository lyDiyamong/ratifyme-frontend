// React Import
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// MUI import
import { Typography } from "@mui/material";

// Custom import
import { useFetchClaimBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import BadgeListCard from "../../components/BadgeListCard";

const AchievementList = () => {
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData.id;
    const { data: badgeClaim, isLoading, isError } = useFetchClaimBadgeByEarnerQuery(earnerId);

    const badgeClaims = badgeClaim?.badgeClasses;

    // Handle loading, error, and empty state in the parent component
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error fetching badges</Typography>;

    // Handle view badgeDetail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={badgeClaims || []} onView={handleView} />
        </>
    );
};

export default AchievementList;
