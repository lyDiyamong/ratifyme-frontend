import { useParams } from "react-router-dom";
import BadgeDetailCustom from "../../components/BadgeDetailCustom";
import DashboardContainer from "../../components/styles/DashboardContainer";
import { Typography } from "@mui/material";
import { useFetchOneBadgeQuery } from "../../store/api/badgeManagement/badgeApi";

const BadgeDetail = () => {
    // Fetch ID from the URL
    const { id } = useParams();
    // Fetch badge by ID
    const { data: oneBadge, isLoading, isError } = useFetchOneBadgeQuery(id);

    let role = oneBadge?.data?.Issuer?.User?.roleId;
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
            role = "earner";
            break;
        }
        case 4: {
            role = "earner";
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
            <BadgeDetailCustom badge={oneBadge} userRole={role} />
        </DashboardContainer>
    );
};

export default BadgeDetail;
