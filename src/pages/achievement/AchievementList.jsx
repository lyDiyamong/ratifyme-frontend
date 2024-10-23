// React Import
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// Custom import
import BadgeListCard from "../../components/BadgeListCard";
import { useEffect } from "react";
import { Box } from "@mui/system";
import { Pagination, Typography } from "@mui/material";
import PageLoading from "../../components/loading/PageLoading";

export const AchievementList = ({ badges, total, onPage, page, limit, result, isLoading, isError }) => {
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData?.id;
    const isSmallScreen = window.innerWidth < 600;

    // UseEffect to update URL query parameters when page or limit changes
    useEffect(() => {
        if (earnerId) {
            window.history.replaceState(null, "", `?page=${page}&limit=${limit}`);
        }
    }, [page, limit, earnerId]);

    // Handle view badge detail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    let totalBadge = badges.length !== total ? result : total;

    // Calculate total pages for pagination
    const totalPages = totalBadge > 0 ? Math.ceil(totalBadge / limit) : 0;

    // Handle loading state
    if (isLoading) {
        return <PageLoading isLoading={isLoading} />;
    } else if (isError) {
        return <Typography>Error...</Typography>;
    }

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
            <BadgeListCard badges={badges} onView={handleView} total={totalBadge} />
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
