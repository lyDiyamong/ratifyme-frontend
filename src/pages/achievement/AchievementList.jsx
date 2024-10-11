// React Import
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// Custom import
import { useFetchClaimBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import BadgeListCard from "../../components/BadgeListCard";

const AchievementList = () => {
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData.id;
    const { data: badgeClaim } = useFetchClaimBadgeByEarnerQuery(earnerId);

    const badgeClaims = badgeClaim?.badgeClasses;

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
