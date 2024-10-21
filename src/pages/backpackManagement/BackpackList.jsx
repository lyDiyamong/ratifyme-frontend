import { useState, useEffect } from "react";
import { useFetchBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BadgeListCard from "../../components/BadgeListCard";
import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";

const BackpackList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData?.id;
    const isSmallScreen = window.innerWidth < 600;

    const { data: badgeClaim, isLoading } = useFetchBadgeByEarnerQuery({ earnerId, page, limit }, { skip: !earnerId });
    const badgeClaims = badgeClaim?.badgeClasses;

    // UseEffect to update the URL with page and limit query params
    useEffect(() => {
        if (earnerId) {
            window.history.replaceState(null, "", `?page=${page}&limit=${limit}`);
        }
    }, [page, limit, earnerId]);

    // Handle loading state
    if (isLoading) return <Typography>Loading...</Typography>;

    // Calculate the total pages for pagination
    const totalPages = Math.ceil(badgeClaim?.totalRecords / limit);

    const onPage = (newPage) => {
        setPage(newPage);
    };

    // Handle viewing badge detail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
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
            <BadgeListCard badges={badgeClaims || []} onView={handleView} total={badgeClaim?.totalRecords} />
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

export default BackpackList;
