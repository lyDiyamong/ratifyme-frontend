import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// MUI import
import { Typography } from "@mui/material";

// Custom import
import {
    useFetchBadgesByIssuerQuery,
    useFetchBadgesByInstitutionsQuery,
    useFetchBadgesQuery,
} from "../../store/api/badgeManagement/badgeApi";
import BadgeListCard from "../../components/BadgeListCard";

const BadgeList = () => {
    const navigate = useNavigate();
    const { roleId, issuerData, institutionData } = useSelector((state) => state.global);

    // Determine the realId based on the role
    const activeId = roleId === 2 ? institutionData.id : roleId === 3 ? issuerData.id : "";

    // Fetch data
    const { data: allBadges, isLoading, isError } = useFetchBadgesQuery();
    const { data: badgeInsti } = useFetchBadgesByInstitutionsQuery(activeId);
    const { data: badgeIssuer } = useFetchBadgesByIssuerQuery(activeId);

    // Define badges based on role
    const badges = allBadges?.data || [];
    const badgeInstitution = badgeInsti?.data?.Issuers.flatMap((issuer) => issuer.BadgeClasses) || [];
    const badgeIssue = badgeIssuer?.data?.BadgeClasses || [];

    // Apply filtering based on role
    const checkBadge =
        roleId === 3
            ? badgeIssue 
            : roleId === 2
            ? badgeInstitution
            : badges; 

    // Handle loading, error, and empty state in the parent component
    if (isLoading) return <Typography>Loading...</Typography>;
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
