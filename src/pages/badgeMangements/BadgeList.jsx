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
import { SpinLoading } from "../../components/loading/SpinLoading";

const BadgeList = () => {
    const navigate = useNavigate();
    const { roleId, issuerData, institutionData, earnerData, userInfo } = useSelector((state) => state.global);

    // Determine the realId based on the role
    // const activeId =
    //     roleId === 2 ? institutionData.id : roleId === 3 ? issuerData.id : roleId === 4 ? earnerData.id : userInfo;

    // const field = institutionData?.id ? "institutionId" : issuerData?.id ? "issuerId" : ''

    let activeId;
    let field;
    switch (roleId) {
        case 2:
            activeId = institutionData?.id;
            field = "institutionId";
            break;
        case 3:
            activeId = issuerData?.id;
            field = "issuerId";
    }

    // Fetch data
    const { data: allBadges, isLoading } = useFetchBadgesQuery({ field, fk: activeId });

    // Define badges based on role
    const badges = allBadges?.data || [];

    console.log("Badge All data base on role", badges, "active Id", activeId);

    // Handle loading, error, and empty state in the parent component
    if (isLoading) return <SpinLoading size={30} />;
    // Handle view badgeDetail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={badges} onView={handleView} roleId={roleId} />
        </>
    );
};

export default BadgeList;
