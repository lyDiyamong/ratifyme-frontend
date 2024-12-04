// React import
import { useParams, useNavigate } from "react-router";

// MUI import
import { Box } from "@mui/material";

// Custom import
import OrganizationCard from "../../components/OrganizationCard";
import DashboardContainer from "../../components/styles/DashboardContainer";
import AlertMessage from "../../components/alert/AlertMessage";
import { SpinLoading } from "../../components/loading/SpinLoading";
import BadgeListCard from "../../components/BadgeListCard";
import useCatchStatus from "../../hooks/useCatchStatus";
import theme from "../../assets/themes";

// Api import
import { useGetInstitutionByIdQuery } from "../../store/api/institutionManagement/institutionApi";
import { useFetchBadgesByInstitutionsQuery } from "../../store/api/badgeManagement/badgeApi";

function InstitutionDetail() {
    // Navigation hook
    const navigate = useNavigate();

    // Get the institution id hook
    const { institutionId } = useParams();

    // Api fetching institution hook
    const {
        data: institutionResponse,
        isLoading: isInstitutionLoading,
        isError: isInstitutionError,
        error: institutionError,
        isSuccess: institutionSuccess,
    } = useGetInstitutionByIdQuery(institutionId);

    const institution = institutionResponse?.data;

    // Api fetching badges hook
    const {
        data: badgesResponse,
        isLoading: isBadgesLoading,
        isError: isBadgesError,
        error: badgesError,
    } = useFetchBadgesByInstitutionsQuery(institutionId);

    const badges = badgesResponse?.data?.Issuers?.flatMap((badge) => badge?.BadgeClasses);

    // Dynamic error handler with custom hook
    const [errorHandling, setErrorHandling] = useCatchStatus(
        isInstitutionError || isBadgesError,
        institutionError?.data?.message || badgesError?.data?.message,
    );

    // Badge view handler
    const handleView = (id) => {
        navigate(`/dashboard/management/badges/badgeDetail/${id}`);
    };

    return (
        // ============ Start InstitutionDetail ============
        <DashboardContainer>
            {errorHandling && (
                <AlertMessage variant="error" onClose={() => setErrorHandling("")}>
                    {errorHandling}
                </AlertMessage>
            )}

            {isInstitutionLoading ? (
                <SpinLoading />
            ) : (
                <OrganizationCard
                    title={institution?.institutionName}
                    description={institution?.institutionBio}
                    logoUrl={institution?.institutionProfileImage}
                    email={institution?.institutionEmail}
                    orgLink={institution?.institutionWebsiteUrl}
                />
            )}

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
                {isBadgesLoading ? <SpinLoading /> : <BadgeListCard badges={badges} onView={handleView} />}
            </Box>
        </DashboardContainer>
        // ============ End InstitutionDetail ============
    );
}

export default InstitutionDetail;
