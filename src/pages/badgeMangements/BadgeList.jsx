// React Import
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
    const { roleId, issuerData, institutionData, earnerData, userInfo } = useSelector((state) => state.global);

    // Determine the realId based on the role
    const activeId =
        roleId === 2 ? institutionData.id : roleId === 3 ? issuerData.id : roleId === 4 ? earnerData.id : userInfo;

    // Fetch data
    const { data: allBadges, isLoading } = useFetchBadgesQuery();
    const { data: badgeInsti } = useFetchBadgesByInstitutionsQuery(activeId);
    const { data: badgeIssuer } = useFetchBadgesByIssuerQuery(activeId);

    // Define badges based on role
    const badges = allBadges?.data || [];
    const badgeInstitution = badgeInsti?.data?.Issuers.flatMap((issuer) => (issuer.BadgeClasses) || []);
    const badgeIssue = badgeIssuer?.data || [];

    // console.log("activeId", activeId, "roleId", roleId);

    // Apply filtering based on role
    let checkBadge = roleId === 3 ? badgeIssue : roleId === 2 ? badgeInstitution : roleId === 1 ? badges : "";
    // console.log("Check badges",checkBadge);

    console.log("Badge Institution", badgeInstitution);

    console.log("Badge issuer", badgeIssuer);

    // Handle loading, error, and empty state in the parent component
    if (isLoading) return <Typography>Loading...</Typography>;
    // Handle view badgeDetail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={checkBadge} onView={handleView} roleId={roleId} />
        </>
    );
};

export default BadgeList;
