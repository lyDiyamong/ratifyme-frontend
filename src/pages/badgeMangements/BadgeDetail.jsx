// React Import
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MUI Import
import { Typography } from "@mui/material";

// Custom Import
import BadgeDetailCustom from "../../components/BadgeDetailCustom";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { useFetchOneBadgeQuery } from "../../store/api/badgeManagement/badgeApi";
import PageTitle from "../../components/PageTitle";

const BadgeDetail = () => {
    // Fetch ID from the URL
    const { id } = useParams();
    // Fetch badge by ID
    const { roleId, issuerData, earnerData } = useSelector((state) => state.global);
    const { data: oneBadge, isLoading, isError } = useFetchOneBadgeQuery(id);

    let role = roleId;
    let activeUserId;

    switch (role) {
        case 1: {
            role = "admin";
            break;
        }
        case 2: {
            role = "institution";
            break;
        }
        case 3: {
            role = "issuer";
            activeUserId = issuerData.id;
            break;
        }
        case 4: {
            role = "earner";
            activeUserId = earnerData.id;
            break;
        }
    }

    // Handle loading and error states
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error fetching badge details.</Typography>;

    // If no badge is returned, render a fallback message
    if (!oneBadge) return <Typography>No badge found with the provided ID.</Typography>;

    return (
        <DashboardContainer sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <PageTitle title="Badge Detail" subtitle="If no badge is returned, render a fallback message"/>
            <BadgeDetailCustom badge={oneBadge} userRole={role} activeUserId={activeUserId} />
        </DashboardContainer>
    );
};

export default BadgeDetail;
