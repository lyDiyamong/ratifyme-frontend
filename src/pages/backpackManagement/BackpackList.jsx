// React import
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// MUI import
import { Pagination, Typography, Box } from "@mui/material";

// Custom import
import BadgeListCard from "../../components/BadgeListCard";
import PageLoading from "../../components/loading/PageLoading";

const BackpackList = ({ badges, total, onPage, page, limit, result, isLoading, isError }) => {
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData?.id;
    const isSmallScreen = window.innerWidth < 600;

    // UseEffect to update the URL with page and limit query params
    useEffect(() => {
        if (earnerId) {
            window.history.replaceState(null, "", `?page=${page}&limit=${limit}`);
        }
    }, [page, limit, earnerId]);

    let totalBadge = badges.length !== total ? result : total;

    // Calculate the total pages for pagination
    const totalPages = totalBadge > 0 ? Math.ceil(totalBadge / limit) : 0;

    // Handle viewing badge detail
    const handleView = (id) => {
        navigate(`/dashboard/management/badges/badgeDetail/${id}`);
    };

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

export default BackpackList;
