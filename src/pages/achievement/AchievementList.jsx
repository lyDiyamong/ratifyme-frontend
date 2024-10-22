// React Import
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// Custom import
import { useFetchClaimBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import BadgeListCard from "../../components/BadgeListCard";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Pagination, Typography } from "@mui/material";

export const AchievementList = ({ badges, total, onPage, page, limit, result }) => {
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData?.id;
    const isSmallScreen = window.innerWidth < 600;

    // Fetch claim badges based on the earner's ID, page, and limit
    const { data: badgeClaim, isLoading } = useFetchClaimBadgeByEarnerQuery({ earnerId, page, limit }, { skip: !earnerId });

    const badgeClaims = badgeClaim?.badgeClasses;

    console.log(badges);
    console.log(badgeClaims);
    console.log(total);

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

    // Pagination logic
    // const onPage = (newPage) => {
    //     setPage(newPage);
    // };

    // Calculate total pages for pagination
    const totalPages = Math.ceil(total / limit);
    // Handle loading state
    if (isLoading) {
        return <Typography>Loading...</Typography>;
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
            <BadgeListCard badges={badges} onView={handleView} total={badges.length !== total ? result : total} />
            <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
                <Pagination
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
