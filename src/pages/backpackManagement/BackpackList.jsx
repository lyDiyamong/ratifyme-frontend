import { useEffect, useState } from "react";
import { useFetchBadgeByEarnerQuery } from "../../store/api/badgeManagement/badgeApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BadgeListCard from "../../components/BadgeListCard";
import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";

const BackpackList = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const navigate = useNavigate();
    const { earnerData } = useSelector((state) => state.global);
    const earnerId = earnerData.id;
    const isSmallScreen = window.innerWidth < 600;

    const { data: badgeClaim, isLoading } = useFetchBadgeByEarnerQuery({ earnerId, page, limit });
    const badgeClaims = badgeClaim?.badgeClasses;
    console.log(badgeClaim?.totalRecords);

    // Handle loading, error, and empty state in the parent component
    if (isLoading) return <Typography>Loading...</Typography>;

    const totalPages = badgeClaims?.length === limit ? page + 1 : page;
    console.log(totalPages);
    const onPage = (newPage) => {
        setPage(newPage);
    };
    // Handle view badgeDetail
    const handleView = (id) => {
        navigate(`/management/badges/badgeDetail/${id}`);
    };

    return (
        <>
            <BadgeListCard badges={badgeClaims || []} onView={handleView} total={badgeClaim?.totalRecords} />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Pagination
                    count={totalPages || 1}
                    page={page}
                    onChange={(event, value) => onPage(value)}
                    size={isSmallScreen ? "small" : "large"}
                    siblingCount={isSmallScreen ? 0 : 1}
                    boundaryCount={isSmallScreen ? 1 : 2}
                />
            </Box>
        </>
    );
};

export default BackpackList;
