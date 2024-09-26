// React import
import { useState } from "react";
import { useParams } from "react-router";

// Custom import
import OrganizationCard from "../../components/OrganizationCard";
import DashboardContainer from "../../components/styles/DashboardContainer";
import AlertMessage from "../../components/alert/AlertMessage";

// Api import
import { useGetInstitutionByIdQuery } from "../../store/api/institutionManagement/institutionApi";
import BadgeListCard from "../../components/BadgeListCard";
import theme from "../../assets/themes";
import { Box } from "@mui/material";
import { useFetchBadgesByIssuerQuery } from "../../store/api/badgeManagement/badgeApi";

function InstitutionDetail() {
    // Error state hook
    const [errorMessage, setErrorMessage] = useState("");

    // Get the instituion id hook
    const { institutionId } = useParams();

    // Api fetching institution hook
    const { data: response, isLoading, isError } = useGetInstitutionByIdQuery(institutionId);
    const institution = response?.data;

    // Api fetching badges hook
    const { data: badges } = useFetchBadgesByIssuerQuery();
    console.log(badges?.data || {});
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
                {/* <BadgeListCard badges={badges?.data} /> */}
            </Box>
        </DashboardContainer>
        // ============ End InstitutionDetail ============
    );
}

export default InstitutionDetail;
