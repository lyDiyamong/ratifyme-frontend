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

function InstitutionDetail() {
    // Error state hook
    const [errorMessage, setErrorMessage] = useState("");

    // Get the instituion id hook
    const { institutionId } = useParams();

    // Api fetching hook
    const { data: response, isLoading, isError } = useGetInstitutionByIdQuery(institutionId);
    const institution = response?.data;

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
            <BadgeListCard />
        </DashboardContainer>
        // ============ End InstitutionDetail ============
    );
}

export default InstitutionDetail;
