import { useFetchBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BadgeListCard from "../../components/BadgeListCard";
import { Typography } from "@mui/material";

const BackpackList = () => {
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData.id;
    const { data: badgeClaim, isLoading, isError } = useFetchBadgeByEarnerQuery(earnerId);

    const badgeClaims = badgeClaim?.badgeClasses;

    // Handle loading, error, and empty state in the parent component
    if (isLoading) return <Typography>Loading...</Typography>;

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

export default BackpackList;
