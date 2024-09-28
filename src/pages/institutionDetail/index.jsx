// React import
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

// Custom import
import OrganizationCard from "../../components/OrganizationCard";
import DashboardContainer from "../../components/styles/DashboardContainer";
import AlertMessage from "../../components/alert/AlertMessage";
import { SpinLoading } from "../../components/loading/SpinLoading";

// Api import
import { useGetInstitutionByIdQuery } from "../../store/api/institutionManagement/institutionApi";
import BadgeListCard from "../../components/BadgeListCard";
import theme from "../../assets/themes";
import { Box } from "@mui/material";
import { useFetchBadgesByInstitutionsQuery } from "../../store/api/badgeManagement/badgeApi";

function InstitutionDetail() {
    // Error state hook
    const [errorMessage, setErrorMessage] = useState("");

    // Navigation hook
    const navigate = useNavigate()

    // Get the instituion id hook
    const { institutionId } = useParams();

    // Api fetching institution hook
    const { data: response, isLoading, isError } = useGetInstitutionByIdQuery(institutionId);
    const institution = response?.data;

    // Api fetching badges hook
    const { data: badgesIntsti, isLoading: badgesLoading } = useFetchBadgesByInstitutionsQuery(institutionId);
    console.log(badgesIntsti?.data?.Issuers);

    // Using flatMap to iterating to array in array
    const badges = badgesIntsti?.data?.Issuers?.flatMap((badge) => badge?.BadgeClasses);

    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    // Error handling
    if (isError) {
        setErrorMessage("There was an error fetching subscription data. Please try again later.");
    }
    return (
        // ============ Start InstitutionDetail ============
        <DashboardContainer>
            {errorMessage && <AlertMessage variant="error">{errorMessage}</AlertMessage>}
            {/* Organiztion Card */}
            <OrganizationCard
                title={institution?.institutionName}
                description={institution?.institutionBio}
                logoUrl={institution?.User.profileImage}
            />
            {/* Badge List */}
            <Box
                component="section"
                sx={{
                    boxShadow: theme.customShadows.default,
                    borderRadius: theme.customShape.section,
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: theme.palette.customColors.white,
                    px: 2,
                    py: 2,
                    mt: 4,
                }}
            >
                {badgesLoading ? <SpinLoading /> : <BadgeListCard badges={badges} onView={handleView} />}
            </Box>
        </DashboardContainer>
        // ============ End InstitutionDetail ============
    );
}

export default InstitutionDetail;
