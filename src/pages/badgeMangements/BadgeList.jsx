// React Import
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// MUI Import
import { Box, Typography, Pagination } from "@mui/material";

// Custom Import
import BadgeListCard from "../../components/BadgeListCard";
import PageLoading from "../../components/loading/PageLoading";

const BadgeList = ({ badges, total, onPage, page, limit, result, isLoading, isError, refetch }) => {
    const navigate = useNavigate();
    const { roleId, issuerData, institutionData } = useSelector((state) => state.global);
    const isSmallScreen = window.innerWidth < 600;

    let activeId = null;
    let field = null;

    // Only set activeId and field when the roleId is valid
    if (roleId === 2 && institutionData?.id) {
        activeId = institutionData.id;
        field = "institutionId";
    } else if (roleId === 3 && issuerData?.id) {
        activeId = issuerData.id;
        field = "issuerId";
    }

    useEffect(() => {
        if (activeId && field) {
            window.history.replaceState(null, "", `?page=${page}&${field}=${activeId}&limit=${limit}`);
        }
    }, [page, limit, field, activeId]);

    // Handle loading state
    if (isLoading) {
        return <PageLoading isLoading={isLoading} />;
    } else if (isError) {
        return <Typography>Error...</Typography>;
    }
    const totalBadge = badges.length !== total ? total : result;
    // If the number of returned badges is less than the limit, it means you're on the last page
    const totalPages = totalBadge > 0 ? Math.ceil(totalBadge / limit) : 0;

    const handleView = (id) => {
        navigate(`/dashboard/management/badges/badgeDetail/${id}`);
    };

    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: isSmallScreen ? "auto" : "900px",
            }}
        >
            <BadgeListCard refetch={refetch} badges={badges} onView={handleView} total={totalBadge} />

            <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
                <Pagination
                    sx={{ display: totalPages > 0 ? "block" : "none" }}
                    count={totalPages || 1}
                    page={page}
                    onChange={(event, value) => onPage(value)}
                    size={isSmallScreen ? "small" : "large"}
                    siblingCount={isSmallScreen ? 0 : 1}
                    boundaryCount={isSmallScreen ? 1 : 2}
                />
            </Box>
        </Box>
    );
};

export default BadgeList;
