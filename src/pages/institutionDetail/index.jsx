import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Box, CardMedia, Pagination, Typography } from "@mui/material";
import OrganizationCard from "../../components/OrganizationCard";
import DashboardContainer from "../../components/styles/DashboardContainer";
import AlertMessage from "../../components/alert/AlertMessage";
import { SpinLoading } from "../../components/loading/SpinLoading";
import BadgeListCard from "../../components/BadgeListCard";
import useCatchStatus from "../../hooks/useCatchStatus";
import theme from "../../assets/themes";
import StatusCode from "../../assets/images/NoData.svg";
import { useGetInstitutionByIdQuery } from "../../store/api/institutionManagement/institutionApi";
import { useFetchBadgesByInstitutionsQuery } from "../../store/api/badgeManagement/badgeApi";

function InstitutionDetail() {
    const navigate = useNavigate();
    const { institutionId } = useParams();

    // Pagination state
    const [page, setPage] = useState(1);
    const itemsPerPage = 10; // Items per page

    // Fetch institution details
    const {
        data: institutionResponse,
        isLoading: isInstitutionLoading,
        isError: isInstitutionError,
        error: institutionError,
    } = useGetInstitutionByIdQuery(institutionId);
    const institution = institutionResponse?.data;

    // Fetch badges
    const {
        data: badgesResponse,
        isLoading: isBadgesLoading,
        isError: isBadgesError,
        error: badgesError,
    } = useFetchBadgesByInstitutionsQuery(institutionId);

    const badges = badgesResponse?.data?.Issuers?.flatMap((badge) => badge?.BadgeClasses) || [];
    const totalPages = Math.ceil(badges.length / itemsPerPage);

    // Error handling
    const [errorHandling, setErrorHandling] = useCatchStatus(
        isInstitutionError || isBadgesError,
        institutionError?.data?.message || badgesError?.data?.message,
    );

    // Pagination handler
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Slice badges for the current page
    const paginatedBadges = badges.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleView = (id) => {
        navigate(`/dashboard/management/badges/badgeDetail/${id}`);
    };

    const isSmallScreen = window.innerWidth < 600;

    return (
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

            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: isSmallScreen ? "auto" : "900px",
                }}
            >
                <Box
                    component="section"
                    sx={{
                        boxShadow: theme.customShadows.default,
                        borderRadius: theme.customShape.section,
                        bgcolor: theme.palette.customColors.white,
                        px: 2,
                        pb: 2,
                        my: 3,
                    }}
                >
                    {badges?.length > 0 ? (
                        <>
                            {isBadgesLoading ? (
                                <SpinLoading />
                            ) : (
                                <BadgeListCard badges={paginatedBadges} onView={handleView} total={badges?.length} />
                            )}

                            {badges.length > 0 && (
                                <Box sx={{ display: "flex", justifyContent: "end" }}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        size={isSmallScreen ? "small" : "large"}
                                        siblingCount={isSmallScreen ? 0 : 1}
                                        boundaryCount={isSmallScreen ? 1 : 2}
                                    />
                                </Box>
                            )}
                        </>
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center" p={4}>
                            <CardMedia
                                component="img"
                                image={StatusCode}
                                alt="No badges found"
                                sx={{ maxWidth: 400, width: "100%" }}
                            />
                            <Typography variant="h6" mt={2} textAlign="center" color={theme.palette.text.secondary}>
                                No badges Found
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </DashboardContainer>
    );
}

export default InstitutionDetail;
